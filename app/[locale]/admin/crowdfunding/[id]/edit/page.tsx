import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import CrowdfundingSlideForm from '@/app/ui/admin/crowdfunding/crowdfunding-slide-form';
import { fetchCrowdfundingSlideById } from '@/app/lib/data';

export default async function EditCrowdfundingSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await fetchCrowdfundingSlideById(id);
  if (!slide) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Crowdfunding', href: '/admin/crowdfunding' },
          { label: 'Modifier', href: `/admin/crowdfunding/${id}/edit`, active: true },
        ]}
      />
      <CrowdfundingSlideForm slide={slide} />
    </main>
  );
}
