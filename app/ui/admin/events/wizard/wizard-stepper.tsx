'use client';

import { useTranslations } from 'next-intl';
import { CheckIcon } from '@heroicons/react/24/solid';

const STEP_KEYS = ['stepEvent', 'stepBds', 'stepAuthors', 'stepSummary'] as const;

export default function WizardStepper({ currentStep }: { currentStep: number }) {
  const t = useTranslations('wizard');

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {STEP_KEYS.map((key, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <li key={key} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : isCurrent
                        ? 'border-2 border-primary text-primary bg-background'
                        : 'border border-border text-muted-foreground bg-background'
                  }`}
                >
                  {isCompleted ? <CheckIcon className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`mt-1 hidden text-xs md:block ${
                    isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {t(key)}
                </span>
              </div>
              {i < STEP_KEYS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    isCompleted ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
