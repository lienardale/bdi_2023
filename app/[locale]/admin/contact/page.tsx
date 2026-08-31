import { fetchAllContactSections } from '@/app/lib/data';
import ContactAdminClient from './contact-admin-client';
import { defaultContactSections } from '@/app/lib/contact-sections';

export default async function AdminContactPage() {
  const sections = await fetchAllContactSections();
  return (
    <main>
      <ContactAdminClient
        sections={sections}
        // Shown as a read-only preview while the table is empty, because those
        // are exactly the cards the public page is falling back to right now.
        defaults={sections.length === 0 ? defaultContactSections() : []}
      />
    </main>
  );
}
