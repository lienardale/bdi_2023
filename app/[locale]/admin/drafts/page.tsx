import { lusitana } from '@/app/ui/fonts';
import { fetchWizardDrafts } from '@/app/lib/data';
import { deleteWizardDraft } from '@/app/lib/actions';
import { Link } from '@/i18n/routing';
import { PencilIcon } from '@heroicons/react/24/outline';
import { getTranslations, getLocale } from 'next-intl/server';
import { auth } from '@/auth';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import { WizardState } from '@/app/ui/admin/events/wizard/wizard-reducer';

export default async function AdminDraftsPage() {
  const session = await auth();
  const email = session?.user?.email;
  const drafts = email ? await fetchWizardDrafts(email) : [];
  const t = await getTranslations('wizard');
  const locale = await getLocale();

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>{t('drafts')}</h1>
      </div>

      {drafts.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('noDrafts')}</p>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {drafts.map((draft) => {
              const data = draft.data as WizardState;
              const bdCount = data?.bds?.length ?? 0;
              const authorCount = data?.authors?.length ?? 0;
              const draftName = draft.name || t('untitledDraft');
              return (
                <div key={draft.id} className="rounded-lg bg-card border border-border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{draftName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t('lastUpdated')}: {new Date(draft.updatedAt).toLocaleDateString(locale)}
                      </p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{t('bdCount', { count: bdCount })}</span>
                        <span>{t('authorCount', { count: authorCount })}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/admin/events/create?draft=${draft.id}`}
                        className="rounded-md border border-border p-1.5 hover:bg-muted"
                      >
                        <PencilIcon className="w-3.5" />
                      </Link>
                      <ConfirmDeleteButton
                        action={async () => {
                          'use server';
                          await deleteWizardDraft(draft.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden">
            <table className="w-full rounded-md text-foreground" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead className="bg-muted text-left text-sm font-normal">
                <tr>
                  <th className="px-4 py-3 font-medium">{t('stepEvent')}</th>
                  <th className="px-4 py-3 font-medium">{t('lastUpdated')}</th>
                  <th className="px-4 py-3 font-medium">{t('stepBds')}</th>
                  <th className="px-4 py-3 font-medium">{t('stepAuthors')}</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {drafts.map((draft) => {
                  const data = draft.data as WizardState;
                  const bdCount = data?.bds?.length ?? 0;
                  const authorCount = data?.authors?.length ?? 0;
                  const draftName = draft.name || t('untitledDraft');
                  return (
                    <tr key={draft.id}>
                      <td className="bg-card px-4 py-3 text-sm">
                        <Link
                          href={`/admin/events/create?draft=${draft.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {draftName}
                        </Link>
                        {data?.event?.date && (
                          <p className="text-xs text-muted-foreground">{data.event.date}</p>
                        )}
                      </td>
                      <td className="bg-card px-4 py-3 text-sm text-muted-foreground">
                        {new Date(draft.updatedAt).toLocaleDateString(locale)}
                      </td>
                      <td className="bg-card px-4 py-3 text-sm">{bdCount}</td>
                      <td className="bg-card px-4 py-3 text-sm">{authorCount}</td>
                      <td className="bg-card px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/events/create?draft=${draft.id}`}
                            className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90"
                          >
                            {t('resume')}
                          </Link>
                          <ConfirmDeleteButton
                            action={async () => {
                              'use server';
                              await deleteWizardDraft(draft.id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
