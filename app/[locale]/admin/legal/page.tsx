import { fetchLegalPage } from '@/app/lib/data';
import LegalAdminClient from './legal-admin-client';

export default async function AdminLegalPage() {
  const page = await fetchLegalPage();
  return (
    <main>
      <LegalAdminClient
        active={page?.active ?? false}
        contentFr={page?.contentFr ?? ''}
        contentEn={page?.contentEn ?? ''}
      />
    </main>
  );
}
