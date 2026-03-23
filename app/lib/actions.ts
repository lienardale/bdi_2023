'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import prisma from './prisma';
import { requireAdmin } from './auth-utils';

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
});

export type EventState = {
  errors?: { name?: string[]; date?: string[]; fb_event?: string[] };
  message?: string | null;
  success?: boolean;
};

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

  const { name, date, hour, place, fb_event } = validatedFields.data;
  try {
    await prisma.event.create({
      data: { name, date: new Date(date), hour: hour || null, place: place || null, fb_event: fb_event || null },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer l\'événement.' };
  }

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

  const { name, date, hour, place, fb_event } = validatedFields.data;
  try {
    await prisma.event.update({
      where: { id },
      data: { name, date: new Date(date), hour: hour || null, place: place || null, fb_event: fb_event || null },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour l\'événement.' };
  }

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
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, bio, photo_url, wikipedia_url } = validatedFields.data;
  try {
    await prisma.author.create({
      data: { name, bio: bio || null, photo_url: photo_url || null, wikipedia_url: wikipedia_url || null },
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
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, bio, photo_url, wikipedia_url } = validatedFields.data;
  try {
    await prisma.author.update({
      where: { id },
      data: { name, bio: bio || null, photo_url: photo_url || null, wikipedia_url: wikipedia_url || null },
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
  cover_url: z.string().optional(),
  publisher_url: z.string().optional(),
  leslibraires_url: z.string().optional(),
  publication_date: z.string().optional(),
  page_count: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  genreIds: z.array(z.string()).optional(),
});

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
  }),
  bds: z.array(z.object({
    tempId: z.string(),
    ...WizardBdSchema.shape,
  })),
  authors: z.array(WizardAuthorSchema),
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

  const { event, bds, authors } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Create new publishers
      const publisherMap = new Map<string, string>(); // tempId -> dbId (using bd tempId)
      for (const bd of bds) {
        if (bd.mode === 'new' && bd.publisherMode === 'new' && bd.newPublisherName) {
          const existing = await tx.publisher.findFirst({ where: { name: bd.newPublisherName } });
          if (existing) {
            publisherMap.set(bd.tempId, existing.id);
          } else {
            const pub = await tx.publisher.create({ data: { name: bd.newPublisherName } });
            publisherMap.set(bd.tempId, pub.id);
          }
        }
      }

      // 2. Create new authors
      const authorIdMap = new Map<string, string>(); // tempId -> dbId
      for (const author of authors) {
        if (author.mode === 'existing' && author.existingId) {
          authorIdMap.set(author.tempId, author.existingId);
        } else if (author.mode === 'new' && author.name) {
          const existing = await tx.author.findFirst({ where: { name: author.name } });
          if (existing) {
            authorIdMap.set(author.tempId, existing.id);
          } else {
            const a = await tx.author.create({
              data: {
                name: author.name,
                bio: author.bio || null,
                photo_url: author.photo_url || null,
                wikipedia_url: author.wikipedia_url || null,
              },
            });
            authorIdMap.set(author.tempId, a.id);
          }
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
        },
      });

      // 4. Create new BDs and link to event
      const bdIdMap = new Map<string, string>(); // tempId -> dbId
      for (const bd of bds) {
        if (bd.mode === 'existing' && bd.existingId) {
          bdIdMap.set(bd.tempId, bd.existingId);
          await tx.bdEvent.create({
            data: { bdId: bd.existingId, eventId: createdEvent.id },
          });
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
              publishing_year: bd.publishing_year || null,
              ean: bd.ean || null,
              summary: bd.summary || null,
              cover_url: bd.cover_url || null,
              publisher_url: bd.publisher_url || null,
              leslibraires_url: bd.leslibraires_url || null,
              publication_date: bd.publication_date ? new Date(bd.publication_date) : null,
              page_count: bd.page_count || null,
              price: bd.price || null,
              events: { create: [{ eventId: createdEvent.id }] },
              genres: { create: genreIdList.map(genreId => ({ genreId })) },
            },
          });
          bdIdMap.set(bd.tempId, createdBd.id);
        }
      }

      // 5. Link authors to event + BDs
      for (const author of authors) {
        const authorDbId = authorIdMap.get(author.tempId);
        if (!authorDbId) continue;

        // Link author to event
        await tx.authorEvent.create({
          data: { authorId: authorDbId, eventId: createdEvent.id },
        });

        // Link author to BDs
        for (const bdTempId of author.bdTempIds ?? []) {
          const bdDbId = bdIdMap.get(bdTempId);
          if (bdDbId) {
            const exists = await tx.bdAuthor.findFirst({
              where: { authorId: authorDbId, bdId: bdDbId },
            });
            if (!exists) {
              await tx.bdAuthor.create({
                data: { authorId: authorDbId, bdId: bdDbId },
              });
            }
          }
        }
      }

    });
  } catch (error) {
    console.error('Wizard error:', error);
    return { message: 'Erreur lors de la création.' };
  }

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
  redirect(await localizedPath('/admin/events'));
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

const InstagramPostSchema = z.object({
  shortcode: z.string().min(1, 'Le shortcode est requis').max(50),
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

  const { shortcode } = validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.instagramPost.updateMany({
        data: { position: { increment: 1 } },
      }),
      prisma.instagramPost.create({
        data: { shortcode, position: 0 },
      }),
    ]);
  } catch {
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
