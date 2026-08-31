import { fetchAllCrowdfundingSlides } from '@/app/lib/data';
import { defaultCrowdfundingSlides } from '@/app/lib/crowdfunding';
import CrowdfundingAdminClient from './crowdfunding-admin-client';

export default async function AdminCrowdfundingPage() {
  const slides = await fetchAllCrowdfundingSlides();
  return (
    <main>
      <CrowdfundingAdminClient
        slides={slides}
        // Offered as a one-click starting point only while the table is empty.
        // A brand without a built-in campaign (CMBD) returns [] and gets a
        // plain empty state instead.
        defaults={slides.length === 0 ? defaultCrowdfundingSlides() : []}
      />
    </main>
  );
}
