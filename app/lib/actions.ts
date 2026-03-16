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

  const { title, eventIds, publisherId, publishing_year, authorIds, ean, summary, publication_date, page_count, price, cover_url, publisher_url, leslibraires_url } = validatedFields.data;
  const authorIdList = authorIds ? authorIds.split(',').filter(Boolean) : [];
  const eventIdList: string[] = eventIds ? JSON.parse(eventIds) : [];

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

  const { title, eventIds, publisherId, publishing_year, authorIds, ean, summary, publication_date, page_count, price, cover_url, publisher_url, leslibraires_url } = validatedFields.data;
  const authorIdList = authorIds ? authorIds.split(',').filter(Boolean) : [];
  const eventIdList: string[] = eventIds ? JSON.parse(eventIds) : [];

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
    const maxPos = await prisma.instagramPost.aggregate({
      _max: { position: true },
    });
    const nextPosition = (maxPos._max.position ?? 0) + 1;

    await prisma.instagramPost.create({
      data: { shortcode, position: nextPosition },
    });
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
