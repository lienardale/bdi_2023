import { WizardBdEntry, WizardAuthorEntry, WizardEvent } from '@/app/lib/definitions';

export type WizardState = {
  currentStep: number;
  event: WizardEvent;
  bds: WizardBdEntry[];
  authors: WizardAuthorEntry[];
};

export type WizardAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_EVENT_FIELD'; field: keyof WizardEvent; value: string }
  | { type: 'ADD_BD' }
  | { type: 'REMOVE_BD'; tempId: string }
  | { type: 'UPDATE_BD'; tempId: string; updates: Partial<WizardBdEntry> }
  | { type: 'ADD_AUTHOR' }
  | { type: 'REMOVE_AUTHOR'; tempId: string }
  | { type: 'UPDATE_AUTHOR'; tempId: string; updates: Partial<WizardAuthorEntry> }
  | { type: 'TOGGLE_AUTHOR_BD'; authorTempId: string; bdTempId: string }
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
        bds: [...state.bds, { tempId: genTempId('bd'), mode: 'new', genreIds: [] }],
      };

    case 'REMOVE_BD': {
      const removedBdId = action.tempId;
      return {
        ...state,
        bds: state.bds.filter((b) => b.tempId !== removedBdId),
        authors: state.authors.map((a) => ({
          ...a,
          bdTempIds: a.bdTempIds?.filter((id) => id !== removedBdId),
        })),
      };
    }

    case 'UPDATE_BD':
      return {
        ...state,
        bds: state.bds.map((b) =>
          b.tempId === action.tempId ? { ...b, ...action.updates } : b,
        ),
      };

    case 'ADD_AUTHOR':
      return {
        ...state,
        authors: [
          ...state.authors,
          { tempId: genTempId('author'), mode: 'new', bdTempIds: [] },
        ],
      };

    case 'REMOVE_AUTHOR':
      return {
        ...state,
        authors: state.authors.filter((a) => a.tempId !== action.tempId),
      };

    case 'UPDATE_AUTHOR':
      return {
        ...state,
        authors: state.authors.map((a) =>
          a.tempId === action.tempId ? { ...a, ...action.updates } : a,
        ),
      };

    case 'TOGGLE_AUTHOR_BD': {
      return {
        ...state,
        authors: state.authors.map((a) => {
          if (a.tempId !== action.authorTempId) return a;
          const ids = a.bdTempIds ?? [];
          const has = ids.includes(action.bdTempId);
          return {
            ...a,
            bdTempIds: has ? ids.filter((id) => id !== action.bdTempId) : [...ids, action.bdTempId],
          };
        }),
      };
    }

    case 'LOAD_DRAFT':
      return { ...action.draft };

    default:
      return state;
  }
}
