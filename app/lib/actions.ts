'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import prisma from './prisma';
import { requireAdmin } from './auth-utils';
import { sanitizeUrl, isValidFbEventUrl, isFacebookCdnUrl } from './url-utils';
import { collectWizardAuthors, derivePublishingYear, prismaErrorMessage } from './wizard-helpers';
import { parseInstagramUrl } from './instagram';
import { fetchOgImage } from './enrichment/og-image';
import { persistCoverToBlob } from './enrichment/cover-blob';

async function localizedPath(path: string): Promise<string> {
  const locale = await getLocale();
  return `/${locale}${path}`;
}

// Event actions

const EventSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  date: z.string().min(1, 'La date est requise'),
  hour: z.string().optional(),
  place: z.string().optional(),
  fb_event: z.string().optional(),
  cover_url: z.string().optional(),
});

export type EventState = {
  errors?: { name?: string[]; date?: string[]; fb_event?: string[] };
  message?: string | null;
  success?: boolean;
};

/**
 * Resolve an event's cover after the row exists, then persist it durably.
 * Runs OUTSIDE any DB transaction (Blob upload is a network call).
 * - If no cover was provided and auto-scrape is on, pull the Facebook event's
 *   og:image.
 * - Re-host expiring Facebook CDN URLs on Blob; stable URLs are left as-is.
 * Best-effort: failures leave the originally-stored value untouched.
 */
async function resolveAndPersistEventCover(
  eventId: string,
  opts: { fbEvent?: string | null; coverUrl?: string | null; autoScrape: boolean },
): Promise<void> {
  const original = opts.coverUrl ?? null;
  let cover = original;

  if (!cover && opts.autoScrape && isValidFbEventUrl(opts.fbEvent)) {
    cover = await fetchOgImage(opts.fbEvent as string);
  }

  if (cover && isFacebookCdnUrl(cover)) {
    cover = (await persistCoverToBlob(cover, eventId)) ?? cover;
  }

  if (cover !== original) {
    await prisma.event.update({ where: { id: eventId }, data: { cover_url: cover } });
  }
}

/**
 * Scrape the Facebook event's cover (og:image) for a live preview in the admin
 * forms. Returns the raw (temporary) URL only — Blob re-hosting happens at save
 * time so discarded previews don't create orphan blobs.
 */
export async function fetchEventCoverPreview(
  fbUrl: string,
): Promise<{ url: string | null }> {
  await requireAdmin();
  if (!isValidFbEventUrl(fbUrl)) return { url: null };
  return { url: await fetchOgImage(fbUrl) };
}

export async function createEvent(prevState: EventState, formData: FormData) {
  await requireAdmin();
  const validatedFields = EventSchema.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    hour: formData.get('hour'),
    place: formData.get('place'),
    fb_event: formData.get('fb_event'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, date, hour, place, fb_event, cover_url } = validatedFields.data;
  const cover = sanitizeUrl(cover_url);
  let createdId: string;
  try {
    const created = await prisma.event.create({
      data: { name, date: new Date(date), hour: hour || null, place: place || null, fb_event: fb_event || null, cover_url: cover },
    });
    createdId = created.id;
  } catch (error) {
    return { message: 'Erreur: impossible de créer l\'événement.' };
  }

  await resolveAndPersistEventCover(createdId, { fbEvent: fb_event, coverUrl: cover, autoScrape: true });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  redirect(await localizedPath('/admin/events'));
}

export async function updateEvent(id: string, prevState: EventState, formData: FormData) {
  await requireAdmin();
  const validatedFields = EventSchema.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    hour: formData.get('hour'),
    place: formData.get('place'),
    fb_event: formData.get('fb_event'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, date, hour, place, fb_event, cover_url } = validatedFields.data;
  const cover = sanitizeUrl(cover_url);
  try {
    await prisma.event.update({
      where: { id },
      data: { name, date: new Date(date), hour: hour || null, place: place || null, fb_event: fb_event || null, cover_url: cover },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour l\'événement.' };
  }

  // Auto-scrape only kicks in when no cover was provided (the form resubmits an
  // existing cover, so a manual cover is never clobbered).
  await resolveAndPersistEventCover(id, { fbEvent: fb_event, coverUrl: cover, autoScrape: true });

  revalidatePath('/admin/events');
  revalidatePath('/events');
  return { success: true, message: 'Événement mis à jour.' };
}

export async function deleteEvent(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.bdEvent.deleteMany({ where: { eventId: id } });
    await prisma.authorEvent.deleteMany({ where: { eventId: id } });
    await prisma.event.delete({ where: { id } });
  } catch (error) {
    console.error('Delete event error:', error);
  }
  revalidatePath('/admin/events');
  revalidatePath('/events');
}

// BD actions

const BdSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  eventIds: z.string().optional(),
  publisherId: z.string().optional(),
  publishing_year: z.coerce.number().optional(),
  authorIds: z.string().optional(),
  genreIds: z.string().optional(),
  ean: z.string().max(13).optional(),
  summary: z.string().optional(),
  publication_date: z.string().optional(),
  page_count: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  cover_url: z.string().optional(),
  publisher_url: z.string().optional(),
  leslibraires_url: z.string().optional(),
});

export type BdState = {
  errors?: { title?: string[]; eventIds?: string[]; publisherId?: string[]; publishing_year?: string[] };
  message?: string | null;
  success?: boolean;
};

export async function createBd(prevState: BdState, formData: FormData) {
  await requireAdmin();
  const validatedFields = BdSchema.safeParse({
    title: formData.get('title'),
    eventIds: formData.get('eventIds'),
    publisherId: formData.get('publisherId'),
    publishing_year: formData.get('publishing_year') || undefined,
    authorIds: formData.get('authorIds'),
    genreIds: formData.get('genreIds'),
    ean: formData.get('ean'),
    summary: formData.get('summary'),
    publication_date: formData.get('publication_date'),
    page_count: formData.get('page_count') || undefined,
    price: formData.get('price') || undefined,
    cover_url: formData.get('cover_url'),
    publisher_url: formData.get('publisher_url'),
    leslibraires_url: formData.get('leslibraires_url'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { title, eventIds, publisherId, publishing_year, authorIds, genreIds, ean, summary, publication_date, page_count, price, cover_url, publisher_url, leslibraires_url } = validatedFields.data;
  const authorIdList = authorIds ? authorIds.split(',').filter(Boolean) : [];
  const eventIdList: string[] = eventIds ? JSON.parse(eventIds) : [];
  const genreIdList: string[] = genreIds ? JSON.parse(genreIds) : [];

  try {
    await prisma.bd.create({
      data: {
        title,
        publisherId: publisherId || null,
        publishing_year: publishing_year || null,
        ean: ean || null,
        summary: summary || null,
        publication_date: publication_date ? new Date(publication_date) : null,
        page_count: page_count || null,
        price: price || null,
        cover_url: cover_url || null,
        publisher_url: publisher_url || null,
        leslibraires_url: leslibraires_url || null,
        authors: {
          create: authorIdList.map(authorId => ({ authorId })),
        },
        events: {
          create: eventIdList.map(eventId => ({ eventId })),
        },
        genres: {
          create: genreIdList.map(genreId => ({ genreId })),
        },
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer la BD.' };
  }

  revalidatePath('/admin/bds');
  revalidatePath('/bds');
  redirect(await localizedPath('/admin/bds'));
}

export async function updateBd(id: string, prevState: BdState, formData: FormData) {
  await requireAdmin();
  const validatedFields = BdSchema.safeParse({
    title: formData.get('title'),
    eventIds: formData.get('eventIds'),
    publisherId: formData.get('publisherId'),
    publishing_year: formData.get('publishing_year') || undefined,
    authorIds: formData.get('authorIds'),
    genreIds: formData.get('genreIds'),
    ean: formData.get('ean'),
    summary: formData.get('summary'),
    publication_date: formData.get('publication_date'),
    page_count: formData.get('page_count') || undefined,
    price: formData.get('price') || undefined,
    cover_url: formData.get('cover_url'),
    publisher_url: formData.get('publisher_url'),
    leslibraires_url: formData.get('leslibraires_url'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { title, eventIds, publisherId, publishing_year, authorIds, genreIds, ean, summary, publication_date, page_count, price, cover_url, publisher_url, leslibraires_url } = validatedFields.data;
  const authorIdList = authorIds ? authorIds.split(',').filter(Boolean) : [];
  const eventIdList: string[] = eventIds ? JSON.parse(eventIds) : [];
  const genreIdList: string[] = genreIds ? JSON.parse(genreIds) : [];

  try {
    await prisma.bd.update({
      where: { id },
      data: {
        title,
        publisherId: publisherId || null,
        publishing_year: publishing_year || null,
        ean: ean || null,
        summary: summary || null,
        publication_date: publication_date ? new Date(publication_date) : null,
        page_count: page_count || null,
        price: price || null,
        cover_url: cover_url || null,
        publisher_url: publisher_url || null,
        leslibraires_url: leslibraires_url || null,
        authors: {
          deleteMany: {},
          create: authorIdList.map(authorId => ({ authorId })),
        },
        events: {
          deleteMany: {},
          create: eventIdList.map(eventId => ({ eventId })),
        },
        genres: {
          deleteMany: {},
          create: genreIdList.map(genreId => ({ genreId })),
        },
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour la BD.' };
  }

  revalidatePath('/admin/bds');
  revalidatePath('/bds');
  return { success: true, message: 'BD mise à jour.' };
}

export async function deleteBd(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.bdAuthor.deleteMany({ where: { bdId: id } });
    await prisma.bdEvent.deleteMany({ where: { bdId: id } });
    await prisma.bdGenre.deleteMany({ where: { bdId: id } });
    await prisma.bd.delete({ where: { id } });
  } catch (error) {
    console.error('Delete BD error:', error);
  }
  revalidatePath('/admin/bds');
  revalidatePath('/bds');
}

// Author actions

const AuthorSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  wikipedia_url: z.string().optional(),
  website: z.string().optional(),
});

export type AuthorState = {
  errors?: { name?: string[] };
  message?: string | null;
  success?: boolean;
};

export async function createAuthor(prevState: AuthorState, formData: FormData) {
  await requireAdmin();
  const validatedFields = AuthorSchema.safeParse({
    name: formData.get('name'),
    bio: formData.get('bio'),
    photo_url: formData.get('photo_url'),
    wikipedia_url: formData.get('wikipedia_url'),
    website: formData.get('website'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, bio, photo_url, wikipedia_url, website } = validatedFields.data;
  try {
    await prisma.author.create({
      data: {
        name,
        bio: bio || null,
        photo_url: sanitizeUrl(photo_url),
        wikipedia_url: sanitizeUrl(wikipedia_url),
        website: sanitizeUrl(website),
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer l\'auteur·ice.' };
  }

  revalidatePath('/admin/authors');
  revalidatePath('/authors');
  redirect(await localizedPath('/admin/authors'));
}

export async function updateAuthor(id: string, prevState: AuthorState, formData: FormData) {
  await requireAdmin();
  const validatedFields = AuthorSchema.safeParse({
    name: formData.get('name'),
    bio: formData.get('bio'),
    photo_url: formData.get('photo_url'),
    wikipedia_url: formData.get('wikipedia_url'),
    website: formData.get('website'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, bio, photo_url, wikipedia_url, website } = validatedFields.data;
  try {
    await prisma.author.update({
      where: { id },
      data: {
        name,
        bio: bio || null,
        photo_url: sanitizeUrl(photo_url),
        wikipedia_url: sanitizeUrl(wikipedia_url),
        website: sanitizeUrl(website),
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour l\'auteur·ice.' };
  }

  revalidatePath('/admin/authors');
  revalidatePath('/authors');
  return { success: true, message: 'Auteur·ice mis·e à jour.' };
}

export async function deleteAuthor(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.bdAuthor.deleteMany({ where: { authorId: id } });
    await prisma.authorEvent.deleteMany({ where: { authorId: id } });
    await prisma.author.delete({ where: { id } });
  } catch (error) {
    console.error('Delete author error:', error);
  }
  revalidatePath('/admin/authors');
  revalidatePath('/authors');
}

// Publisher actions

const PublisherSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  parentId: z.string().optional(),
});

export type PublisherState = {
  errors?: { name?: string[] };
  message?: string | null;
  success?: boolean;
};

export async function createPublisher(prevState: PublisherState, formData: FormData) {
  await requireAdmin();
  const validatedFields = PublisherSchema.safeParse({
    name: formData.get('name'),
    parentId: formData.get('parentId'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, parentId } = validatedFields.data;
  try {
    await prisma.publisher.create({
      data: { name, parentId: parentId || null },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer la maison d\'édition.' };
  }

  revalidatePath('/admin/publishers');
  redirect(await localizedPath('/admin/publishers'));
}

export async function updatePublisher(id: string, prevState: PublisherState, formData: FormData) {
  await requireAdmin();
  const validatedFields = PublisherSchema.safeParse({
    name: formData.get('name'),
    parentId: formData.get('parentId'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, parentId } = validatedFields.data;
  try {
    await prisma.publisher.update({
      where: { id },
      data: { name, parentId: parentId || null },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour la maison d\'édition.' };
  }

  revalidatePath('/admin/publishers');
  return { success: true, message: 'Maison d\'édition mise à jour.' };
}

export async function deletePublisher(id: string): Promise<void> {
  await requireAdmin();
  try {
    // Unlink BDs from this publisher
    await prisma.bd.updateMany({ where: { publisherId: id }, data: { publisherId: null } });
    // Unlink imprints
    await prisma.publisher.updateMany({ where: { parentId: id }, data: { parentId: null } });
    await prisma.publisher.delete({ where: { id } });
  } catch (error) {
    console.error('Delete publisher error:', error);
  }
  revalidatePath('/admin/publishers');
}

// Genre actions

const GenreSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
});

export type GenreState = {
  errors?: { name?: string[] };
  message?: string | null;
  success?: boolean;
};

export async function createGenre(prevState: GenreState, formData: FormData) {
  await requireAdmin();
  const validatedFields = GenreSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name } = validatedFields.data;
  const bdIds = formData.get('bdIds');
  const bdIdList: string[] = bdIds ? JSON.parse(bdIds as string) : [];
  try {
    await prisma.genre.create({
      data: {
        name,
        bds: { create: bdIdList.map(bdId => ({ bdId })) },
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer le genre.' };
  }

  revalidatePath('/admin/genres');
  revalidatePath('/bds');
  redirect(await localizedPath('/admin/genres'));
}

export async function updateGenre(id: string, prevState: GenreState, formData: FormData) {
  await requireAdmin();
  const validatedFields = GenreSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name } = validatedFields.data;
  const bdIds = formData.get('bdIds');
  const bdIdList: string[] = bdIds ? JSON.parse(bdIds as string) : [];
  try {
    await prisma.genre.update({
      where: { id },
      data: {
        name,
        bds: {
          deleteMany: {},
          create: bdIdList.map(bdId => ({ bdId })),
        },
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour le genre.' };
  }

  revalidatePath('/admin/genres');
  revalidatePath('/bds');
  return { success: true, message: 'Genre mis à jour.' };
}

export async function deleteGenre(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.bdGenre.deleteMany({ where: { genreId: id } });
    await prisma.genre.delete({ where: { id } });
  } catch (error) {
    console.error('Delete genre error:', error);
  }
  revalidatePath('/admin/genres');
  revalidatePath('/bds');
}

// Event Wizard action

// Optional URL field: warn-only on the client, sanitized to null here so a
// malformed URL never aborts the whole submission (matches CSV import).
const urlField = z.string().optional().transform((v) => sanitizeUrl(v));

const WizardBdAuthorSchema = z.object({
  tempId: z.string(),
  mode: z.enum(['existing', 'new']),
  existingId: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  photo_url: urlField,
  wikipedia_url: urlField,
  website: urlField,
});

const WizardBdSchema = z.object({
  mode: z.enum(['existing', 'new']),
  existingId: z.string().optional(),
  title: z.string().optional(),
  publisherId: z.string().optional(),
  publisherMode: z.enum(['existing', 'new']).optional(),
  newPublisherName: z.string().optional(),
  publishing_year: z.coerce.number().optional(),
  ean: z.string().max(13).optional(),
  summary: z.string().optional(),
  cover_url: urlField,
  publisher_url: urlField,
  leslibraires_url: urlField,
  publication_date: z.string().optional(),
  page_count: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  genreIds: z.array(z.string()).optional(),
  authors: z.array(WizardBdAuthorSchema).optional(),
});

// Legacy global-author entry — accepted (optional) for old draft payloads.
const WizardAuthorSchema = z.object({
  tempId: z.string(),
  mode: z.enum(['existing', 'new']),
  existingId: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  wikipedia_url: z.string().optional(),
  bdTempIds: z.array(z.string()).optional(),
});

const WizardPayloadSchema = z.object({
  event: z.object({
    name: z.string().min(1, 'Le nom est requis'),
    date: z.string().min(1, 'La date est requise'),
    hour: z.string().optional(),
    place: z.string().optional(),
    fb_event: z.string().optional(),
    cover_url: urlField,
  }),
  bds: z.array(z.object({
    tempId: z.string(),
    ...WizardBdSchema.shape,
  })),
  authors: z.array(WizardAuthorSchema).optional(),
});

export type WizardActionState = {
  message?: string | null;
  success?: boolean;
  eventId?: string;
};

export async function createEventWithRelations(
  prevState: WizardActionState,
  formData: FormData,
): Promise<WizardActionState> {
  await requireAdmin();

  let payload;
  try {
    payload = JSON.parse(formData.get('payload') as string);
  } catch {
    return { message: 'Payload invalide.' };
  }

  const parsed = WizardPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return { message: 'Données invalides: ' + parsed.error.issues.map(i => i.message).join(', ') };
  }

  const { event, bds } = parsed.data;
  // Authors now live nested under each comic; collapse duplicates and gather
  // the per-comic links + the event-level union.
  const { distinct: distinctAuthors, perBdLinks } = collectWizardAuthors(bds);

  let createdEventId = '';

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Resolve/create publishers (per comic)
      const publisherMap = new Map<string, string>(); // bd.tempId -> publisher dbId
      for (const bd of bds) {
        if (bd.mode === 'new' && bd.publisherMode === 'new' && bd.newPublisherName) {
          const existing = await tx.publisher.findFirst({
            where: { name: { equals: bd.newPublisherName, mode: 'insensitive' } },
          });
          publisherMap.set(
            bd.tempId,
            existing?.id ?? (await tx.publisher.create({ data: { name: bd.newPublisherName } })).id,
          );
        }
      }

      // 2. Resolve/create the distinct authors (deduped across all comics)
      const authorKeyToDbId = new Map<string, string>();
      for (const a of distinctAuthors) {
        if (a.mode === 'existing' && a.existingId) {
          authorKeyToDbId.set(a.key, a.existingId);
        } else if (a.mode === 'new' && a.name) {
          const existing = await tx.author.findFirst({
            where: { name: { equals: a.name, mode: 'insensitive' } },
          });
          authorKeyToDbId.set(
            a.key,
            existing?.id ??
              (
                await tx.author.create({
                  data: {
                    name: a.name,
                    bio: a.bio || null,
                    photo_url: a.photo_url || null,
                    wikipedia_url: a.wikipedia_url || null,
                    website: a.website || null,
                  },
                })
              ).id,
          );
        }
      }

      // 3. Create the event
      const createdEvent = await tx.event.create({
        data: {
          name: event.name,
          date: new Date(event.date),
          hour: event.hour || null,
          place: event.place || null,
          fb_event: event.fb_event || null,
          cover_url: event.cover_url,
        },
      });
      createdEventId = createdEvent.id;

      // 4. Create new BDs (or link existing) and connect to the event
      const bdIdMap = new Map<string, string>(); // bd.tempId -> bd dbId
      for (const bd of bds) {
        if (bd.mode === 'existing' && bd.existingId) {
          bdIdMap.set(bd.tempId, bd.existingId);
          await tx.bdEvent.create({ data: { bdId: bd.existingId, eventId: createdEvent.id } });
        } else if (bd.mode === 'new' && bd.title) {
          let pubId = bd.publisherId || null;
          if (bd.publisherMode === 'new' && publisherMap.has(bd.tempId)) {
            pubId = publisherMap.get(bd.tempId)!;
          }

          const genreIdList = bd.genreIds ?? [];
          const createdBd = await tx.bd.create({
            data: {
              title: bd.title,
              publisherId: pubId,
              publishing_year: derivePublishingYear(bd.publication_date),
              ean: bd.ean || null,
              summary: bd.summary || null,
              cover_url: bd.cover_url || null,
              publisher_url: bd.publisher_url || null,
              leslibraires_url: bd.leslibraires_url || null,
              publication_date: bd.publication_date ? new Date(bd.publication_date) : null,
              page_count: bd.page_count || null,
              price: bd.price || null,
              events: { create: [{ eventId: createdEvent.id }] },
              genres: { create: genreIdList.map((genreId) => ({ genreId })) },
            },
          });
          bdIdMap.set(bd.tempId, createdBd.id);
        }
      }

      // 5. Link authors to comics (BdAuthor) and to the event (AuthorEvent = union)
      for (const link of perBdLinks) {
        const authorId = authorKeyToDbId.get(link.authorKey);
        const bdId = bdIdMap.get(link.bdTempId);
        if (authorId && bdId) {
          await tx.bdAuthor.upsert({
            where: { authorId_bdId: { authorId, bdId } },
            create: { authorId, bdId },
            update: {},
          });
        }
      }
      for (const authorId of Array.from(new Set(authorKeyToDbId.values()))) {
        await tx.authorEvent.upsert({
          where: { authorId_eventId: { authorId, eventId: createdEvent.id } },
          create: { authorId, eventId: createdEvent.id },
          update: {},
        });
      }
    });
  } catch (error) {
    console.error('Wizard error:', error);
    return { message: prismaErrorMessage(error) ?? 'Erreur lors de la création.' };
  }

  // Resolve + persist the cover after the transaction (Blob upload is network I/O).
  await resolveAndPersistEventCover(createdEventId, {
    fbEvent: event.fb_event,
    coverUrl: event.cover_url,
    autoScrape: true,
  });

  // Delete draft on success
  const draftId = formData.get('draftId') as string | null;
  if (draftId) {
    await prisma.wizardDraft.delete({ where: { id: draftId } }).catch(() => {});
  }

  revalidatePath('/admin/drafts');
  revalidatePath('/admin/events');
  revalidatePath('/events');
  revalidatePath('/admin/bds');
  revalidatePath('/bds');
  revalidatePath('/admin/authors');
  revalidatePath('/authors');

  return { success: true, eventId: createdEventId };
}

// Wizard draft actions

export type DraftState = {
  message?: string | null;
  success?: boolean;
  draftId?: string;
};

export async function saveWizardDraft(
  prevState: DraftState,
  formData: FormData,
): Promise<DraftState> {
  await requireAdmin();
  const { auth } = await import('@/auth');
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { message: 'Non authentifié.' };

  let data;
  try {
    data = JSON.parse(formData.get('payload') as string);
  } catch {
    return { message: 'Payload invalide.' };
  }

  const draftId = formData.get('draftId') as string | null;
  const name = (data?.event?.name as string) || 'Brouillon';

  try {
    if (draftId) {
      await prisma.wizardDraft.update({
        where: { id: draftId },
        data: { name, data },
      });
      return { success: true, message: 'Brouillon sauvegardé.', draftId };
    } else {
      const created = await prisma.wizardDraft.create({
        data: { email, name, data },
      });
      return { success: true, message: 'Brouillon sauvegardé.', draftId: created.id };
    }
  } catch (error) {
    console.error('Save draft error:', error);
    return { message: 'Erreur lors de la sauvegarde.' };
  }
}

export async function deleteWizardDraft(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.wizardDraft.delete({ where: { id } });
  } catch (error) {
    console.error('Delete draft error:', error);
  }
  revalidatePath('/admin/drafts');
}

// Instagram Post actions

// Accept a full Instagram URL (post / reel / tv, with query strings) or a bare
// shortcode; the value is parsed + normalized before storing.
const InstagramPostSchema = z.object({
  shortcode: z.string().min(1, "Le code ou l'URL est requis").max(300),
});

export type InstagramPostState = {
  errors?: { shortcode?: string[] };
  message?: string | null;
  success?: boolean;
};

export async function addInstagramPost(
  prevState: InstagramPostState,
  formData: FormData,
): Promise<InstagramPostState> {
  await requireAdmin();

  const validatedFields = InstagramPostSchema.safeParse({
    shortcode: formData.get('shortcode'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants.',
    };
  }

  const parsed = parseInstagramUrl(validatedFields.data.shortcode);
  if (!parsed) {
    return {
      errors: { shortcode: ['URL ou code Instagram invalide.'] },
      message: 'Entrée invalide.',
    };
  }

  try {
    await prisma.$transaction([
      prisma.instagramPost.updateMany({
        data: { position: { increment: 1 } },
      }),
      prisma.instagramPost.create({
        data: { shortcode: parsed.shortcode, type: parsed.type, position: 0 },
      }),
    ]);
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && (error as { code?: unknown }).code === 'P2002') {
      return { message: 'Ce post est déjà ajouté.' };
    }
    return { message: "Erreur: impossible d'ajouter le post Instagram." };
  }

  revalidatePath('/admin/instagram');
  revalidatePath('/');
  return { success: true, message: 'Post Instagram ajouté.' };
}

export async function deleteInstagramPost(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.instagramPost.delete({ where: { id } });
  } catch (error) {
    console.error('Delete Instagram post error:', error);
  }
  revalidatePath('/admin/instagram');
  revalidatePath('/');
}

export async function toggleInstagramPost(id: string, active: boolean): Promise<void> {
  await requireAdmin();
  try {
    await prisma.instagramPost.update({
      where: { id },
      data: { active },
    });
  } catch (error) {
    console.error('Toggle Instagram post error:', error);
  }
  revalidatePath('/admin/instagram');
  revalidatePath('/');
}

export async function reorderInstagramPosts(orderedIds: string[]): Promise<void> {
  await requireAdmin();
  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.instagramPost.update({
          where: { id },
          data: { position: index + 1 },
        }),
      ),
    );
  } catch (error) {
    console.error('Reorder Instagram posts error:', error);
  }
  revalidatePath('/admin/instagram');
  revalidatePath('/');
}
