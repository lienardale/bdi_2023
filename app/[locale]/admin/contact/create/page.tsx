import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import ContactSectionForm from '@/app/ui/admin/contact/contact-section-form';

export default async function CreateContactSectionPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Contact', href: '/admin/contact' },
          { label: 'Créer', href: '/admin/contact/create', active: true },
        ]}
      />
      <ContactSectionForm />
    </main>
  );
}
