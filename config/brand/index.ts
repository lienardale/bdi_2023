import { brands } from './registry';
import type { Brand, BrandId } from './types';

export type { Brand, BrandAssets, BrandId, CrowdfundingFeature, Locale, ThemeColors } from './types';
export { brands } from './registry';

// NEXT_PUBLIC_BRAND is inlined into the client bundle at build time by Next.js.
// BRAND is only read server-side as a fallback. Both should be set to the same
// value in each deployment; see .env.example and CLAUDE.md.
const rawBrandId = process.env.NEXT_PUBLIC_BRAND ?? process.env.BRAND ?? 'bdi';

function assertBrandId(value: string): asserts value is BrandId {
  if (value !== 'bdi' && value !== 'cmbd') {
    throw new Error(
      `Invalid BRAND / NEXT_PUBLIC_BRAND env var: "${value}". Expected 'bdi' or 'cmbd'.`,
    );
  }
}

assertBrandId(rawBrandId);

export const brand: Brand = brands[rawBrandId];
