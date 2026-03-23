import { describe, it, expect } from 'vitest';
import {
  wizardReducer,
  initialWizardState,
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

    it('REMOVE_BD also cleans up author bdTempIds references', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      const bdTempId = state.bds[0].tempId;
      state = wizardReducer(state, { type: 'ADD_AUTHOR' });
      const authorTempId = state.authors[0].tempId;
      state = wizardReducer(state, {
        type: 'TOGGLE_AUTHOR_BD',
        authorTempId,
        bdTempId,
      });
      expect(state.authors[0].bdTempIds).toContain(bdTempId);

      state = wizardReducer(state, { type: 'REMOVE_BD', tempId: bdTempId });
      expect(state.authors[0].bdTempIds).not.toContain(bdTempId);
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

  describe('ADD_AUTHOR / REMOVE_AUTHOR / UPDATE_AUTHOR', () => {
    it('ADD_AUTHOR appends a new author entry', () => {
      const state = wizardReducer(initialWizardState, { type: 'ADD_AUTHOR' });
      expect(state.authors).toHaveLength(1);
      expect(state.authors[0].mode).toBe('new');
      expect(state.authors[0].bdTempIds).toEqual([]);
    });

    it('REMOVE_AUTHOR removes the author by tempId', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_AUTHOR' });
      state = wizardReducer(state, { type: 'ADD_AUTHOR' });
      const toRemove = state.authors[0].tempId;
      state = wizardReducer(state, { type: 'REMOVE_AUTHOR', tempId: toRemove });
      expect(state.authors).toHaveLength(1);
      expect(state.authors[0].tempId).not.toBe(toRemove);
    });

    it('UPDATE_AUTHOR updates the matching author', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_AUTHOR' });
      state = wizardReducer(state, {
        type: 'UPDATE_AUTHOR',
        tempId: state.authors[0].tempId,
        updates: { name: 'Wilfrid Lupano', bio: 'Scénariste' },
      });
      expect(state.authors[0].name).toBe('Wilfrid Lupano');
      expect(state.authors[0].bio).toBe('Scénariste');
    });
  });

  describe('TOGGLE_AUTHOR_BD', () => {
    it('adds BD link when not present', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      state = wizardReducer(state, { type: 'ADD_AUTHOR' });
      const bdTempId = state.bds[0].tempId;
      const authorTempId = state.authors[0].tempId;

      state = wizardReducer(state, {
        type: 'TOGGLE_AUTHOR_BD',
        authorTempId,
        bdTempId,
      });
      expect(state.authors[0].bdTempIds).toContain(bdTempId);
    });

    it('removes BD link when already present (toggle off)', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      state = wizardReducer(state, { type: 'ADD_AUTHOR' });
      const bdTempId = state.bds[0].tempId;
      const authorTempId = state.authors[0].tempId;

      // Toggle on
      state = wizardReducer(state, { type: 'TOGGLE_AUTHOR_BD', authorTempId, bdTempId });
      // Toggle off
      state = wizardReducer(state, { type: 'TOGGLE_AUTHOR_BD', authorTempId, bdTempId });
      expect(state.authors[0].bdTempIds).not.toContain(bdTempId);
    });

    it('does not affect other authors', () => {
      let state = wizardReducer(initialWizardState, { type: 'ADD_BD' });
      state = wizardReducer(state, { type: 'ADD_AUTHOR' });
      state = wizardReducer(state, { type: 'ADD_AUTHOR' });
      const bdTempId = state.bds[0].tempId;

      state = wizardReducer(state, {
        type: 'TOGGLE_AUTHOR_BD',
        authorTempId: state.authors[0].tempId,
        bdTempId,
      });
      expect(state.authors[0].bdTempIds).toContain(bdTempId);
      expect(state.authors[1].bdTempIds).not.toContain(bdTempId);
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
