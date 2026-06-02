import { WizardBdEntry, WizardBdAuthorEntry, WizardAuthorEntry, WizardEvent } from '@/app/lib/definitions';

/** Total wizard steps: Event · Comics · Summary. */
export const TOTAL_STEPS = 3;

export type WizardState = {
  currentStep: number;
  event: WizardEvent;
  bds: WizardBdEntry[];
  // Legacy global authors — kept for old-draft back-compat only; new drafts
  // store authors nested under each comic (`bd.authors`). See migrateDraft.
  authors: WizardAuthorEntry[];
};

export type WizardAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_EVENT_FIELD'; field: keyof WizardEvent; value: string }
  | { type: 'ADD_BD' }
  | { type: 'REMOVE_BD'; tempId: string }
  | { type: 'UPDATE_BD'; tempId: string; updates: Partial<WizardBdEntry> }
  | { type: 'ADD_BD_AUTHOR'; bdTempId: string }
  | { type: 'UPDATE_BD_AUTHOR'; bdTempId: string; authorTempId: string; updates: Partial<WizardBdAuthorEntry> }
  | { type: 'REMOVE_BD_AUTHOR'; bdTempId: string; authorTempId: string }
  | { type: 'LOAD_DRAFT'; draft: WizardState };

let nextId = 0;
function genTempId(prefix: string) {
  return `${prefix}-${++nextId}`;
}

export const initialWizardState: WizardState = {
  currentStep: 0,
  event: { name: '', date: '', hour: '20:30', place: '', fb_event: '' },
  bds: [],
  authors: [],
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };

    case 'SET_EVENT_FIELD':
      return { ...state, event: { ...state.event, [action.field]: action.value } };

    case 'ADD_BD':
      return {
        ...state,
        bds: [...state.bds, { tempId: genTempId('bd'), mode: 'new', genreIds: [], authors: [] }],
      };

    case 'ADD_BD_AUTHOR':
      return {
        ...state,
        bds: state.bds.map((b) =>
          b.tempId === action.bdTempId
            ? { ...b, authors: [...(b.authors ?? []), { tempId: genTempId('bdauthor'), mode: 'new' as const }] }
            : b,
        ),
      };

    case 'UPDATE_BD_AUTHOR':
      return {
        ...state,
        bds: state.bds.map((b) =>
          b.tempId === action.bdTempId
            ? {
                ...b,
                authors: (b.authors ?? []).map((a) =>
                  a.tempId === action.authorTempId ? { ...a, ...action.updates } : a,
                ),
              }
            : b,
        ),
      };

    case 'REMOVE_BD_AUTHOR':
      return {
        ...state,
        bds: state.bds.map((b) =>
          b.tempId === action.bdTempId
            ? { ...b, authors: (b.authors ?? []).filter((a) => a.tempId !== action.authorTempId) }
            : b,
        ),
      };

    case 'REMOVE_BD':
      // Nested authors are removed along with the comic.
      return {
        ...state,
        bds: state.bds.filter((b) => b.tempId !== action.tempId),
      };

    case 'UPDATE_BD':
      return {
        ...state,
        bds: state.bds.map((b) =>
          b.tempId === action.tempId ? { ...b, ...action.updates } : b,
        ),
      };

    case 'LOAD_DRAFT':
      return { ...action.draft };

    default:
      return state;
  }
}

/**
 * Normalize a loaded draft to the current (nested-author) shape.
 * - Old drafts store authors globally (`state.authors` with `bdTempIds`) and
 *   have no `bd.authors`; fan those out into each comic's nested authors.
 * - New drafts already have nested authors; left untouched (idempotent).
 * - `currentStep` is clamped to the valid range (old step 2 "Authors" → Summary).
 */
export function migrateDraft(state: WizardState): WizardState {
  const bds = state.bds ?? [];
  const legacy = state.authors ?? [];
  const alreadyNested = bds.some((b) => (b.authors?.length ?? 0) > 0);

  let migratedBds = bds;
  if (!alreadyNested && legacy.length > 0) {
    migratedBds = bds.map((bd) => {
      const nested: WizardBdAuthorEntry[] = legacy
        .filter((a) => (a.bdTempIds ?? []).includes(bd.tempId))
        .map((a) => ({
          tempId: genTempId('bdauthor'),
          mode: a.mode,
          existingId: a.existingId,
          name: a.name,
          bio: a.bio,
          photo_url: a.photo_url,
          wikipedia_url: a.wikipedia_url,
        }));
      return { ...bd, authors: [...(bd.authors ?? []), ...nested] };
    });
  }

  const currentStep = Math.min(Math.max(state.currentStep ?? 0, 0), TOTAL_STEPS - 1);
  return { ...state, bds: migratedBds, authors: [], currentStep };
}
