/**
 * Pure derivation helpers for the event-creation wizard server action.
 *
 * Extracted from `createEventWithRelations` so the risky bits (author dedup,
 * the BD↔author / author↔event link sets, year derivation, Prisma error
 * messaging) can be unit-tested without mocking Prisma.
 */

// Structural inputs — accept both the client wizard types (string | undefined)
// and the Zod-inferred payload (URL fields become string | null after the
// sanitizing transform), so this helper can be shared by both.
type AuthorInput = {
  mode: 'existing' | 'new';
  existingId?: string;
  name?: string;
  bio?: string | null;
  photo_url?: string | null;
  wikipedia_url?: string | null;
  website?: string | null;
};
type BdInput = { tempId: string; authors?: AuthorInput[] };

/** A distinct author to upsert once, keyed so duplicates collapse. */
export type DistinctWizardAuthor = {
  key: string;
  mode: 'existing' | 'new';
  existingId?: string;
  name?: string;
  bio?: string | null;
  photo_url?: string | null;
  wikipedia_url?: string | null;
  website?: string | null;
};

/** A comic→author association, referencing an author by its dedup key. */
export type WizardBdAuthorLink = { bdTempId: string; authorKey: string };

/**
 * Flatten every comic's nested authors into:
 *  - `distinct`: one entry per real author (same existing id, or same new
 *    name case-insensitively, collapse to one — so an author entered under
 *    several comics is created/linked once);
 *  - `perBdLinks`: the (comic, author) pairs to turn into BdAuthor rows.
 *
 * The union of distinct authors is what gets linked to the event.
 */
export function collectWizardAuthors(bds: BdInput[]): {
  distinct: DistinctWizardAuthor[];
  perBdLinks: WizardBdAuthorLink[];
} {
  const distinct = new Map<string, DistinctWizardAuthor>();
  const perBdLinks: WizardBdAuthorLink[] = [];
  const seenLink = new Set<string>();

  for (const bd of bds) {
    for (const a of bd.authors ?? []) {
      let key: string | null = null;

      if (a.mode === 'existing' && a.existingId) {
        key = `existing:${a.existingId}`;
        if (!distinct.has(key)) {
          distinct.set(key, { key, mode: 'existing', existingId: a.existingId });
        }
      } else if (a.mode === 'new' && a.name && a.name.trim()) {
        const name = a.name.trim();
        key = `new:${name.toLowerCase()}`;
        if (!distinct.has(key)) {
          distinct.set(key, {
            key,
            mode: 'new',
            name,
            bio: a.bio,
            photo_url: a.photo_url,
            wikipedia_url: a.wikipedia_url,
            website: a.website,
          });
        }
      }

      if (key) {
        const linkId = `${bd.tempId}::${key}`;
        if (!seenLink.has(linkId)) {
          seenLink.add(linkId);
          perBdLinks.push({ bdTempId: bd.tempId, authorKey: key });
        }
      }
    }
  }

  return { distinct: Array.from(distinct.values()), perBdLinks };
}

/** Derive the publishing year from an ISO publication date, or null. */
export function derivePublishingYear(publication_date?: string | null): number | null {
  if (!publication_date) return null;
  const d = new Date(publication_date);
  if (isNaN(d.getTime())) return null;
  return d.getFullYear();
}

/**
 * Map a Prisma P2002 (unique constraint) error to a specific French message,
 * or null to fall back to the generic one. `meta.target` may be an array of
 * column names or a constraint-name string depending on the driver, so we
 * match loosely and check the most specific token (date) first.
 */
export function prismaErrorMessage(error: unknown): string | null {
  if (
    !(error && typeof error === 'object' && 'code' in error &&
      (error as { code?: unknown }).code === 'P2002')
  ) {
    return null;
  }
  const target = (error as { meta?: { target?: unknown } }).meta?.target;
  const t = (Array.isArray(target) ? target.join(',') : String(target ?? '')).toLowerCase();

  if (t.includes('date')) return 'Un événement existe déjà à cette date.';
  if (t.includes('title')) return 'Une BD porte déjà ce titre.';
  if (t.includes('name')) return 'Un événement porte déjà ce nom.';
  return null;
}
