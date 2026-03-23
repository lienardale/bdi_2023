import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import EventWizard from '@/app/ui/admin/events/wizard/event-wizard';
import { fetchBdOptions, fetchAuthorOptions, fetchPublishers, fetchGenreOptions, fetchWizardDraftById } from '@/app/lib/data';
import { WizardState } from '@/app/ui/admin/events/wizard/wizard-reducer';

export default async function CreateEventPage({
  searchParams,
}: {
  searchParams?: Promise<{ draft?: string }>;
}) {
  const resolvedParams = await searchParams;
  const draftId = resolvedParams?.draft;

  const [existingBds, existingAuthors, existingPublishers, existingGenres, draft] = await Promise.all([
    fetchBdOptions(),
    fetchAuthorOptions(),
    fetchPublishers(),
    fetchGenreOptions(),
    draftId ? fetchWizardDraftById(draftId) : null,
  ]);

  const initialDraft = draft?.data ? (draft.data as WizardState) : null;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Événements', href: '/admin/events' },
          { label: 'Créer', href: '/admin/events/create', active: true },
        ]}
      />
      <EventWizard
        existingBds={existingBds}
        existingAuthors={existingAuthors}
        existingPublishers={existingPublishers}
        existingGenres={existingGenres}
        initialDraft={initialDraft}
        draftId={draft?.id}
      />
    </main>
  );
}
