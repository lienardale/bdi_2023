'use client';

import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { Toast as ToastData } from './use-toast';

export default function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: () => void;
}) {
  return (
    <div
      className={clsx(
        'fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg text-sm text-white transition-all',
        {
          'bg-green-600': toast.type === 'success',
          'bg-red-600': toast.type === 'error',
        },
      )}
    >
      {toast.type === 'success' ? (
        <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
      ) : (
        <XCircleIcon className="w-5 h-5 flex-shrink-0" />
      )}
      <span>{toast.message}</span>
      <button onClick={onDismiss} className="ml-2 hover:opacity-80">
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
