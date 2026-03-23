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

export default function AuthorsStep({
  state,
  dispatch,
  existingAuthors,
}: {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
  existingAuthors: { id: string; name: string }[];
}) {
  const t = useTranslations('wizard');
  const tAuthors = useTranslations('authors');

  const bdLabels = state.bds.map((bd) => ({
    tempId: bd.tempId,
    label: bd.mode === 'existing' ? `BD existante` : (bd.title || '(sans titre)'),
  }));

  return (
    <div className="space-y-4">
      {state.authors.length === 0 && (
        <p className="text-sm text-muted-foreground">{t('noAuthorsAdded')}</p>
      )}

      {state.authors.map((author) => (
        <div key={author.tempId} className="rounded-md border border-border bg-card p-4 space-y-4">
          {/* Header: mode toggle + delete */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_AUTHOR',
                    tempId: author.tempId,
                    updates: { mode: 'existing', name: undefined },
                  })
                }
                className={`px-3 py-1 text-xs rounded-full ${
                  author.mode === 'existing'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {t('selectExisting')}
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_AUTHOR',
                    tempId: author.tempId,
                    updates: { mode: 'new', existingId: undefined },
                  })
                }
                className={`px-3 py-1 text-xs rounded-full ${
                  author.mode === 'new'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {t('createNew')}
              </button>
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_AUTHOR', tempId: author.tempId })}
              className="text-destructive hover:text-destructive/80"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          {author.mode === 'existing' ? (
            <EntityCombobox
              items={existingAuthors.map((a) => ({ id: a.id, label: a.name }))}
              value={author.existingId ?? ''}
              onChange={(id) =>
                dispatch({
                  type: 'UPDATE_AUTHOR',
                  tempId: author.tempId,
                  updates: { existingId: id },
                })
              }
            />
          ) : (
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tAuthors('name')} <Required /></label>
                <input
                  type="text"
                  value={author.name ?? ''}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_AUTHOR',
                      tempId: author.tempId,
                      updates: { name: e.target.value },
                    })
                  }
                  className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                />
              </div>

              {/* Biography */}
              <div>
                <label className="mb-1 block text-sm font-medium">{tAuthors('biography')}</label>
                <textarea
                  value={author.bio ?? ''}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_AUTHOR',
                      tempId: author.tempId,
                      updates: { bio: e.target.value },
                    })
                  }
                  rows={2}
                  className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                />
              </div>

              {/* Photo URL + Wikipedia URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{tAuthors('photoUrl')}</label>
                  <input
                    type="url"
                    value={author.photo_url ?? ''}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_AUTHOR',
                        tempId: author.tempId,
                        updates: { photo_url: e.target.value },
                      })
                    }
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{tAuthors('wikipediaUrl')}</label>
                  <input
                    type="url"
                    value={author.wikipedia_url ?? ''}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_AUTHOR',
                        tempId: author.tempId,
                        updates: { wikipedia_url: e.target.value },
                      })
                    }
                    className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* BD links — shown for both existing and new authors */}
          {bdLabels.length > 0 && (
            <div>
              <label className="mb-1 block text-sm font-medium">{t('linkToBooks')}</label>
              <div className="flex flex-wrap gap-2">
                {bdLabels.map((bd) => {
                  const linked = author.bdTempIds?.includes(bd.tempId);
                  return (
                    <button
                      key={bd.tempId}
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: 'TOGGLE_AUTHOR_BD',
                          authorTempId: author.tempId,
                          bdTempId: bd.tempId,
                        })
                      }
                      className={`px-2 py-1 text-xs rounded-full border ${
                        linked
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-muted-foreground border-border hover:border-primary'
                      }`}
                    >
                      {bd.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => dispatch({ type: 'ADD_AUTHOR' })}
        className="w-full"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        {t('addAuthor')}
      </Button>
    </div>
  );
}
