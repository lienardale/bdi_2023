import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock next/navigation — redirect throws (other actions still use it)
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
    bdAuthor: { create: vi.fn(), upsert: vi.fn(), findFirst: vi.fn() },
    author: { create: vi.fn(), findFirst: vi.fn() },
    authorEvent: { create: vi.fn(), upsert: vi.fn() },
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

// A fresh mock transaction client with every model method the action uses.
function makeTx(overrides: Record<string, any> = {}) {
  return {
    event: { create: vi.fn().mockResolvedValue({ id: 'event-1' }) },
    publisher: { create: vi.fn().mockResolvedValue({ id: 'pub-1' }), findFirst: vi.fn().mockResolvedValue(null) },
    author: { create: vi.fn().mockResolvedValue({ id: 'author-db-1' }), findFirst: vi.fn().mockResolvedValue(null) },
    bd: { create: vi.fn().mockResolvedValue({ id: 'bd-db-1' }) },
    bdEvent: { create: vi.fn() },
    bdAuthor: { upsert: vi.fn(), create: vi.fn(), findFirst: vi.fn() },
    authorEvent: { upsert: vi.fn(), create: vi.fn() },
    ...overrides,
  };
}

function runTransactionWith(tx: any) {
  vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => fn(tx));
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
      const result = await createEventWithRelations({}, makeWizardFormData(payload));
      expect(result.message).toContain('invalides');
    });

    it('rejects missing event date', async () => {
      const payload = makeWizardPayload({ event: { name: 'Test', date: '' } });
      const result = await createEventWithRelations({}, makeWizardFormData(payload));
      expect(result.message).toContain('invalides');
    });

    it('returns success + eventId for a valid event-only payload (no redirect)', async () => {
      const tx = makeTx();
      runTransactionWith(tx);
      const result = await createEventWithRelations({}, makeWizardFormData(makeWizardPayload()));
      expect(result.success).toBe(true);
      expect(result.eventId).toBe('event-1');
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    });

    it('creates new BDs within the transaction', async () => {
      const tx = makeTx();
      runTransactionWith(tx);
      const payload = makeWizardPayload({
        bds: [{ tempId: 'bd-1', mode: 'new', title: 'My BD', genreIds: [] }],
      });
      const result = await createEventWithRelations({}, makeWizardFormData(payload));
      expect(result.success).toBe(true);
      expect(tx.bd.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ title: 'My BD' }) }),
      );
    });

    it('links existing BDs to event via bdEvent', async () => {
      const tx = makeTx();
      runTransactionWith(tx);
      const payload = makeWizardPayload({
        bds: [{ tempId: 'bd-1', mode: 'existing', existingId: 'existing-bd-id' }],
      });
      await createEventWithRelations({}, makeWizardFormData(payload));
      expect(tx.bdEvent.create).toHaveBeenCalledWith({
        data: { bdId: 'existing-bd-id', eventId: 'event-1' },
      });
    });

    it('derives publishing_year from the publication date', async () => {
      const tx = makeTx();
      runTransactionWith(tx);
      const payload = makeWizardPayload({
        bds: [{ tempId: 'bd-1', mode: 'new', title: 'Dated BD', publication_date: '2024-03-15', genreIds: [] }],
      });
      await createEventWithRelations({}, makeWizardFormData(payload));
      expect(tx.bd.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ publishing_year: 2024 }) }),
      );
    });

    it('creates a nested new author and links it to the comic and the event', async () => {
      const tx = makeTx();
      runTransactionWith(tx);
      const payload = makeWizardPayload({
        bds: [
          {
            tempId: 'bd-1',
            mode: 'new',
            title: 'My BD',
            genreIds: [],
            authors: [{ tempId: 'a-1', mode: 'new', name: 'Test Author' }],
          },
        ],
      });
      await createEventWithRelations({}, makeWizardFormData(payload));
      expect(tx.author.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ name: 'Test Author' }) }),
      );
      expect(tx.bdAuthor.upsert).toHaveBeenCalledTimes(1);
      expect(tx.authorEvent.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { authorId_eventId: { authorId: 'author-db-1', eventId: 'event-1' } },
        }),
      );
    });

    it('dedups the same new author across two comics into one create + one event link', async () => {
      const tx = makeTx({
        bd: { create: vi.fn().mockResolvedValueOnce({ id: 'bd-A' }).mockResolvedValueOnce({ id: 'bd-B' }) },
      });
      runTransactionWith(tx);
      const payload = makeWizardPayload({
        bds: [
          { tempId: 'bd-1', mode: 'new', title: 'BD One', genreIds: [], authors: [{ tempId: 'a-1', mode: 'new', name: 'Zep' }] },
          { tempId: 'bd-2', mode: 'new', title: 'BD Two', genreIds: [], authors: [{ tempId: 'a-2', mode: 'new', name: 'Zep' }] },
        ],
      });
      await createEventWithRelations({}, makeWizardFormData(payload));
      expect(tx.author.create).toHaveBeenCalledTimes(1); // deduped
      expect(tx.bdAuthor.upsert).toHaveBeenCalledTimes(2); // one link per comic
      expect(tx.authorEvent.upsert).toHaveBeenCalledTimes(1); // union = 1 author
    });

    it('maps a P2002 duplicate-name violation to a specific French message', async () => {
      vi.mocked(prisma.$transaction).mockRejectedValue({ code: 'P2002', meta: { target: ['name'] } });
      const result = await createEventWithRelations({}, makeWizardFormData(makeWizardPayload()));
      expect(result.message).toBe('Un événement porte déjà ce nom.');
      expect(result.success).toBeUndefined();
    });

    it('returns the generic error message for an unknown transaction failure', async () => {
      vi.mocked(prisma.$transaction).mockRejectedValue(new Error('DB error'));
      const result = await createEventWithRelations({}, makeWizardFormData(makeWizardPayload()));
      expect(result.message).toBe('Erreur lors de la création.');
    });

    it('deletes draft on success when draftId provided', async () => {
      runTransactionWith(makeTx());
      vi.mocked(prisma.wizardDraft.delete).mockResolvedValue({} as any);
      await createEventWithRelations({}, makeWizardFormData(makeWizardPayload(), 'draft-123'));
      expect(prisma.wizardDraft.delete).toHaveBeenCalledWith({ where: { id: 'draft-123' } });
    });

    it('revalidates paths on success', async () => {
      runTransactionWith(makeTx());
      await createEventWithRelations({}, makeWizardFormData(makeWizardPayload()));
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
      const result = await saveWizardDraft({}, makeWizardFormData(makeWizardPayload()));
      expect(result.success).toBe(true);
      expect(result.draftId).toBe('new-draft-id');
      expect(prisma.wizardDraft.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ email: 'admin@test.com', name: 'Test Event' }),
      });
    });

    it('updates existing draft when draftId provided', async () => {
      vi.mocked(prisma.wizardDraft.update).mockResolvedValue({ id: 'existing-draft' } as any);
      const result = await saveWizardDraft({}, makeWizardFormData(makeWizardPayload(), 'existing-draft'));
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
      await saveWizardDraft({}, makeWizardFormData(payload));
      expect(prisma.wizardDraft.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ name: 'Brouillon' }),
      });
    });

    it('returns error on DB failure', async () => {
      vi.mocked(prisma.wizardDraft.create).mockRejectedValue(new Error('DB error'));
      const result = await saveWizardDraft({}, makeWizardFormData(makeWizardPayload()));
      expect(result.message).toBe('Erreur lors de la sauvegarde.');
    });
  });

  // --- deleteWizardDraft ---
  describe('deleteWizardDraft', () => {
    it('deletes the draft by ID', async () => {
      vi.mocked(prisma.wizardDraft.delete).mockResolvedValue({} as any);
      await deleteWizardDraft('draft-to-delete');
      expect(prisma.wizardDraft.delete).toHaveBeenCalledWith({ where: { id: 'draft-to-delete' } });
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
