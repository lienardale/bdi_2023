import { bdi } from './bdi';
import { cmbd } from './cmbd';
import type { Brand, BrandId } from './types';

export const brands: Record<BrandId, Brand> = {
  bdi,
  cmbd,
};
