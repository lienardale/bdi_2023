import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/cache before imports
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  unstable_noStore: vi.fn(),
}));

// Mock next/navigation — redirect must throw to match Next.js behavior
const REDIRECT_ERROR = new Error('NEXT_REDIRECT');
vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => { throw REDIRECT_ERROR; }),
}));

// Mock next-intl/server — getLocale returns current locale
vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'fr'),
}));

// Mock auth
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

// Mock prisma
vi.mock('@/app/lib/prisma', () => ({
  default: {
    event: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    bd: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      updateMany: vi.fn(),
    },
    bdAuthor: {
      deleteMany: vi.fn(),
    },
    bdEvent: {
      deleteMany: vi.fn(),
    },
    bdGenre: {
      deleteMany: vi.fn(),
    },
    genre: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    author: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    authorEvent: {
      deleteMany: vi.fn(),
    },
    publisher: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

import {
  createEvent,
  updateEvent,
  deleteEvent,
  createBd,
  updateBd,
  deleteBd,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from '@/app/lib/actions';
import { auth } from '@/auth';
import prisma from '@/app/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';

const mockAuth = vi.mocked(auth);

// In real HTML forms, all inputs submit as '' (not null).
// FormData.get() returns null for missing keys, so we must set all fields.
const BD_DEFAULTS: Record<string, string> = {
  title: '', eventIds: '', publisherId: '', publishing_year: '',
  authorIds: '', genreIds: '', ean: '', summary: '', publication_date: '',
  page_count: '', price: '', cover_url: '', publisher_url: '', leslibraires_url: '',
};

const AUTHOR_DEFAULTS: Record<string, string> = {
  name: '', bio: '', photo_url: '', wikipedia_url: '',
};

const EVENT_DEFAULTS: Record<string, string> = {
  name: '', date: '', hour: '', place: '', fb_event: '',
};

function makeFormData(data: Record<string, string>, defaults: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const merged = { ...defaults, ...data };
  for (const [k, v] of Object.entries(merged)) {
    fd.set(k, v);
  }
  return fd;
}

describe('Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: authenticated admin
    mockAuth.mockResolvedValue({
      user: { role: 'admin', email: 'test@example.com' },
      expires: '',
    } as any);
    // Default locale
    vi.mocked(getLocale).mockResolvedValue('fr');
  });

  // --- Auth guard ---
  describe('requireAdmin guard', () => {
    it('throws when not authenticated', async () => {
      mockAuth.mockResolvedValue(null);
      await expect(deleteEvent('some-id')).rejects.toThrow('Unauthorized');
    });

    it('throws when user has no admin role', async () => {
      mockAuth.mockResolvedValue({
        user: { role: 'user', email: 'test@example.com' },
        expires: '',
      } as any);
      await expect(deleteEvent('some-id')).rejects.toThrow('Unauthorized');
    });
  });

  // --- Locale-aware redirect ---
  describe('localizedRedirect', () => {
    it('redirects with locale prefix (fr)', async () => {
      vi.mocked(prisma.event.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Test', date: '2024-01-01' }, EVENT_DEFAULTS);
      await expect(createEvent({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(redirect).toHaveBeenCalledWith('/fr/admin/events');
    });

    it('redirects with locale prefix (en)', async () => {
      vi.mocked(getLocale).mockResolvedValue('en');
      vi.mocked(prisma.author.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Author' }, AUTHOR_DEFAULTS);
      await expect(createAuthor({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(redirect).toHaveBeenCalledWith('/en/admin/authors');
    });

    it('redirects BDs with locale prefix', async () => {
      vi.mocked(prisma.bd.create).mockResolvedValue({} as any);
      const fd = makeFormData({ title: 'BD', eventIds: '["ev-id"]' }, BD_DEFAULTS);
      await expect(createBd({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(redirect).toHaveBeenCalledWith('/fr/admin/bds');
    });
  });

  // --- Event validation ---
  describe('Event Zod validation', () => {
    it('rejects empty name', async () => {
      const fd = makeFormData({ name: '', date: '2024-01-01' }, EVENT_DEFAULTS);
      const result = await createEvent({}, fd);
      expect(result.errors?.name).toBeDefined();
      expect(result.message).toContain('Champs manquants');
    });

    it('rejects empty date', async () => {
      const fd = makeFormData({ name: 'Test Event', date: '' }, EVENT_DEFAULTS);
      const result = await createEvent({}, fd);
      expect(result.errors?.date).toBeDefined();
    });

    it('accepts valid event data and calls prisma', async () => {
      vi.mocked(prisma.event.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Test Event', date: '2024-06-15' }, EVENT_DEFAULTS);
      await expect(createEvent({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.event.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Event',
          date: expect.any(Date),
          hour: null,
          place: null,
          fb_event: null,
        },
      });
    });

    it('passes fb_event when provided', async () => {
      vi.mocked(prisma.event.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Event', date: '2024-01-01', fb_event: 'https://fb.com/event' }, EVENT_DEFAULTS);
      await expect(createEvent({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.event.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ fb_event: 'https://fb.com/event' }),
      });
    });
  });

  // --- BD validation ---
  describe('BD Zod validation', () => {
    it('rejects empty title', async () => {
      const fd = makeFormData({ title: '', eventIds: '["some-id"]' }, BD_DEFAULTS);
      const result = await createBd({}, fd);
      expect(result.errors?.title).toBeDefined();
    });

    it('accepts empty eventIds (optional)', async () => {
      vi.mocked(prisma.bd.create).mockResolvedValue({} as any);
      const fd = makeFormData({ title: 'Test BD', eventIds: '' }, BD_DEFAULTS);
      await expect(createBd({}, fd)).rejects.toThrow(REDIRECT_ERROR);
    });

    it('rejects EAN longer than 13 chars', async () => {
      const fd = makeFormData({ title: 'Test', eventIds: '["id"]', ean: '12345678901234' }, BD_DEFAULTS);
      const result = await createBd({}, fd);
      expect(result.errors).toBeDefined();
    });

    it('accepts valid BD with all fields', async () => {
      vi.mocked(prisma.bd.create).mockResolvedValue({} as any);
      const fd = makeFormData({
        title: 'Astérix',
        eventIds: '["event-uuid"]',
        publisherId: 'pub-uuid',
        publishing_year: '2020',
        authorIds: 'author1,author2',
        ean: '9782070612758',
        summary: 'A great comic',
        publication_date: '2020-06-15',
        page_count: '48',
        price: '12.50',
      }, BD_DEFAULTS);
      await expect(createBd({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.bd.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Astérix',
          publisherId: 'pub-uuid',
          publishing_year: 2020,
          ean: '9782070612758',
          summary: 'A great comic',
          publication_date: expect.any(Date),
          page_count: 48,
          price: 12.5,
          authors: {
            create: [{ authorId: 'author1' }, { authorId: 'author2' }],
          },
          events: {
            create: [{ eventId: 'event-uuid' }],
          },
        }),
      });
    });

    it('handles optional fields gracefully', async () => {
      vi.mocked(prisma.bd.create).mockResolvedValue({} as any);
      const fd = makeFormData({ title: 'Minimal BD', eventIds: '["event-uuid"]' }, BD_DEFAULTS);
      await expect(createBd({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.bd.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Minimal BD',
          publisherId: null,
          publishing_year: null,
          page_count: null,
          price: null,
          events: {
            create: [{ eventId: 'event-uuid' }],
          },
        }),
      });
    });
  });

  // --- Author validation ---
  describe('Author Zod validation', () => {
    it('rejects empty name', async () => {
      const fd = makeFormData({ name: '' }, AUTHOR_DEFAULTS);
      const result = await createAuthor({}, fd);
      expect(result.errors?.name).toBeDefined();
    });

    it('accepts valid author with optional fields', async () => {
      vi.mocked(prisma.author.create).mockResolvedValue({} as any);
      const fd = makeFormData({
        name: 'Goscinny',
        bio: 'Scénariste français',
        photo_url: 'https://example.com/photo.jpg',
        wikipedia_url: 'https://fr.wikipedia.org/wiki/Goscinny',
      }, AUTHOR_DEFAULTS);
      await expect(createAuthor({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.author.create).toHaveBeenCalledWith({
        data: {
          name: 'Goscinny',
          bio: 'Scénariste français',
          photo_url: 'https://example.com/photo.jpg',
          wikipedia_url: 'https://fr.wikipedia.org/wiki/Goscinny',
        },
      });
    });

    it('sets optional fields to null when empty', async () => {
      vi.mocked(prisma.author.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Test Author' }, AUTHOR_DEFAULTS);
      await expect(createAuthor({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.author.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Author',
          bio: null,
          photo_url: null,
          wikipedia_url: null,
        },
      });
    });
  });

  // --- Update actions ---
  describe('Update actions', () => {
    it('updateEvent calls prisma.event.update and returns success', async () => {
      vi.mocked(prisma.event.update).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Updated', date: '2024-12-01' }, EVENT_DEFAULTS);
      const result = await updateEvent('event-id', {}, fd);
      expect(result.success).toBe(true);
      expect(prisma.event.update).toHaveBeenCalledWith({
        where: { id: 'event-id' },
        data: expect.objectContaining({ name: 'Updated' }),
      });
      expect(revalidatePath).toHaveBeenCalledWith('/admin/events');
    });

    it('updateBd syncs author, event and genre relationships', async () => {
      vi.mocked(prisma.bd.update).mockResolvedValue({} as any);
      const fd = makeFormData({ title: 'Updated BD', eventIds: '["ev-id"]', authorIds: 'a1,a2', genreIds: '["g1"]' }, BD_DEFAULTS);
      const result = await updateBd('bd-id', {}, fd);
      expect(result.success).toBe(true);
      expect(prisma.bd.update).toHaveBeenCalledWith({
        where: { id: 'bd-id' },
        data: expect.objectContaining({
          authors: {
            deleteMany: {},
            create: [{ authorId: 'a1' }, { authorId: 'a2' }],
          },
          events: {
            deleteMany: {},
            create: [{ eventId: 'ev-id' }],
          },
          genres: {
            deleteMany: {},
            create: [{ genreId: 'g1' }],
          },
        }),
      });
    });

    it('updateAuthor calls prisma.author.update', async () => {
      vi.mocked(prisma.author.update).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Updated Author', bio: 'New bio' }, AUTHOR_DEFAULTS);
      const result = await updateAuthor('author-id', {}, fd);
      expect(result.success).toBe(true);
      expect(prisma.author.update).toHaveBeenCalledWith({
        where: { id: 'author-id' },
        data: expect.objectContaining({ name: 'Updated Author', bio: 'New bio' }),
      });
    });
  });

  // --- Delete actions ---
  describe('Delete actions', () => {
    it('deleteEvent removes relations first then deletes', async () => {
      vi.mocked(prisma.bdEvent.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.authorEvent.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.event.delete).mockResolvedValue({} as any);
      await deleteEvent('event-id');
      expect(prisma.bdEvent.deleteMany).toHaveBeenCalledWith({ where: { eventId: 'event-id' } });
      expect(prisma.authorEvent.deleteMany).toHaveBeenCalledWith({ where: { eventId: 'event-id' } });
      expect(prisma.event.delete).toHaveBeenCalledWith({ where: { id: 'event-id' } });
      expect(revalidatePath).toHaveBeenCalledWith('/admin/events');
    });

    it('deleteBd removes author, event and genre relations first', async () => {
      vi.mocked(prisma.bdAuthor.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.bdEvent.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.bdGenre.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.bd.delete).mockResolvedValue({} as any);
      await deleteBd('bd-id');
      expect(prisma.bdAuthor.deleteMany).toHaveBeenCalledWith({ where: { bdId: 'bd-id' } });
      expect(prisma.bdEvent.deleteMany).toHaveBeenCalledWith({ where: { bdId: 'bd-id' } });
      expect(prisma.bdGenre.deleteMany).toHaveBeenCalledWith({ where: { bdId: 'bd-id' } });
      expect(prisma.bd.delete).toHaveBeenCalledWith({ where: { id: 'bd-id' } });
    });

    it('deleteAuthor removes relations first', async () => {
      vi.mocked(prisma.bdAuthor.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.authorEvent.deleteMany).mockResolvedValue({} as any);
      vi.mocked(prisma.author.delete).mockResolvedValue({} as any);
      await deleteAuthor('author-id');
      expect(prisma.bdAuthor.deleteMany).toHaveBeenCalledWith({ where: { authorId: 'author-id' } });
      expect(prisma.authorEvent.deleteMany).toHaveBeenCalledWith({ where: { authorId: 'author-id' } });
      expect(prisma.author.delete).toHaveBeenCalledWith({ where: { id: 'author-id' } });
    });
  });

  // --- Publisher actions ---
  describe('Publisher Zod validation', () => {
    it('rejects empty name', async () => {
      const fd = makeFormData({ name: '', parentId: '' });
      const result = await createPublisher({}, fd);
      expect(result.errors?.name).toBeDefined();
      expect(result.message).toContain('Champs manquants');
    });

    it('creates publisher with valid name', async () => {
      vi.mocked(prisma.publisher.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Dargaud', parentId: '' });
      await expect(createPublisher({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.publisher.create).toHaveBeenCalledWith({
        data: { name: 'Dargaud', parentId: null },
      });
    });

    it('creates publisher with parent', async () => {
      vi.mocked(prisma.publisher.create).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Delcourt Tonkam', parentId: 'parent-uuid' });
      await expect(createPublisher({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.publisher.create).toHaveBeenCalledWith({
        data: { name: 'Delcourt Tonkam', parentId: 'parent-uuid' },
      });
    });
  });

  describe('Publisher update', () => {
    it('updates publisher and returns success', async () => {
      vi.mocked(prisma.publisher.update).mockResolvedValue({} as any);
      const fd = makeFormData({ name: 'Updated Publisher', parentId: '' });
      const result = await updatePublisher('pub-id', {}, fd);
      expect(result.success).toBe(true);
      expect(prisma.publisher.update).toHaveBeenCalledWith({
        where: { id: 'pub-id' },
        data: { name: 'Updated Publisher', parentId: null },
      });
    });

    it('returns error on Prisma failure', async () => {
      vi.mocked(prisma.publisher.update).mockRejectedValue(new Error('DB error'));
      const fd = makeFormData({ name: 'Test', parentId: '' });
      const result = await updatePublisher('pub-id', {}, fd);
      expect(result.message).toContain('Erreur');
    });
  });

  describe('Publisher delete', () => {
    it('unlinks BDs and imprints before deleting', async () => {
      vi.mocked(prisma.bd.updateMany).mockResolvedValue({} as any);
      vi.mocked(prisma.publisher.updateMany).mockResolvedValue({} as any);
      vi.mocked(prisma.publisher.delete).mockResolvedValue({} as any);

      await deletePublisher('pub-id');
      expect(prisma.bd.updateMany).toHaveBeenCalledWith({
        where: { publisherId: 'pub-id' },
        data: { publisherId: null },
      });
      expect(prisma.publisher.updateMany).toHaveBeenCalledWith({
        where: { parentId: 'pub-id' },
        data: { parentId: null },
      });
      expect(prisma.publisher.delete).toHaveBeenCalledWith({ where: { id: 'pub-id' } });
      expect(revalidatePath).toHaveBeenCalledWith('/admin/publishers');
    });
  });

  // --- Error handling ---
  describe('Error handling', () => {
    it('createEvent returns error message on Prisma failure', async () => {
      vi.mocked(prisma.event.create).mockRejectedValue(new Error('DB error'));
      const fd = makeFormData({ name: 'Test', date: '2024-01-01' }, EVENT_DEFAULTS);
      const result = await createEvent({}, fd);
      expect(result.message).toContain('Erreur');
    });

    it('createBd returns error message on Prisma failure', async () => {
      vi.mocked(prisma.bd.create).mockRejectedValue(new Error('DB error'));
      const fd = makeFormData({ title: 'Test', eventIds: '["id"]' }, BD_DEFAULTS);
      const result = await createBd({}, fd);
      expect(result.message).toContain('Erreur');
    });

    it('createAuthor returns error message on Prisma failure', async () => {
      vi.mocked(prisma.author.create).mockRejectedValue(new Error('DB error'));
      const fd = makeFormData({ name: 'Test' }, AUTHOR_DEFAULTS);
      const result = await createAuthor({}, fd);
      expect(result.message).toContain('Erreur');
    });

    it('createPublisher returns error message on Prisma failure', async () => {
      vi.mocked(prisma.publisher.create).mockRejectedValue(new Error('DB error'));
      const fd = makeFormData({ name: 'Test', parentId: '' });
      const result = await createPublisher({}, fd);
      expect(result.message).toContain('Erreur');
    });
  });
});
