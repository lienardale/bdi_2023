'use client';

import { useReducer, useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/app/ui/button';
import { Link } from '@/i18n/routing';
import {
  wizardReducer,
  initialWizardState,
  migrateDraft,
  TOTAL_STEPS,
  WizardState,
} from './wizard-reducer';
import { createEventWithRelations, saveWizardDraft, WizardActionState, DraftState } from '@/app/lib/actions';
import WizardStepper from './wizard-stepper';
import EventStep from './event-step';
import BdsStep from './bds-step';
import SummaryStep from './summary-step';
import { BookmarkIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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
    initialDraft ? migrateDraft(initialDraft) : initialWizardState,
  );
  const currentDraftIdRef = useRef<string | undefined>(initialDraftId);
  const [actionState, formAction, isPending] = useActionState<WizardActionState, FormData>(
    createEventWithRelations,
    { message: null },
  );
  const [draftState, saveDraftAction] = useActionState<DraftState, FormData>(
    saveWizardDraft,
    { message: null },
  );
  const [, startTransition] = useTransition();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const showSuccess = !!actionState.success && !dismissed;

  // Handle submission result — success now returns state (no redirect).
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
        for (const author of bd.authors ?? []) {
          if (author.mode === 'new' && !author.name) {
            setValidationError(t('authorNameRequired'));
            return false;
          }
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
    setDismissed(false);
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

  const createAnother = () => {
    dispatch({ type: 'LOAD_DRAFT', draft: initialWizardState });
    currentDraftIdRef.current = undefined;
    setDismissed(true);
  };

  if (showSuccess) {
    return (
      <div className="rounded-md bg-card p-8 border border-border text-center space-y-4">
        <CheckCircleIcon className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-lg font-medium">{t('successMessage')}</h2>
        {state.event.name && <p className="text-sm text-muted-foreground">{state.event.name}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {actionState.eventId && (
            <Button asChild>
              <Link href={`/events/${actionState.eventId}`}>{t('viewEvent')}</Link>
            </Button>
          )}
          <Button variant="outline" onClick={createAnother}>
            {t('createAnother')}
          </Button>
        </div>
      </div>
    );
  }

  const isLastStep = state.currentStep === TOTAL_STEPS - 1;
  const isSkippable = state.currentStep === 1;

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
            existingAuthors={existingAuthors}
            existingPublishers={existingPublishers}
            existingGenres={existingGenres}
          />
        )}
        {state.currentStep === 2 && (
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

        {isLastStep && actionState.message && !actionState.success && (
          <div className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            <p className="font-medium">{actionState.message}</p>
            <p className="mt-1 text-xs">{t('retryGuidance')}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <div className="flex gap-3">
          {state.currentStep > 0 && (
            <Button type="button" variant="outline" onClick={goPrev} disabled={isPending}>
              {t('previous')}
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={saveDraft} disabled={isPending}>
            <BookmarkIcon className="h-4 w-4 mr-1" />
            {t('saveDraft')}
          </Button>
        </div>
        <div className="flex gap-3">
          {isSkippable && !isLastStep && (
            <Button type="button" variant="outline" disabled={isPending} onClick={() => {
              setValidationError(null);
              dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
              saveDraft();
            }}>
              {t('skip')}
            </Button>
          )}
          {isLastStep ? (
            <Button type="button" onClick={handleSubmit} disabled={isPending}>
              {isPending ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                  {t('submitting')}
                </>
              ) : (
                t('submit')
              )}
            </Button>
          ) : (
            <Button type="button" onClick={goNext} disabled={isPending}>
              {t('next')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
