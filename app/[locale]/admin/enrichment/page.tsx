'use client';

import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type EnrichState = {
  loading: boolean;
  current: number;
  total: number;
  enriched: number;
  currentName: string;
  message: string;
};

const initialState: EnrichState = {
  loading: false,
  current: 0,
  total: 0,
  enriched: 0,
  currentName: '',
  message: '',
};

export default function EnrichmentPage() {
  const t = useTranslations('admin');
  const [bdState, setBdState] = useState<EnrichState>(initialState);
  const [authorState, setAuthorState] = useState<EnrichState>(initialState);
  const [coverState, setCoverState] = useState<EnrichState>(initialState);

  const startEnrichment = (entity: 'bds' | 'authors' | 'event-covers') => {
    const setState = entity === 'bds' ? setBdState : entity === 'authors' ? setAuthorState : setCoverState;
    setState({ ...initialState, loading: true });

    const eventSource = new EventSource(`/api/admin/enrich?entity=${entity}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'start') {
        setState(prev => ({ ...prev, total: data.total }));
      } else if (data.type === 'progress') {
        setState(prev => ({
          ...prev,
          current: data.current,
          total: data.total,
          enriched: data.enriched,
          currentName: data.name,
        }));
      } else if (data.type === 'done') {
        setState(prev => ({
          ...prev,
          loading: false,
          message: `${data.enriched}/${data.total} ${entity === 'bds' ? 'BDs' : 'auteurs'} enrichis`,
        }));
        eventSource.close();
      } else if (data.type === 'error') {
        setState(prev => ({
          ...prev,
          loading: false,
          message: `Error: ${data.message}`,
        }));
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setState(prev => ({ ...prev, loading: false, message: 'Connection error' }));
      eventSource.close();
    };
  };

  const renderProgress = (state: EnrichState) => {
    if (!state.loading && !state.message) return null;

    return (
      <div className="mt-3">
        {state.loading && state.total > 0 && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(state.current / state.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {state.current}/{state.total} — {state.currentName}
            </p>
          </>
        )}
        {state.loading && state.total === 0 && (
          <p className="text-sm text-gray-500">{t('enrichmentInProgress')}</p>
        )}
        {state.message && (
          <p className="text-sm bg-white rounded-md p-2">{state.message}</p>
        )}
      </div>
    );
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        {t('enrichment')}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        {t('enrichmentDescription')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">{t('enrichmentBdsTitle')}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {t('enrichmentBdsDesc')}
          </p>
          <button
            onClick={() => startEnrichment('bds')}
            disabled={bdState.loading || authorState.loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {t('enrichAllBds')}
          </button>
          {renderProgress(bdState)}
        </div>

        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">{t('enrichmentAuthorsTitle')}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {t('enrichmentAuthorsDesc')}
          </p>
          <button
            onClick={() => startEnrichment('authors')}
            disabled={bdState.loading || authorState.loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {t('enrichAllAuthors')}
          </button>
          {renderProgress(authorState)}
        </div>

        <div className="rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">{t('enrichmentCoversTitle')}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {t('enrichmentCoversDesc')}
          </p>
          <button
            onClick={() => startEnrichment('event-covers')}
            disabled={bdState.loading || authorState.loading || coverState.loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {t('enrichAllCovers')}
          </button>
          {renderProgress(coverState)}
        </div>
      </div>
    </main>
  );
}
