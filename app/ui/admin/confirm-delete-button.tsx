'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ConfirmDeleteButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('common');

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <TrashIcon className="w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">{t('confirmDelete')}</h3>
            <p className="text-sm text-gray-600 mb-6">{t('confirmDeleteMessage')}</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                {t('cancel')}
              </button>
              <form action={action}>
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                >
                  {t('delete')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
