'use client';

import { lusitana } from '@/app/ui/fonts';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ImportExportClient({ canImport }: { canImport: boolean }) {
  const t = useTranslations('admin');
  const tCommon = useTranslations('common');
  const [importEntity, setImportEntity] = useState('events');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{ message: string; count?: number; skipped?: number; error?: string; details?: string; errors?: string[] } | null>(null);

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

      <div className={`grid grid-cols-1 ${canImport ? 'md:grid-cols-2' : ''} gap-8`}>
        <div className="rounded-xl bg-card p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5" />
            {t('export')}
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href="/api/admin/export/events"
              download
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {t('exportEvents')}
            </a>
            <a
              href="/api/admin/export/bds"
              download
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {t('exportBds')}
            </a>
            <a
              href="/api/admin/export/authors"
              download
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {t('exportAuthors')}
            </a>
            <a
              href="/api/admin/export/publishers"
              download
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {t('exportPublishers')}
            </a>
          </div>
        </div>

        {canImport && (
          <div className="rounded-xl bg-card p-6 border border-border">
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
                  className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                >
                  <option value="publishers">{tCommon('publishers')}</option>
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
                  <p className="font-medium">{importResult.message || importResult.error}</p>
                  {importResult.details && (
                    <p className="mt-1 text-xs font-mono break-all">{importResult.details}</p>
                  )}
                  {importResult.count !== undefined && (
                    <p className="mt-1">Imported: {importResult.count}{importResult.skipped ? ` | Skipped: ${importResult.skipped}` : ''}</p>
                  )}
                  {importResult.errors && importResult.errors.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer font-medium">
                        {importResult.errors.length} error(s)
                      </summary>
                      <ul className="mt-1 list-disc pl-4 text-xs font-mono max-h-48 overflow-y-auto">
                        {importResult.errors.map((err, i) => (
                          <li key={i} className="break-all">{err}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
