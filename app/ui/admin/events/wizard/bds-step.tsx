'use client';

import { useTranslations } from 'next-intl';
import { Dispatch } from 'react';
import { WizardState, WizardAction } from './wizard-reducer';
import { WizardBdAuthorEntry } from '@/app/lib/definitions';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import EntityAutocomplete from './entity-autocomplete';
import { isValidEan13 } from '@/app/lib/validation';
import { isValidHttpUrl } from '@/app/lib/url-utils';

function Required() {
  return <span className="text-destructive">*</span>;
}

function Warning({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return <p className="mt-1 text-xs text-amber-600">{children}</p>;
}

const inputClass =
  'block w-full rounded-md border border-input bg-background py-2 px-3 text-sm';

function AuthorRow({
  bdTempId,
  author,
  dispatch,
  existingAuthors,
}: {
  bdTempId: string;
  author: WizardBdAuthorEntry;
  dispatch: Dispatch<WizardAction>;
  existingAuthors: { id: string; name: string }[];
}) {
  const t = useTranslations('wizard');
  const tAuthors = useTranslations('authors');

  const update = (updates: Partial<WizardBdAuthorEntry>) =>
    dispatch({ type: 'UPDATE_BD_AUTHOR', bdTempId, authorTempId: author.tempId, updates });

  return (
    <div className="rounded-md border border-border bg-background p-3 space-y-3">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <EntityAutocomplete
            items={existingAuthors.map((a) => ({ id: a.id, label: a.name }))}
            selection={
              author.mode === 'existing' && author.existingId
                ? { mode: 'existing', existingId: author.existingId }
                : author.name
                  ? { mode: 'new', name: author.name }
                  : null
            }
            onChange={(sel) =>
              sel.mode === 'existing'
                ? update({ mode: 'existing', existingId: sel.existingId, name: undefined })
                : update({ mode: 'new', name: sel.name, existingId: undefined })
            }
            placeholder={tAuthors('name')}
          />
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'REMOVE_BD_AUTHOR', bdTempId, authorTempId: author.tempId })}
          className="text-destructive hover:text-destructive/80 pt-2"
          aria-label={t('removeAuthor')}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {author.mode === 'new' && (
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">{tAuthors('biography')}</label>
            <textarea
              value={author.bio ?? ''}
              onChange={(e) => update({ bio: e.target.value })}
              rows={2}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{tAuthors('photoUrl')}</label>
              <input type="url" value={author.photo_url ?? ''} onChange={(e) => update({ photo_url: e.target.value })} className={inputClass} />
              <Warning show={!isValidHttpUrl(author.photo_url)}>{t('urlInvalid')}</Warning>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{tAuthors('wikipediaUrl')}</label>
              <input type="url" value={author.wikipedia_url ?? ''} onChange={(e) => update({ wikipedia_url: e.target.value })} className={inputClass} />
              <Warning show={!isValidHttpUrl(author.wikipedia_url)}>{t('urlInvalid')}</Warning>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{tAuthors('website')}</label>
              <input type="url" value={author.website ?? ''} onChange={(e) => update({ website: e.target.value })} className={inputClass} />
              <Warning show={!isValidHttpUrl(author.website)}>{t('urlInvalid')}</Warning>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BdsStep({
  state,
  dispatch,
  existingBds,
  existingAuthors,
  existingPublishers,
  existingGenres,
}: {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
  existingBds: { id: string; title: string }[];
  existingAuthors: { id: string; name: string }[];
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
          {/* Header: comic search/create + delete */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">{tBds('bdTitle')} <Required /></label>
              <EntityAutocomplete
                items={existingBds.map((b) => ({ id: b.id, label: b.title }))}
                selection={
                  bd.mode === 'existing' && bd.existingId
                    ? { mode: 'existing', existingId: bd.existingId }
                    : bd.title
                      ? { mode: 'new', name: bd.title }
                      : null
                }
                onChange={(sel) =>
                  sel.mode === 'existing'
                    ? updateBd(bd.tempId, { mode: 'existing', existingId: sel.existingId, title: undefined })
                    : updateBd(bd.tempId, { mode: 'new', title: sel.name, existingId: undefined })
                }
                placeholder={tBds('bdTitle')}
              />
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_BD', tempId: bd.tempId })}
              className="text-destructive hover:text-destructive/80 pt-7"
              aria-label={t('removeBd')}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          {bd.mode === 'new' && (
            <div className="space-y-4">
              {/* Publisher */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tBds('publisher')}</label>
                <EntityAutocomplete
                  items={existingPublishers.map((p) => ({ id: p.id, label: p.name }))}
                  selection={
                    bd.publisherMode === 'new' && bd.newPublisherName
                      ? { mode: 'new', name: bd.newPublisherName }
                      : bd.publisherId
                        ? { mode: 'existing', existingId: bd.publisherId }
                        : null
                  }
                  onChange={(sel) =>
                    sel.mode === 'existing'
                      ? updateBd(bd.tempId, { publisherMode: 'existing', publisherId: sel.existingId, newPublisherName: undefined })
                      : updateBd(bd.tempId, { publisherMode: 'new', newPublisherName: sel.name, publisherId: undefined })
                  }
                  placeholder={t('newPublisher')}
                />
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
                    className={inputClass}
                  />
                  <Warning show={!!bd.ean && !isValidEan13(bd.ean)}>{t('eanInvalid')}</Warning>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('publicationDate')}</label>
                  <input
                    type="date"
                    value={bd.publication_date ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { publication_date: e.target.value })}
                    className={inputClass}
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
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('price')}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={bd.price ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { price: e.target.value ? Number(e.target.value) : undefined })}
                    className={inputClass}
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
                  className={inputClass}
                />
              </div>

              {/* Cover URL */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tBds('coverUrl')}</label>
                <input
                  type="url"
                  value={bd.cover_url ?? ''}
                  onChange={(e) => updateBd(bd.tempId, { cover_url: e.target.value })}
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-muted-foreground">{tBds('coverUrlHint')}</p>
                <Warning show={!isValidHttpUrl(bd.cover_url)}>{t('urlInvalid')}</Warning>
              </div>

              {/* Publisher URL + leslibraires URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('publisherUrl')}</label>
                  <input
                    type="url"
                    value={bd.publisher_url ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { publisher_url: e.target.value })}
                    className={inputClass}
                  />
                  <Warning show={!isValidHttpUrl(bd.publisher_url)}>{t('urlInvalid')}</Warning>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tBds('leslibrairesUrl')}</label>
                  <input
                    type="url"
                    value={bd.leslibraires_url ?? ''}
                    onChange={(e) => updateBd(bd.tempId, { leslibraires_url: e.target.value })}
                    className={inputClass}
                  />
                  <Warning show={!isValidHttpUrl(bd.leslibraires_url)}>{t('urlInvalid')}</Warning>
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

          {/* Authors — shown for both new and existing comics */}
          <div>
            <label className="mb-1 block text-sm font-medium">{t('stepAuthors')}</label>
            <div className="space-y-2">
              {(bd.authors ?? []).map((author) => (
                <AuthorRow
                  key={author.tempId}
                  bdTempId={bd.tempId}
                  author={author}
                  dispatch={dispatch}
                  existingAuthors={existingAuthors}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: 'ADD_BD_AUTHOR', bdTempId: bd.tempId })}
              className="mt-2"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              {t('addAuthor')}
            </Button>
          </div>
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
