import { fetchLegalPage } from '@/app/lib/data';
import { LEGAL_LEGACY_SLUG } from '@/app/lib/legal-page';
import LegalAdminClient from './legal-admin-client';

export default async function AdminLegalPage() {
  const page = await fetchLegalPage();
  return (
    <main>
      <LegalAdminClient
        active={page?.active ?? false}
        slug={page?.slug ?? LEGAL_LEGACY_SLUG}
        titleFr={page?.titleFr ?? ''}
        titleEn={page?.titleEn ?? ''}
        contentFr={page?.contentFr ?? ''}
        contentEn={page?.contentEn ?? ''}
      />
    </main>
  );
}
