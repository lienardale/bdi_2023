import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/server', () => ({
  connection: vi.fn(),
}));

vi.mock('@/app/lib/prisma', () => ({
  default: {
    bd: {
      groupBy: vi.fn(),
      count: vi.fn(),
      findMany: vi.fn(),
      aggregate: vi.fn(),
    },
    event: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    author: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    publisher: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import {
  fetchBdsPerYear,
  fetchEventsPerYear,
  fetchAggregateStats,
} from '@/app/lib/data';
import prisma from '@/app/lib/prisma';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchBdsPerYear', () => {
  it('returns year and count from groupBy', async () => {
    vi.mocked(prisma.bd.groupBy).mockResolvedValue([
      { publishing_year: 2020, _count: { id: 5 } },
      { publishing_year: 2021, _count: { id: 8 } },
    ] as any);

    const result = await fetchBdsPerYear();
    expect(result).toEqual([
      { year: 2020, count: 5 },
      { year: 2021, count: 8 },
    ]);
  });

  it('returns empty array when no data', async () => {
    vi.mocked(prisma.bd.groupBy).mockResolvedValue([] as any);
    const result = await fetchBdsPerYear();
    expect(result).toEqual([]);
  });
});

describe('fetchEventsPerYear', () => {
  it('groups events by year', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([
      { date: new Date('2022-03-15') },
      { date: new Date('2022-06-10') },
      { date: new Date('2023-01-20') },
    ] as any);

    const result = await fetchEventsPerYear();
    expect(result).toEqual([
      { year: 2022, count: 2 },
      { year: 2023, count: 1 },
    ]);
  });
});

describe('fetchAggregateStats', () => {
  it('computes all stats', async () => {
    vi.mocked(prisma.bd.count).mockResolvedValue(100);
    vi.mocked(prisma.author.count).mockResolvedValue(50);
    vi.mocked(prisma.event.count).mockResolvedValue(20);
    vi.mocked(prisma.publisher.count).mockResolvedValue(15);
    vi.mocked(prisma.bd.aggregate).mockResolvedValue({
      _sum: { page_count: 4800 },
    } as any);

    // Pages data (sorted)
    vi.mocked(prisma.bd.findMany)
      .mockResolvedValueOnce([
        { page_count: 40 },
        { page_count: 48 },
        { page_count: 64 },
      ] as any)
      // Prices data (sorted)
      .mockResolvedValueOnce([
        { price: 9.99 },
        { price: 12.50 },
        { price: 15.00 },
      ] as any);

    const result = await fetchAggregateStats();
    expect(result.totalBds).toBe(100);
    expect(result.totalAuthors).toBe(50);
    expect(result.totalEvents).toBe(20);
    expect(result.totalPublishers).toBe(15);
    expect(result.totalPages).toBe(4800);
    expect(result.medianPages).toBe(48);
    expect(result.medianPrice).toBe(12.50);
  });

  it('handles zero events gracefully', async () => {
    vi.mocked(prisma.bd.count).mockResolvedValue(0);
    vi.mocked(prisma.author.count).mockResolvedValue(0);
    vi.mocked(prisma.event.count).mockResolvedValue(0);
    vi.mocked(prisma.publisher.count).mockResolvedValue(0);
    vi.mocked(prisma.bd.aggregate).mockResolvedValue({
      _sum: { page_count: null },
    } as any);

    vi.mocked(prisma.bd.findMany)
      .mockResolvedValueOnce([] as any)
      .mockResolvedValueOnce([] as any);

    const result = await fetchAggregateStats();
    expect(result.totalPages).toBe(0);
    expect(result.medianPages).toBeNull();
    expect(result.medianPrice).toBeNull();
  });
});
