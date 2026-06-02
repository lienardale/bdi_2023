import { describe, it, expect } from 'vitest';
import {
  wizardReducer,
  initialWizardState,
  migrateDraft,
  WizardState,
} from '@/app/ui/admin/events/wizard/wizard-reducer';

describe('wizardReducer', () => {
  describe('SET_STEP', () => {
    it('updates currentStep', () => {
      const state = wizardReducer(initialWizardState, { type: 'SET_STEP', step: 2 });
      expect(state.currentStep).toBe(2);
    });

    it('does not mutate original state', () => {
      const original = { ...initialWizardState };
      wizardReducer(original, { type: 'SET_STEP', step: 3 });
      expect(original.currentStep).toBe(0);
    });
  });

  describe('SET_EVENT_FIELD', () => {
    it('updates name field', () => {
      const state = wizardReducer(initialWizardState, {
        type: 'SET_EVENT_FIELD',
        field: 'name',
        value: 'BDI #110',
      });
      expect(state.event.name).toBe('BDI #110');
    });

    it('updates date field', () => {
      const state = wizardReducer(initialWizardState, {
        type: 'SET_EVENT_FIELD',
        field: 'date',
        value: '2026-05-01',
      });
      expect(state.event.date).toBe('2026-05-01');
    });

    it('preserves other event fields when updating one', () => {
      const withName = wizardReducer(initialWizardState, {
        type: 'SET_EVENT_FIELD',
        field: 'name',
        value: 'Test',
      });
      const withDate = wizardReducer(withName, {
        type: 'SET_EVENT_FIELD',
        field: 'date',
        value: '2026-01-01',
      });
      expect(withDate.event.name).toBe('Test');
      expect(withDate.event.date).toBe('2026-01-01');
      expect(withDate.event.hour).toBe('20:30');
    });
  });

  describe('ADD_BD / REMOVE_BD / UPDATE_BD', () => {
    it('ADD_BD appends a new BD entry with mode "new"', () => {
      const state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      expect(state.bds).toHaveLength(1);
      expect(state.bds[0].mode).toBe('new');
      expect(state.bds[0].tempId).toBeTruthy();
      expect(state.bds[0].genreIds).toEqual([]);
      expect(state.bds[0].authors).toEqual([]);
    });

    it('ADD_BD generates unique tempIds', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      state = wizardReducer(state, { type: 'ADD_BD' });
      expect(state.bds[0].tempId).not.toBe(state.bds[1].tempId);
    });

    it('REMOVE_BD removes the BD by tempId', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      state = wizardReducer(state, { type: 'ADD_BD' });
      const idToRemove = state.bds[0].tempId;
      const remaining = state.bds[1].tempId;
      state = wizardReducer(state, { type: 'REMOVE_BD', tempId: idToRemove });
      expect(state.bds).toHaveLength(1);
      expect(state.bds[0].tempId).toBe(remaining);
    });

    it('REMOVE_BD drops the comic and its nested authors', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      const bdTempId = state.bds[0].tempId;
      state = wizardReducer(state, { type: 'ADD_BD_AUTHOR', bdTempId });
      expect(state.bds[0].authors).toHaveLength(1);
      state = wizardReducer(state, { type: 'REMOVE_BD', tempId: bdTempId });
      expect(state.bds).toHaveLength(0);
    });

    it('UPDATE_BD updates the matching BD entry', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      const tempId = state.bds[0].tempId;
      state = wizardReducer(state, {
        type: 'UPDATE_BD',
        tempId,
        updates: { title: 'Les Vieux Fourneaux', publishing_year: 2024 },
      });
      expect(state.bds[0].title).toBe('Les Vieux Fourneaux');
      expect(state.bds[0].publishing_year).toBe(2024);
    });

    it('UPDATE_BD does not affect other BDs', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      state = wizardReducer(state, { type: 'ADD_BD' });
      state = wizardReducer(state, {
        type: 'UPDATE_BD',
        tempId: state.bds[0].tempId,
        updates: { title: 'First' },
      });
      expect(state.bds[0].title).toBe('First');
      expect(state.bds[1].title).toBeUndefined();
    });
  });

  describe('nested authors (ADD/UPDATE/REMOVE_BD_AUTHOR)', () => {
    function bdWithAuthor() {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      const bdTempId = state.bds[0].tempId;
      state = wizardReducer(state, { type: 'ADD_BD_AUTHOR', bdTempId });
      return { state, bdTempId };
    }

    it('ADD_BD_AUTHOR appends a new author row to the right comic only', () => {
      let { state } = bdWithAuthor();
      state = wizardReducer(state, { type: 'ADD_BD' });
      expect(state.bds[0].authors).toHaveLength(1);
      expect(state.bds[0].authors![0].mode).toBe('new');
      expect(state.bds[1].authors).toHaveLength(0);
    });

    it('UPDATE_BD_AUTHOR edits the matching nested author', () => {
      const { state: initial, bdTempId } = bdWithAuthor();
      const authorTempId = initial.bds[0].authors![0].tempId;
      const state = wizardReducer(initial, {
        type: 'UPDATE_BD_AUTHOR',
        bdTempId,
        authorTempId,
        updates: { name: 'Zep', website: 'https://zep.example' },
      });
      expect(state.bds[0].authors![0].name).toBe('Zep');
      expect(state.bds[0].authors![0].website).toBe('https://zep.example');
    });

    it('REMOVE_BD_AUTHOR removes just that row', () => {
      let { state, bdTempId } = bdWithAuthor();
      state = wizardReducer(state, { type: 'ADD_BD_AUTHOR', bdTempId });
      expect(state.bds[0].authors).toHaveLength(2);
      const firstAuthor = state.bds[0].authors![0].tempId;
      state = wizardReducer(state, { type: 'REMOVE_BD_AUTHOR', bdTempId, authorTempId: firstAuthor });
      expect(state.bds[0].authors).toHaveLength(1);
      expect(state.bds[0].authors![0].tempId).not.toBe(firstAuthor);
    });
  });

  describe('migrateDraft', () => {
    it('fans legacy global authors out into nested comic authors', () => {
      const draft: WizardState = {
        currentStep: 2,
        event: { name: 'X', date: '2026-01-01', hour: '', place: '', fb_event: '' },
        bds: [
          { tempId: 'bd-1', mode: 'new', title: 'A', genreIds: [] },
          { tempId: 'bd-2', mode: 'new', title: 'B', genreIds: [] },
        ],
        authors: [
          { tempId: 'au-1', mode: 'new', name: 'Shared', bdTempIds: ['bd-1', 'bd-2'] },
          { tempId: 'au-2', mode: 'existing', existingId: 'id-9', bdTempIds: ['bd-1'] },
        ],
      };
      const migrated = migrateDraft(draft);
      expect(migrated.authors).toHaveLength(0);
      expect(migrated.bds[0].authors).toHaveLength(2); // Shared + existing
      expect(migrated.bds[1].authors).toHaveLength(1); // Shared only
      expect(migrated.bds[0].authors!.map((a) => a.name)).toContain('Shared');
    });

    it('clamps an out-of-range currentStep (old Authors step) into range', () => {
      const draft: WizardState = {
        currentStep: 3,
        event: { name: 'X', date: '2026-01-01', hour: '', place: '', fb_event: '' },
        bds: [],
        authors: [],
      };
      expect(migrateDraft(draft).currentStep).toBe(2); // TOTAL_STEPS - 1
    });

    it('leaves an already-nested draft unchanged (idempotent)', () => {
      const draft: WizardState = {
        currentStep: 1,
        event: { name: 'X', date: '2026-01-01', hour: '', place: '', fb_event: '' },
        bds: [
          { tempId: 'bd-1', mode: 'new', title: 'A', genreIds: [], authors: [{ tempId: 'a1', mode: 'new', name: 'Z' }] },
        ],
        authors: [],
      };
      const migrated = migrateDraft(draft);
      expect(migrated.bds[0].authors).toHaveLength(1);
      expect(migrated.bds[0].authors![0].name).toBe('Z');
    });
  });

  describe('LOAD_DRAFT', () => {
    it('replaces entire state with draft', () => {
      const draft: WizardState = {
        currentStep: 2,
        event: { name: 'Saved Event', date: '2026-03-01', hour: '19:00', place: 'Paris', fb_event: '' },
        bds: [{ tempId: 'bd-saved', mode: 'new', title: 'Saved BD', genreIds: [] }],
        authors: [{ tempId: 'author-saved', mode: 'new', name: 'Author', bdTempIds: ['bd-saved'] }],
      };
      const state = wizardReducer(initialWizardState, { type: 'LOAD_DRAFT', draft });
      expect(state.currentStep).toBe(2);
      expect(state.event.name).toBe('Saved Event');
      expect(state.bds).toHaveLength(1);
      expect(state.authors).toHaveLength(1);
    });
  });

  describe('default case', () => {
    it('returns the same state for unknown action', () => {
      const state = wizardReducer(initialWizardState, { type: 'UNKNOWN' } as any);
      expect(state).toBe(initialWizardState);
    });
  });
});
