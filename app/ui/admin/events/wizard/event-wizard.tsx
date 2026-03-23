'use client';

import { useReducer, useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/app/ui/button';
import { wizardReducer, initialWizardState, WizardState } from './wizard-reducer';
import { createEventWithRelations, saveWizardDraft, WizardActionState, DraftState } from '@/app/lib/actions';
import WizardStepper from './wizard-stepper';
import EventStep from './event-step';
import BdsStep from './bds-step';
import AuthorsStep from './authors-step';
import SummaryStep from './summary-step';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const TOTAL_STEPS = 4;

export default function EventWizard({
  existingBds,
  existingAuthors,
  existingPublishers,
  existingGenres,
  initialDraft,
  draftId: initialDraftId,
}: {
  existingBds: { id: string; title: string }[];
  existingAuthors: { id: string; name: string }[];
  existingPublishers: { id: string; name: string }[];
  existingGenres: { id: string; name: string }[];
  initialDraft?: WizardState | null;
  draftId?: string;
}) {
  const t = useTranslations('wizard');
  const [state, dispatch] = useReducer(
    wizardReducer,
    initialDraft ?? initialWizardState,
  );
  const currentDraftIdRef = useRef<string | undefined>(initialDraftId);
  const [actionState, formAction] = useActionState<WizardActionState, FormData>(
    createEventWithRelations,
    { message: null },
  );
  const [draftState, saveDraftAction] = useActionState<DraftState, FormData>(
    saveWizardDraft,
    { message: null },
  );
  const [, startTransition] = useTransition();
  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle submission result
  useEffect(() => {
    if (actionState.success) {
      toast.success(t('successMessage'));
    } else if (actionState.message) {
      toast.error(actionState.message);
    }
  }, [actionState, t]);

  // Handle draft save result — track new draftId
  useEffect(() => {
    if (draftState.success) {
      toast.success(t('draftSaved'));
      if (draftState.draftId) {
        currentDraftIdRef.current = draftState.draftId;
      }
    } else if (draftState.message && !draftState.success) {
      toast.error(draftState.message);
    }
  }, [draftState, t]);

  const saveDraft = () => {
    const payload = JSON.stringify({
      currentStep: state.currentStep,
      event: state.event,
      bds: state.bds,
      authors: state.authors,
    });
    const fd = new FormData();
    fd.set('payload', payload);
    if (currentDraftIdRef.current) {
      fd.set('draftId', currentDraftIdRef.current);
    }
    startTransition(() => saveDraftAction(fd));
  };

  const validateStep = (): boolean => {
    setValidationError(null);
    if (state.currentStep === 0) {
      if (!state.event.name || !state.event.date) {
        setValidationError(t('eventRequired'));
        return false;
      }
    }
    if (state.currentStep === 1) {
      for (const bd of state.bds) {
        if (bd.mode === 'new' && !bd.title) {
          setValidationError(t('bdTitleRequired'));
          return false;
        }
        if (bd.mode === 'new' && bd.publisherMode === 'new' && !bd.newPublisherName) {
          setValidationError(t('publisherNameRequired'));
          return false;
        }
      }
    }
    if (state.currentStep === 2) {
      for (const author of state.authors) {
        if (author.mode === 'new' && !author.name) {
          setValidationError(t('authorNameRequired'));
          return false;
        }
      }
    }
    return true;
  };

  const goNext = () => {
    if (validateStep()) {
      dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
      saveDraft();
    }
  };

  const goPrev = () => {
    setValidationError(null);
    dispatch({ type: 'SET_STEP', step: state.currentStep - 1 });
  };

  const handleSubmit = () => {
    const payload = JSON.stringify({
      event: state.event,
      bds: state.bds,
      authors: state.authors,
    });
    const fd = new FormData();
    fd.set('payload', payload);
    if (currentDraftIdRef.current) {
      fd.set('draftId', currentDraftIdRef.current);
    }
    formAction(fd);
  };

  const isLastStep = state.currentStep === TOTAL_STEPS - 1;
  const isSkippable = state.currentStep === 1 || state.currentStep === 2;

  return (
    <div>
      <WizardStepper currentStep={state.currentStep} />

      <div className="rounded-md bg-card p-4 md:p-6 border border-border min-h-[300px]">
        {state.currentStep === 0 && <EventStep state={state} dispatch={dispatch} />}
        {state.currentStep === 1 && (
          <BdsStep
            state={state}
            dispatch={dispatch}
            existingBds={existingBds}
            existingPublishers={existingPublishers}
            existingGenres={existingGenres}
          />
        )}
        {state.currentStep === 2 && (
          <AuthorsStep
            state={state}
            dispatch={dispatch}
            existingAuthors={existingAuthors}
          />
        )}
        {state.currentStep === 3 && (
          <SummaryStep
            state={state}
            existingBds={existingBds}
            existingAuthors={existingAuthors}
            existingPublishers={existingPublishers}
            existingGenres={existingGenres}
          />
        )}

        {validationError && (
          <p className="mt-3 text-sm text-destructive">{validationError}</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <div className="flex gap-3">
          {state.currentStep > 0 && (
            <Button type="button" variant="outline" onClick={goPrev}>
              {t('previous')}
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={saveDraft}>
            <BookmarkIcon className="h-4 w-4 mr-1" />
            {t('saveDraft')}
          </Button>
        </div>
        <div className="flex gap-3">
          {isSkippable && !isLastStep && (
            <Button type="button" variant="outline" onClick={() => {
              setValidationError(null);
              dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
              saveDraft();
            }}>
              {t('skip')}
            </Button>
          )}
          {isLastStep ? (
            <Button type="button" onClick={handleSubmit}>
              {t('submit')}
            </Button>
          ) : (
            <Button type="button" onClick={goNext}>
              {t('next')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
