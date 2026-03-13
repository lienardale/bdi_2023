'use client';

import { lusitana } from '@/app/ui/fonts';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ImportExportPage() {
  const [importEntity, setImportEntity] = useState('events');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

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
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('Erreur lors de l\'import.');
    }
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        Import / Export CSV
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5" />
            Export
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href="/api/admin/export/events"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              Exporter les événements
            </a>
            <a
              href="/api/admin/export/bds"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              Exporter les BDs
            </a>
            <a
              href="/api/admin/export/authors"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              Exporter les auteurs
            </a>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowUpTrayIcon className="w-5" />
            Import
          </h2>
          <form onSubmit={handleImport} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={importEntity}
                onChange={(e) => setImportEntity(e.target.value)}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              >
                <option value="events">Événements</option>
                <option value="bds">BDs</option>
                <option value="authors">Auteurs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fichier CSV</label>
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
              Importer
            </button>
            {message && (
              <p className="text-sm text-gray-700 bg-white rounded-md p-2">{message}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
