import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import ContactSectionForm from '@/app/ui/admin/contact/contact-section-form';
import { fetchContactSectionById } from '@/app/lib/data';

export default async function EditContactSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = await fetchContactSectionById(id);
  if (!section) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contact', href: '/admin/contact' },
          { label: 'Modifier', href: `/admin/contact/${id}/edit`, active: true },
        ]}
      />
      <ContactSectionForm section={section} />
    </main>
  );
}
