import { describe, it, expect } from 'vitest';
import {
  collectWizardAuthors,
  derivePublishingYear,
  prismaErrorMessage,
} from '@/app/lib/wizard-helpers';
import { WizardBdEntry } from '@/app/lib/definitions';

function bd(tempId: string, authors: WizardBdEntry['authors']): WizardBdEntry {
  return { tempId, mode: 'new', title: tempId, authors };
}

describe('collectWizardAuthors', () => {
  it('collapses the same new author across two comics into one distinct entry with two links', () => {
    const bds = [
      bd('bd-1', [{ tempId: 'a1', mode: 'new', name: 'Wilfrid Lupano' }]),
      bd('bd-2', [{ tempId: 'a2', mode: 'new', name: 'Wilfrid Lupano' }]),
    ];
    const { distinct, perBdLinks } = collectWizardAuthors(bds);
    expect(distinct).toHaveLength(1);
    expect(distinct[0]).toMatchObject({ mode: 'new', name: 'Wilfrid Lupano' });
    expect(perBdLinks).toHaveLength(2);
    expect(perBdLinks.map((l) => l.bdTempId).sort()).toEqual(['bd-1', 'bd-2']);
    expect(new Set(perBdLinks.map((l) => l.authorKey)).size).toBe(1);
  });

  it('dedups case-insensitively and keeps the first-seen casing', () => {
    const bds = [
      bd('bd-1', [{ tempId: 'a1', mode: 'new', name: 'Zep' }]),
      bd('bd-2', [{ tempId: 'a2', mode: 'new', name: 'ZEP' }]),
    ];
    const { distinct } = collectWizardAuthors(bds);
    expect(distinct).toHaveLength(1);
    expect(distinct[0].name).toBe('Zep');
  });

  it('keeps an existing author and a new author of the same name separate', () => {
    const bds = [
      bd('bd-1', [
        { tempId: 'a1', mode: 'existing', existingId: 'id-123' },
        { tempId: 'a2', mode: 'new', name: 'Riad Sattouf' },
      ]),
    ];
    const { distinct, perBdLinks } = collectWizardAuthors(bds);
    expect(distinct).toHaveLength(2);
    expect(perBdLinks).toHaveLength(2);
  });

  it('excludes blank-name new authors and empty-existingId rows', () => {
    const bds = [
      bd('bd-1', [
        { tempId: 'a1', mode: 'new', name: '   ' },
        { tempId: 'a2', mode: 'new' },
        { tempId: 'a3', mode: 'existing' },
      ]),
    ];
    const { distinct, perBdLinks } = collectWizardAuthors(bds);
    expect(distinct).toHaveLength(0);
    expect(perBdLinks).toHaveLength(0);
  });

  it('dedups duplicate links within the same comic', () => {
    const bds = [
      bd('bd-1', [
        { tempId: 'a1', mode: 'existing', existingId: 'id-1' },
        { tempId: 'a2', mode: 'existing', existingId: 'id-1' },
      ]),
    ];
    const { distinct, perBdLinks } = collectWizardAuthors(bds);
    expect(distinct).toHaveLength(1);
    expect(perBdLinks).toHaveLength(1);
  });

  it('handles comics with no authors', () => {
    const { distinct, perBdLinks } = collectWizardAuthors([bd('bd-1', undefined)]);
    expect(distinct).toHaveLength(0);
    expect(perBdLinks).toHaveLength(0);
  });
});

describe('derivePublishingYear', () => {
  it('returns the year of an ISO date', () => {
    expect(derivePublishingYear('2024-03-15')).toBe(2024);
  });
  it('returns null for empty/undefined/invalid', () => {
    expect(derivePublishingYear(undefined)).toBeNull();
    expect(derivePublishingYear(null)).toBeNull();
    expect(derivePublishingYear('')).toBeNull();
    expect(derivePublishingYear('not-a-date')).toBeNull();
  });
});

describe('prismaErrorMessage', () => {
  const p2002 = (target: unknown) => ({ code: 'P2002', meta: { target } });

  it('maps unique violations by target token', () => {
    expect(prismaErrorMessage(p2002(['date']))).toBe('Un événement existe déjà à cette date.');
    expect(prismaErrorMessage(p2002(['title']))).toBe('Une BD porte déjà ce titre.');
    expect(prismaErrorMessage(p2002(['name']))).toBe('Un événement porte déjà ce nom.');
  });

  it('handles constraint-name string targets', () => {
    expect(prismaErrorMessage(p2002('Event_date_key'))).toBe('Un événement existe déjà à cette date.');
    expect(prismaErrorMessage(p2002('Bd_title_key'))).toBe('Une BD porte déjà ce titre.');
  });

  it('returns null for non-P2002 or unknown targets', () => {
    expect(prismaErrorMessage(new Error('boom'))).toBeNull();
    expect(prismaErrorMessage({ code: 'P2003' })).toBeNull();
    expect(prismaErrorMessage(p2002(['something_else']))).toBeNull();
    expect(prismaErrorMessage(null)).toBeNull();
  });
});
