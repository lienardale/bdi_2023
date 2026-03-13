'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import prisma from './prisma';
import { auth } from '@/auth';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'admin') {
    throw new Error('Unauthorized');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

// Event actions

const EventSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  date: z.string().min(1, 'La date est requise'),
  fb_event: z.string().optional(),
});

export type EventState = {
  errors?: { name?: string[]; date?: string[]; fb_event?: string[] };
  message?: string | null;
};

export async function createEvent(prevState: EventState, formData: FormData) {
  await requireAdmin();
  const validatedFields = EventSchema.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    fb_event: formData.get('fb_event'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, date, fb_event } = validatedFields.data;
  try {
    await prisma.event.create({
      data: { name, date: new Date(date), fb_event: fb_event || null },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer l\'événement.' };
  }

  revalidatePath('/admin/events');
  revalidatePath('/home/events');
  redirect('/admin/events');
}

export async function updateEvent(id: string, prevState: EventState, formData: FormData) {
  await requireAdmin();
  const validatedFields = EventSchema.safeParse({
    name: formData.get('name'),
    date: formData.get('date'),
    fb_event: formData.get('fb_event'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { name, date, fb_event } = validatedFields.data;
  try {
    await prisma.event.update({
      where: { id },
      data: { name, date: new Date(date), fb_event: fb_event || null },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour l\'événement.' };
  }

  revalidatePath('/admin/events');
  revalidatePath('/home/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.event.delete({ where: { id } });
  } catch (error) {
    console.error('Delete event error:', error);
  }
  revalidatePath('/admin/events');
  revalidatePath('/home/events');
}

// BD actions

const BdSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  eventId: z.string().min(1, 'L\'événement est requis'),
  publisher: z.string().optional(),
  publishing_year: z.coerce.number().optional(),
  authorIds: z.string().optional(),
  ean: z.string().max(13).optional(),
  summary: z.string().optional(),
  cover_url: z.string().optional(),
  publisher_url: z.string().optional(),
  leslibraires_url: z.string().optional(),
});

export type BdState = {
  errors?: { title?: string[]; eventId?: string[]; publisher?: string[]; publishing_year?: string[] };
  message?: string | null;
};

export async function createBd(prevState: BdState, formData: FormData) {
  await requireAdmin();
  const validatedFields = BdSchema.safeParse({
    title: formData.get('title'),
    eventId: formData.get('eventId'),
    publisher: formData.get('publisher'),
    publishing_year: formData.get('publishing_year') || undefined,
    authorIds: formData.get('authorIds'),
    ean: formData.get('ean'),
    summary: formData.get('summary'),
    cover_url: formData.get('cover_url'),
    publisher_url: formData.get('publisher_url'),
    leslibraires_url: formData.get('leslibraires_url'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { title, eventId, publisher, publishing_year, authorIds, ean, summary, cover_url, publisher_url, leslibraires_url } = validatedFields.data;
  const authorIdList = authorIds ? authorIds.split(',').filter(Boolean) : [];

  try {
    await prisma.bd.create({
      data: {
        title,
        eventId,
        publisher: publisher || null,
        publishing_year: publishing_year || null,
        ean: ean || null,
        summary: summary || null,
        cover_url: cover_url || null,
        publisher_url: publisher_url || null,
        leslibraires_url: leslibraires_url || null,
        authors: {
          create: authorIdList.map(authorId => ({ authorId })),
        },
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de créer la BD.' };
  }

  revalidatePath('/admin/bds');
  revalidatePath('/home/bds');
  redirect('/admin/bds');
}

export async function updateBd(id: string, prevState: BdState, formData: FormData) {
  await requireAdmin();
  const validatedFields = BdSchema.safeParse({
    title: formData.get('title'),
    eventId: formData.get('eventId'),
    publisher: formData.get('publisher'),
    publishing_year: formData.get('publishing_year') || undefined,
    authorIds: formData.get('authorIds'),
    ean: formData.get('ean'),
    summary: formData.get('summary'),
    cover_url: formData.get('cover_url'),
    publisher_url: formData.get('publisher_url'),
    leslibraires_url: formData.get('leslibraires_url'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Champs manquants.' };
  }

  const { title, eventId, publisher, publishing_year, authorIds, ean, summary, cover_url, publisher_url, leslibraires_url } = validatedFields.data;
  const authorIdList = authorIds ? authorIds.split(',').filter(Boolean) : [];

  try {
    await prisma.bd.update({
      where: { id },
      data: {
        title,
        eventId,
        publisher: publisher || null,
        publishing_year: publishing_year || null,
        ean: ean || null,
        summary: summary || null,
        cover_url: cover_url || null,
        publisher_url: publisher_url || null,
        leslibraires_url: leslibraires_url || null,
        authors: {
          deleteMany: {},
          create: authorIdList.map(authorId => ({ authorId })),
        },
      },
    });
  } catch (error) {
    return { message: 'Erreur: impossible de mettre à jour la BD.' };
  }

  revalidatePath('/admin/bds');
  revalidatePath('/home/bds');
  redirect('/admin/bds');
}

export async function deleteBd(id: string): Promise<void> {
  await requireAdmin();
  try {
    await prisma.bdAuthor.deleteMany({ where: { bdId: id } });
    await prisma.bd.delete({ where: { id } });
  } catch (error) {
    console.error('Delete BD error:', error);
  }
  revalidatePath('/admin/bds');
  revalidatePath('/home/bds');
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
    return { message: 'Erreur: impossible de créer l\'auteur.' };
  }

  revalidatePath('/admin/authors');
  revalidatePath('/home/authors');
  redirect('/admin/authors');
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
    return { message: 'Erreur: impossible de mettre à jour l\'auteur.' };
  }

  revalidatePath('/admin/authors');
  revalidatePath('/home/authors');
  redirect('/admin/authors');
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
  revalidatePath('/home/authors');
}
