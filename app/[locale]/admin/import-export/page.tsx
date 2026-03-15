'use client';

import { lusitana } from '@/app/ui/fonts';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ImportExportPage() {
  const t = useTranslations('admin');
  const tCommon = useTranslations('common');
  const [importEntity, setImportEntity] = useState('events');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{ message: string; count?: number; skipped?: number; error?: string } | null>(null);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFile) return;

    const formData = new FormData();
    formData.append('file', importFile);
    formData.append('entity', importEntity);

    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImportResult(data);
    } catch (error) {
      setImportResult({ message: t('importError'), error: 'true' });
    }
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        {t('importExport')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5" />
            {t('export')}
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href="/api/admin/export/events"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              {t('exportEvents')}
            </a>
            <a
              href="/api/admin/export/bds"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              {t('exportBds')}
            </a>
            <a
              href="/api/admin/export/authors"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              {t('exportAuthors')}
            </a>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowUpTrayIcon className="w-5" />
            {t('import')}
          </h2>
          <form onSubmit={handleImport} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('importType')}</label>
              <select
                value={importEntity}
                onChange={(e) => setImportEntity(e.target.value)}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              >
                <option value="events">{tCommon('events')}</option>
                <option value="bds">{tCommon('bds')}</option>
                <option value="authors">{tCommon('authors')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('importFile')}</label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="block w-full text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={!importFile}
              className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500 disabled:opacity-50"
            >
              {t('importButton')}
            </button>
            {importResult && (
              <div className={`text-sm rounded-md p-3 ${importResult.error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                <p className="font-medium">{importResult.message}</p>
                {importResult.count !== undefined && (
                  <p className="mt-1">Imported: {importResult.count}{importResult.skipped ? ` | Skipped: ${importResult.skipped}` : ''}</p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
