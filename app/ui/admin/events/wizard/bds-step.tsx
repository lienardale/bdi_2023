'use client';

import { useTranslations } from 'next-intl';
import { Dispatch } from 'react';
import { WizardState, WizardAction } from './wizard-reducer';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import EntityCombobox from './entity-combobox';

function Required() {
  return <span className="text-destructive">*</span>;
}

export default function BdsStep({
  state,
  dispatch,
  existingBds,
  existingPublishers,
  existingGenres,
}: {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
  existingBds: { id: string; title: string }[];
  existingPublishers: { id: string; name: string }[];
  existingGenres: { id: string; name: string }[];
}) {
  const t = useTranslations('wizard');
  const tBds = useTranslations('bds');

  const updateBd = (tempId: string, updates: Record<string, unknown>) =>
    dispatch({ type: 'UPDATE_BD', tempId, updates });

  return (
    <div className="space-y-4">
      {state.bds.length === 0 && (
        <p className="text-sm text-muted-foreground">{t('noBdsAdded')}</p>
      )}

      {state.bds.map((bd) => (
        <div key={bd.tempId} className="rounded-md border border-border bg-card p-4 space-y-4">
          {/* Header: mode toggle + delete */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateBd(bd.tempId, { mode: 'existing', title: undefined })}
                className={`px-3 py-1 text-xs rounded-full ${
                  bd.mode === 'existing'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {t('selectExisting')}
              </button>
              <button
                type="button"
                onClick={() => updateBd(bd.tempId, { mode: 'new', existingId: undefined })}
                className={`px-3 py-1 text-xs rounded-full ${
                  bd.mode === 'new'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {t('createNew')}
              </button>
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_BD', tempId: bd.tempId })}
              className="text-destructive hover:text-destructive/80"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          {bd.mode === 'existing' ? (
            <EntityCombobox
              items={existingBds.map((b) => ({ id: b.id, label: b.title }))}
              value={bd.existingId ?? ''}
              onChange={(id) => updateBd(bd.tempId, { existingId: id })}
            />
          ) : (
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tBds('bdTitle')} <Required /></label>
                <input
                  type="text"
                  value={bd.title ?? ''}
                  onChange={(e) => updateBd(bd.tempId, { title: e.target.value })}
                  className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                />
              </div>

              {/* Publisher + Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('publisher')}</label>
                  <div className="flex gap-2 mb-1">
                    <button
                      type="button"
                      onClick={() => updateBd(bd.tempId, { publisherMode: 'existing', newPublisherName: undefined })}
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        (bd.publisherMode ?? 'existing') === 'existing'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {t('selectExisting')}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBd(bd.tempId, { publisherMode: 'new', publisherId: undefined })}
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        bd.publisherMode === 'new'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {t('createNew')}
                    </button>
                  </div>
                  {bd.publisherMode === 'new' ? (
                    <input
                      type="text"
                      value={bd.newPublisherName ?? ''}
                      onChange={(e) => updateBd(bd.tempId, { newPublisherName: e.target.value })}
                      placeholder={t('newPublisher')}
                      className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                    />
                  ) : (
                    <EntityCombobox
                      items={existingPublishers.map((p) => ({ id: p.id, label: p.name }))}
                      value={bd.publisherId ?? ''}
                      onChange={(id) => updateBd(bd.tempId, { publisherId: id })}
                    />
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('year')}</label>
                  <input
                    type="number"
                    value={bd.publishing_year ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { publishing_year: e.target.value ? Number(e.target.value) : undefined })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
              </div>

              {/* EAN + Publication date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('ean')}</label>
                  <input
                    type="text"
                    maxLength={13}
                    value={bd.ean ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { ean: e.target.value })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('publicationDate')}</label>
                  <input
                    type="date"
                    value={bd.publication_date ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { publication_date: e.target.value })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
              </div>

              {/* Pages + Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('pageCount')}</label>
                  <input
                    type="number"
                    value={bd.page_count ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { page_count: e.target.value ? Number(e.target.value) : undefined })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('price')}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={bd.price ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { price: e.target.value ? Number(e.target.value) : undefined })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tBds('summary')}</label>
                <textarea
                  value={bd.summary ?? ''}
                  onChange={(e) => updateBd(bd.tempId, { summary: e.target.value })}
                  rows={2}
                  className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                />
              </div>

              {/* Cover URL */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tBds('coverUrl')}</label>
                <input
                  type="url"
                  value={bd.cover_url ?? ''}
                  onChange={(e) => updateBd(bd.tempId, { cover_url: e.target.value })}
                  className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                />
              </div>

              {/* Publisher URL + leslibraires URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('publisherUrl')}</label>
                  <input
                    type="url"
                    value={bd.publisher_url ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { publisher_url: e.target.value })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('leslibrairesUrl')}</label>
                  <input
                    type="url"
                    value={bd.leslibraires_url ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { leslibraires_url: e.target.value })}
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
              </div>

              {/* Genres */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tBds('genres')}</label>
                <div className="flex flex-wrap gap-2">
                  {existingGenres.map((g) => {
                    const selected = bd.genreIds?.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          const ids = bd.genreIds ?? [];
                          updateBd(bd.tempId, {
                            genreIds: selected ? ids.filter((id) => id !== g.id) : [...ids, g.id],
                          });
                        }}
                        className={`px-2 py-1 text-xs rounded-full border ${
                          selected
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background text-muted-foreground border-border hover:border-primary'
                        }`}
                      >
                        {g.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => dispatch({ type: 'ADD_BD' })}
        className="w-full"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        {t('addBd')}
      </Button>
    </div>
  );
}
