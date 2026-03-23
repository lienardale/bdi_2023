import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock next/navigation — redirect throws
const REDIRECT_ERROR = new Error('NEXT_REDIRECT');
vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => { throw REDIRECT_ERROR; }),
}));

// Mock next-intl/server
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
    $transaction: vi.fn(),
    event: { create: vi.fn() },
    bd: { create: vi.fn() },
    bdEvent: { create: vi.fn() },
    bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
    author: { create: vi.fn(), findFirst: vi.fn() },
    authorEvent: { create: vi.fn() },
    publisher: { create: vi.fn(), findFirst: vi.fn() },
    wizardDraft: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

// Mock next/server (for data queries)
vi.mock('next/server', () => ({
  connection: vi.fn(),
}));

import {
  createEventWithRelations,
  saveWizardDraft,
  deleteWizardDraft,
} from '@/app/lib/actions';
import {
  fetchWizardDrafts,
  fetchWizardDraftById,
} from '@/app/lib/data';
import { auth } from '@/auth';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

const mockAuth = vi.mocked(auth);

function makeWizardPayload(overrides: Record<string, any> = {}) {
  return {
    event: { name: 'Test Event', date: '2026-06-01', hour: '20:30', place: '', fb_event: '', ...overrides.event },
    bds: overrides.bds ?? [],
    authors: overrides.authors ?? [],
  };
}

function makeWizardFormData(payload: any, draftId?: string) {
  const fd = new FormData();
  fd.set('payload', JSON.stringify(payload));
  if (draftId) fd.set('draftId', draftId);
  return fd;
}

describe('Wizard Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockResolvedValue({
      user: { role: 'admin', email: 'admin@test.com' },
      expires: '',
    } as any);
  });

  // --- createEventWithRelations ---
  describe('createEventWithRelations', () => {
    it('rejects invalid JSON payload', async () => {
      const fd = new FormData();
      fd.set('payload', 'not-json');
      const result = await createEventWithRelations({}, fd);
      expect(result.message).toBe('Payload invalide.');
    });

    it('rejects missing event name', async () => {
      const payload = makeWizardPayload({ event: { name: '', date: '2026-01-01' } });
      const fd = makeWizardFormData(payload);
      const result = await createEventWithRelations({}, fd);
      expect(result.message).toContain('invalides');
    });

    it('rejects missing event date', async () => {
      const payload = makeWizardPayload({ event: { name: 'Test', date: '' } });
      const fd = makeWizardFormData(payload);
      const result = await createEventWithRelations({}, fd);
      expect(result.message).toContain('invalides');
    });

    it('calls prisma.$transaction with valid event-only payload', async () => {
      vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
        const tx = {
          event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
          publisher: { create: vi.fn(), findFirst: vi.fn() },
          author: { create: vi.fn(), findFirst: vi.fn() },
          bd: { create: vi.fn() },
          bdEvent: { create: vi.fn() },
          bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
          authorEvent: { create: vi.fn() },
        };
        await fn(tx);
        return tx;
      });

      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload);
      await expect(createEventWithRelations({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    });

    it('creates new BDs within the transaction', async () => {
      const mockTx = {
        event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
        publisher: { create: vi.fn(), findFirst: vi.fn() },
        author: { create: vi.fn(), findFirst: vi.fn() },
        bd: { create: vi.fn().mockResolvedValue({ id: 'bd-1' }) },
        bdEvent: { create: vi.fn() },
        bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
        authorEvent: { create: vi.fn() },
      };
      vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
        await fn(mockTx);
      });

      const payload = makeWizardPayload({
        bds: [{ tempId: 'bd-1', mode: 'new', title: 'My BD', genreIds: [] }],
      });
      const fd = makeWizardFormData(payload);
      await expect(createEventWithRelations({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(mockTx.bd.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ title: 'My BD' }),
        }),
      );
    });

    it('links existing BDs to event via bdEvent', async () => {
      const mockTx = {
        event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
        publisher: { create: vi.fn(), findFirst: vi.fn() },
        author: { create: vi.fn(), findFirst: vi.fn() },
        bd: { create: vi.fn() },
        bdEvent: { create: vi.fn() },
        bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
        authorEvent: { create: vi.fn() },
      };
      vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
        await fn(mockTx);
      });

      const payload = makeWizardPayload({
        bds: [{ tempId: 'bd-1', mode: 'existing', existingId: 'existing-bd-id' }],
      });
      const fd = makeWizardFormData(payload);
      await expect(createEventWithRelations({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(mockTx.bdEvent.create).toHaveBeenCalledWith({
        data: { bdId: 'existing-bd-id', eventId: 'event-1' },
      });
    });

    it('creates new authors and links to event', async () => {
      const mockTx = {
        event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
        publisher: { create: vi.fn(), findFirst: vi.fn() },
        author: { create: vi.fn().mockResolvedValue({ id: 'author-db-1' }), findFirst: vi.fn().mockResolvedValue(null) },
        bd: { create: vi.fn() },
        bdEvent: { create: vi.fn() },
        bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
        authorEvent: { create: vi.fn() },
      };
      vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
        await fn(mockTx);
      });

      const payload = makeWizardPayload({
        authors: [{ tempId: 'a-1', mode: 'new', name: 'Test Author', bdTempIds: [] }],
      });
      const fd = makeWizardFormData(payload);
      await expect(createEventWithRelations({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(mockTx.author.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: 'Test Author' }),
        }),
      );
      expect(mockTx.authorEvent.create).toHaveBeenCalledWith({
        data: { authorId: 'author-db-1', eventId: 'event-1' },
      });
    });

    it('deletes draft on success when draftId provided', async () => {
      vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
        const tx = {
          event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
          publisher: { create: vi.fn(), findFirst: vi.fn() },
          author: { create: vi.fn(), findFirst: vi.fn() },
          bd: { create: vi.fn() },
          bdEvent: { create: vi.fn() },
          bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
          authorEvent: { create: vi.fn() },
        };
        await fn(tx);
      });
      vi.mocked(prisma.wizardDraft.delete).mockResolvedValue({} as any);

      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload, 'draft-123');
      await expect(createEventWithRelations({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(prisma.wizardDraft.delete).toHaveBeenCalledWith({ where: { id: 'draft-123' } });
    });

    it('returns error message when transaction fails', async () => {
      vi.mocked(prisma.$transaction).mockRejectedValue(new Error('DB error'));
      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload);
      const result = await createEventWithRelations({}, fd);
      expect(result.message).toBe('Erreur lors de la création.');
    });

    it('revalidates paths on success', async () => {
      vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
        const tx = {
          event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
          publisher: { create: vi.fn(), findFirst: vi.fn() },
          author: { create: vi.fn(), findFirst: vi.fn() },
          bd: { create: vi.fn() },
          bdEvent: { create: vi.fn() },
          bdAuthor: { create: vi.fn(), findFirst: vi.fn() },
          authorEvent: { create: vi.fn() },
        };
        await fn(tx);
      });

      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload);
      await expect(createEventWithRelations({}, fd)).rejects.toThrow(REDIRECT_ERROR);
      expect(revalidatePath).toHaveBeenCalledWith('/admin/events');
      expect(revalidatePath).toHaveBeenCalledWith('/events');
      expect(revalidatePath).toHaveBeenCalledWith('/admin/bds');
      expect(revalidatePath).toHaveBeenCalledWith('/admin/drafts');
    });
  });

  // --- saveWizardDraft ---
  describe('saveWizardDraft', () => {
    it('rejects invalid JSON payload', async () => {
      const fd = new FormData();
      fd.set('payload', 'not-json');
      const result = await saveWizardDraft({}, fd);
      expect(result.message).toBe('Payload invalide.');
    });

    it('creates a new draft when no draftId', async () => {
      vi.mocked(prisma.wizardDraft.create).mockResolvedValue({ id: 'new-draft-id' } as any);
      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload);
      const result = await saveWizardDraft({}, fd);
      expect(result.success).toBe(true);
      expect(result.draftId).toBe('new-draft-id');
      expect(prisma.wizardDraft.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'admin@test.com',
          name: 'Test Event',
        }),
      });
    });

    it('updates existing draft when draftId provided', async () => {
      vi.mocked(prisma.wizardDraft.update).mockResolvedValue({ id: 'existing-draft' } as any);
      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload, 'existing-draft');
      const result = await saveWizardDraft({}, fd);
      expect(result.success).toBe(true);
      expect(result.draftId).toBe('existing-draft');
      expect(prisma.wizardDraft.update).toHaveBeenCalledWith({
        where: { id: 'existing-draft' },
        data: expect.objectContaining({ name: 'Test Event' }),
      });
    });

    it('uses "Brouillon" as name when event name is empty', async () => {
      vi.mocked(prisma.wizardDraft.create).mockResolvedValue({ id: 'draft-1' } as any);
      const payload = makeWizardPayload({ event: { name: '' } });
      const fd = makeWizardFormData(payload);
      await saveWizardDraft({}, fd);
      expect(prisma.wizardDraft.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ name: 'Brouillon' }),
      });
    });

    it('returns error on DB failure', async () => {
      vi.mocked(prisma.wizardDraft.create).mockRejectedValue(new Error('DB error'));
      const payload = makeWizardPayload();
      const fd = makeWizardFormData(payload);
      const result = await saveWizardDraft({}, fd);
      expect(result.message).toBe('Erreur lors de la sauvegarde.');
    });
  });

  // --- deleteWizardDraft ---
  describe('deleteWizardDraft', () => {
    it('deletes the draft by ID', async () => {
      vi.mocked(prisma.wizardDraft.delete).mockResolvedValue({} as any);
      await deleteWizardDraft('draft-to-delete');
      expect(prisma.wizardDraft.delete).toHaveBeenCalledWith({
        where: { id: 'draft-to-delete' },
      });
    });

    it('revalidates /admin/drafts path', async () => {
      vi.mocked(prisma.wizardDraft.delete).mockResolvedValue({} as any);
      await deleteWizardDraft('draft-1');
      expect(revalidatePath).toHaveBeenCalledWith('/admin/drafts');
    });

    it('does not throw on delete failure', async () => {
      vi.mocked(prisma.wizardDraft.delete).mockRejectedValue(new Error('Not found'));
      await expect(deleteWizardDraft('bad-id')).resolves.toBeUndefined();
    });
  });
});

// --- Data queries ---
describe('Wizard Data Queries', () => {
  describe('fetchWizardDrafts', () => {
    it('returns drafts for the given email', async () => {
      const mockDrafts = [
        { id: '1', name: 'Draft 1', data: {}, updatedAt: new Date() },
        { id: '2', name: 'Draft 2', data: {}, updatedAt: new Date() },
      ];
      vi.mocked(prisma.wizardDraft as any).findMany = vi.fn().mockResolvedValue(mockDrafts);
      const result = await fetchWizardDrafts('admin@test.com');
      expect(result).toHaveLength(2);
    });
  });

  describe('fetchWizardDraftById', () => {
    it('returns the draft for a given ID', async () => {
      const mockDraft = { id: '1', name: 'Draft', data: { event: { name: 'Test' } }, updatedAt: new Date() };
      vi.mocked(prisma.wizardDraft as any).findUnique = vi.fn().mockResolvedValue(mockDraft);
      const result = await fetchWizardDraftById('1');
      expect(result).toEqual(mockDraft);
    });

    it('returns null for non-existent draft', async () => {
      vi.mocked(prisma.wizardDraft as any).findUnique = vi.fn().mockResolvedValue(null);
      const result = await fetchWizardDraftById('nonexistent');
      expect(result).toBeNull();
    });
  });
});
