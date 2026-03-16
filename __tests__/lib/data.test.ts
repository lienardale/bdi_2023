import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/server', () => ({
  connection: vi.fn(),
}));

vi.mock('@/app/lib/prisma', () => ({
  default: {
    event: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
    bd: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
    author: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
    publisher: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import {
  fetchCardData,
  fetchEventYears,
  fetchEventOptions,
  fetchPublishers,
  fetchBdYears,
  fetchAuthorOptions,
  fetchFilteredEvents,
  fetchEventById,
  fetchFilteredBds,
  fetchBdById,
  fetchFilteredAuthors,
  fetchAuthorById,
  fetchPaginatedEvents,
  fetchPaginatedBds,
  fetchPaginatedAuthors,
  fetchPublisherById,
  fetchFilteredPublishers,
  fetchPaginatedPublishers,
  fetchTopAuthors,
  fetchTopPublishers,
} from '@/app/lib/data';
import prisma from '@/app/lib/prisma';

beforeEach(() => {
  vi.clearAllMocks();
});

// --- fetchCardData ---
describe('fetchCardData', () => {
  it('returns upcoming event when available', async () => {
    const upcoming = { id: '1', name: 'Future Event', date: new Date('2030-01-01'), hour: '14:00', place: 'Paris' };
    vi.mocked(prisma.event.findFirst)
      .mockResolvedValueOnce(upcoming as any)   // upcoming
      .mockResolvedValueOnce(null as any);       // most recent
    vi.mocked(prisma.bd.count).mockResolvedValue(100);
    vi.mocked(prisma.author.count).mockResolvedValue(50);

    const result = await fetchCardData();
    expect(result.nextBdiName).toBe('Future Event');
    expect(result.numberOfBds).toBe(100);
    expect(result.numberOfAuthors).toBe(50);
    expect(result.nextEventId).toBe('1');
    expect(result.nextEventHour).toBe('14:00');
    expect(result.nextEventPlace).toBe('Paris');
  });

  it('falls back to most recent event when no upcoming', async () => {
    const recent = { id: '2', name: 'Past Event', date: new Date('2023-01-01'), hour: null, place: null };
    vi.mocked(prisma.event.findFirst)
      .mockResolvedValueOnce(null as any)       // no upcoming
      .mockResolvedValueOnce(recent as any);     // most recent
    vi.mocked(prisma.bd.count).mockResolvedValue(10);
    vi.mocked(prisma.author.count).mockResolvedValue(5);

    const result = await fetchCardData();
    expect(result.nextBdiName).toBe('Past Event');
    expect(result.nextEventHour).toBeNull();
    expect(result.nextEventPlace).toBeNull();
  });

  it('handles no events at all', async () => {
    vi.mocked(prisma.event.findFirst).mockResolvedValue(null as any);
    vi.mocked(prisma.bd.count).mockResolvedValue(0);
    vi.mocked(prisma.author.count).mockResolvedValue(0);

    const result = await fetchCardData();
    expect(result.nextBdiName).toBe('');
    expect(result.nextBdiDate).toBe('');
    expect(result.nextEventId).toBeNull();
  });

  it('throws on database error', async () => {
    vi.mocked(prisma.event.findFirst).mockRejectedValue(new Error('DB down'));
    await expect(fetchCardData()).rejects.toThrow('Failed to fetch card data.');
  });
});

// --- Filter option fetchers ---
describe('fetchEventYears', () => {
  it('returns unique years sorted desc', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([
      { date: new Date('2023-06-01') },
      { date: new Date('2023-12-01') },
      { date: new Date('2022-03-01') },
      { date: new Date('2024-01-01') },
    ] as any);

    const result = await fetchEventYears();
    expect(result).toEqual([2024, 2023, 2022]);
  });
});

describe('fetchEventOptions', () => {
  it('returns event id/name pairs', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([
      { id: '1', name: 'Event A' },
      { id: '2', name: 'Event B' },
    ] as any);

    const result = await fetchEventOptions();
    expect(result).toEqual([{ id: '1', name: 'Event A' }, { id: '2', name: 'Event B' }]);
  });
});

describe('fetchPublishers', () => {
  it('returns publisher id/name pairs', async () => {
    vi.mocked(prisma.publisher.findMany).mockResolvedValue([
      { id: 'p1', name: 'Dargaud' },
    ] as any);

    const result = await fetchPublishers();
    expect(result).toEqual([{ id: 'p1', name: 'Dargaud' }]);
  });
});

describe('fetchBdYears', () => {
  it('returns distinct years', async () => {
    vi.mocked(prisma.bd.findMany).mockResolvedValue([
      { publishing_year: 2023 },
      { publishing_year: 2020 },
    ] as any);

    const result = await fetchBdYears();
    expect(result).toEqual([2023, 2020]);
  });
});

describe('fetchAuthorOptions', () => {
  it('returns author id/name pairs', async () => {
    vi.mocked(prisma.author.findMany).mockResolvedValue([
      { id: 'a1', name: 'Goscinny' },
    ] as any);

    const result = await fetchAuthorOptions();
    expect(result).toEqual([{ id: 'a1', name: 'Goscinny' }]);
  });
});

// --- Filtered queries ---
describe('fetchFilteredEvents', () => {
  it('returns events with query filter', async () => {
    const events = [{ id: '1', name: 'BDI #1', bds: [] }];
    vi.mocked(prisma.event.findMany).mockResolvedValue(events as any);

    const result = await fetchFilteredEvents('BDI');
    expect(result).toEqual(events);
    expect(prisma.event.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.any(Array),
        }),
      }),
    );
  });

  it('applies year filter', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([] as any);

    await fetchFilteredEvents('', 2023);
    expect(prisma.event.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          date: expect.objectContaining({ gte: expect.any(Date), lt: expect.any(Date) }),
        }),
      }),
    );
  });

  it('returns empty query without filters', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([] as any);

    await fetchFilteredEvents('');
    expect(prisma.event.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: {} }),
    );
  });

  it('throws on error', async () => {
    vi.mocked(prisma.event.findMany).mockRejectedValue(new Error('fail'));
    await expect(fetchFilteredEvents('')).rejects.toThrow('Failed to fetch events table.');
  });
});

describe('fetchEventById', () => {
  it('returns event by id', async () => {
    const event = { id: '1', name: 'Test', bds: [] };
    vi.mocked(prisma.event.findFirst).mockResolvedValue(event as any);

    const result = await fetchEventById('1');
    expect(result).toEqual(event);
  });

  it('returns null for missing event', async () => {
    vi.mocked(prisma.event.findFirst).mockResolvedValue(null);
    const result = await fetchEventById('missing');
    expect(result).toBeNull();
  });

  it('throws on error', async () => {
    vi.mocked(prisma.event.findFirst).mockRejectedValue(new Error('fail'));
    await expect(fetchEventById('1')).rejects.toThrow('Failed to fetch event.');
  });
});

describe('fetchFilteredBds', () => {
  it('returns BDs with text query', async () => {
    const bds = [{ id: '1', title: 'Asterix', events: [], authors: [] }];
    vi.mocked(prisma.bd.findMany).mockResolvedValue(bds as any);

    const result = await fetchFilteredBds('Asterix');
    expect(result).toEqual(bds);
  });

  it('applies all filters', async () => {
    vi.mocked(prisma.bd.findMany).mockResolvedValue([] as any);

    await fetchFilteredBds('', { eventId: 'ev1', publisherId: 'pub1', year: 2023, authorId: 'a1' });
    const call = vi.mocked(prisma.bd.findMany).mock.calls[0][0] as any;
    expect(call.where.AND).toHaveLength(4);
  });

  it('handles bdi sort (by event date)', async () => {
    const bds = [
      { id: '1', title: 'A', events: [{ event: { date: new Date('2023-01-01') } }] },
      { id: '2', title: 'B', events: [{ event: { date: new Date('2024-01-01') } }] },
    ];
    vi.mocked(prisma.bd.findMany).mockResolvedValue(bds as any);

    const result = await fetchFilteredBds('', {}, 'bdi', 'desc');
    expect(result[0].id).toBe('2');
  });

  it('throws on error', async () => {
    vi.mocked(prisma.bd.findMany).mockRejectedValue(new Error('fail'));
    await expect(fetchFilteredBds('')).rejects.toThrow('Failed to fetch bds table.');
  });
});

describe('fetchBdById', () => {
  it('returns BD by id', async () => {
    const bd = { id: '1', title: 'Test', events: [], authors: [] };
    vi.mocked(prisma.bd.findFirst).mockResolvedValue(bd as any);

    const result = await fetchBdById('1');
    expect(result).toEqual(bd);
  });

  it('returns null for missing BD', async () => {
    vi.mocked(prisma.bd.findFirst).mockResolvedValue(null);
    expect(await fetchBdById('missing')).toBeNull();
  });

  it('throws on error', async () => {
    vi.mocked(prisma.bd.findFirst).mockRejectedValue(new Error('fail'));
    await expect(fetchBdById('1')).rejects.toThrow('Failed to fetch bd.');
  });
});

describe('fetchFilteredAuthors', () => {
  it('returns authors with query', async () => {
    const authors = [{ id: 'a1', name: 'Goscinny', bds: [] }];
    vi.mocked(prisma.author.findMany).mockResolvedValue(authors as any);

    const result = await fetchFilteredAuthors('Gos');
    expect(result).toEqual(authors);
  });

  it('applies eventId filter', async () => {
    vi.mocked(prisma.author.findMany).mockResolvedValue([] as any);

    await fetchFilteredAuthors('', 'ev1');
    const call = vi.mocked(prisma.author.findMany).mock.calls[0][0] as any;
    expect(call.where.AND).toHaveLength(1);
  });

  it('throws on error', async () => {
    vi.mocked(prisma.author.findMany).mockRejectedValue(new Error('fail'));
    await expect(fetchFilteredAuthors('')).rejects.toThrow('Failed to fetch authors table.');
  });
});

describe('fetchAuthorById', () => {
  it('returns author by id', async () => {
    const author = { id: 'a1', name: 'Test', bds: [] };
    vi.mocked(prisma.author.findFirst).mockResolvedValue(author as any);

    expect(await fetchAuthorById('a1')).toEqual(author);
  });

  it('returns null for missing author', async () => {
    vi.mocked(prisma.author.findFirst).mockResolvedValue(null);
    expect(await fetchAuthorById('missing')).toBeNull();
  });

  it('throws on error', async () => {
    vi.mocked(prisma.author.findFirst).mockRejectedValue(new Error('fail'));
    await expect(fetchAuthorById('a1')).rejects.toThrow('Failed to fetch author.');
  });
});

// --- Paginated queries ---
describe('fetchPaginatedEvents', () => {
  it('returns paginated data with totalPages', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([{ id: '1' }] as any);
    vi.mocked(prisma.event.count).mockResolvedValue(45);

    const result = await fetchPaginatedEvents(1);
    expect(result.data).toHaveLength(1);
    expect(result.totalPages).toBe(3); // ceil(45/20)
  });

  it('applies query and year filters', async () => {
    vi.mocked(prisma.event.findMany).mockResolvedValue([] as any);
    vi.mocked(prisma.event.count).mockResolvedValue(0);

    await fetchPaginatedEvents(1, 'test', 2023);
    const call = vi.mocked(prisma.event.findMany).mock.calls[0][0] as any;
    expect(call.where.AND).toHaveLength(2);
  });
});

describe('fetchPaginatedBds', () => {
  it('returns paginated data with totalPages', async () => {
    vi.mocked(prisma.bd.findMany).mockResolvedValue([{ id: '1' }] as any);
    vi.mocked(prisma.bd.count).mockResolvedValue(60);

    const result = await fetchPaginatedBds(2);
    expect(result.totalPages).toBe(3); // ceil(60/20)
  });

  it('applies filters', async () => {
    vi.mocked(prisma.bd.findMany).mockResolvedValue([] as any);
    vi.mocked(prisma.bd.count).mockResolvedValue(0);

    await fetchPaginatedBds(1, 'test', { eventId: 'ev1', publisherId: 'pub1', year: 2023 });
    const call = vi.mocked(prisma.bd.findMany).mock.calls[0][0] as any;
    expect(call.where.AND.length).toBeGreaterThanOrEqual(4);
  });
});

describe('fetchPaginatedAuthors', () => {
  it('returns paginated data', async () => {
    vi.mocked(prisma.author.findMany).mockResolvedValue([{ id: 'a1' }] as any);
    vi.mocked(prisma.author.count).mockResolvedValue(25);

    const result = await fetchPaginatedAuthors(1, 'search');
    expect(result.totalPages).toBe(2); // ceil(25/20)
  });
});

// --- Publisher queries ---
describe('fetchPublisherById', () => {
  it('returns publisher with relations', async () => {
    const pub = { id: 'p1', name: 'Dargaud', parent: null, imprints: [], _count: { bds: 5 }, bds: [] };
    vi.mocked(prisma.publisher.findFirst).mockResolvedValue(pub as any);

    const result = await fetchPublisherById('p1');
    expect(result).toEqual(pub);
  });

  it('returns null for missing publisher', async () => {
    vi.mocked(prisma.publisher.findFirst).mockResolvedValue(null);
    expect(await fetchPublisherById('missing')).toBeNull();
  });
});

describe('fetchFilteredPublishers', () => {
  it('returns publishers with query filter', async () => {
    vi.mocked(prisma.publisher.findMany).mockResolvedValue([{ id: 'p1', name: 'Dargaud' }] as any);

    const result = await fetchFilteredPublishers('Dar');
    expect(result).toHaveLength(1);
    const call = vi.mocked(prisma.publisher.findMany).mock.calls[0][0] as any;
    expect(call.where.name).toBeDefined();
  });

  it('returns all publishers without query', async () => {
    vi.mocked(prisma.publisher.findMany).mockResolvedValue([] as any);

    await fetchFilteredPublishers();
    const call = vi.mocked(prisma.publisher.findMany).mock.calls[0][0] as any;
    expect(call.where).toEqual({});
  });
});

describe('fetchPaginatedPublishers', () => {
  it('returns paginated data', async () => {
    vi.mocked(prisma.publisher.findMany).mockResolvedValue([{ id: 'p1' }] as any);
    vi.mocked(prisma.publisher.count).mockResolvedValue(30);

    const result = await fetchPaginatedPublishers(1, 'test');
    expect(result.totalPages).toBe(2); // ceil(30/20)
  });
});

describe('fetchTopAuthors', () => {
  it('returns top authors by BD count', async () => {
    vi.mocked(prisma.author.findMany).mockResolvedValue([
      { id: 'a1', name: 'Author1', _count: { bds: 10 } },
    ] as any);

    const result = await fetchTopAuthors(5);
    expect(result).toHaveLength(1);
    expect(prisma.author.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 5 }),
    );
  });
});

describe('fetchTopPublishers', () => {
  it('returns top publishers by BD count', async () => {
    vi.mocked(prisma.publisher.findMany).mockResolvedValue([
      { id: 'p1', name: 'Dargaud', _count: { bds: 20 } },
    ] as any);

    const result = await fetchTopPublishers(3);
    expect(result).toHaveLength(1);
    expect(prisma.publisher.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 3 }),
    );
  });
});
