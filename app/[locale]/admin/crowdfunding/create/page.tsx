import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import CrowdfundingSlideForm from '@/app/ui/admin/crowdfunding/crowdfunding-slide-form';

export default async function CreateCrowdfundingSlidePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Crowdfunding', href: '/admin/crowdfunding' },
          { label: 'Créer', href: '/admin/crowdfunding/create', active: true },
        ]}
      />
      <CrowdfundingSlideForm />
    </main>
  );
}
