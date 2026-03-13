'use client';

import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';
import { enrichAllBds, enrichAllAuthors } from '@/app/lib/actions-enrichment';

export default function EnrichmentPage() {
  const [bdMessage, setBdMessage] = useState('');
  const [authorMessage, setAuthorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnrichBds = async () => {
    setLoading(true);
    setBdMessage('Enrichissement en cours...');
    const result = await enrichAllBds();
    setBdMessage(result.message);
    setLoading(false);
  };

  const handleEnrichAuthors = async () => {
    setLoading(true);
    setAuthorMessage('Enrichissement en cours...');
    const result = await enrichAllAuthors();
    setAuthorMessage(result.message);
    setLoading(false);
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        Enrichissement des données
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Auto-remplir les champs manquants (résumé, couverture, EAN, bio, photo) via les APIs Open Library et Wikipedia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">BDs</h2>
          <p className="text-sm text-gray-500 mb-4">
            Recherche EAN, couverture et résumé via Open Library. Génère les liens leslibraires.fr.
          </p>
          <button
            onClick={handleEnrichBds}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-50"
          >
            Enrichir toutes les BDs
          </button>
          {bdMessage && (
            <p className="mt-3 text-sm bg-white rounded-md p-2">{bdMessage}</p>
          )}
        </div>

        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">Auteurs</h2>
          <p className="text-sm text-gray-500 mb-4">
            Recherche biographie, photo et lien Wikipedia via l&apos;API Wikipedia (FR puis EN).
          </p>
          <button
            onClick={handleEnrichAuthors}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-50"
          >
            Enrichir tous les auteurs
          </button>
          {authorMessage && (
            <p className="mt-3 text-sm bg-white rounded-md p-2">{authorMessage}</p>
          )}
        </div>
      </div>
    </main>
  );
}
