import {
  EventsTable,
  BdsTable,
  AuthorsTable,
  PublisherOption,
  GenresTable,
} from './definitions';
import { connection } from 'next/server';
import prisma from './prisma';

export async function fetchCardData() {
  await connection();
  try {
    const [upcomingEvent, mostRecentEvent, numberOfBds, numberOfAuthors] = await Promise.all([
      prisma.event.findFirst({
        where: { date: { gte: new Date() } },
        orderBy: { date: 'asc' },
        select: { id: true, name: true, date: true, hour: true, place: true },
      }),
      prisma.event.findFirst({
        orderBy: { date: 'desc' },
        select: { id: true, name: true, date: true, hour: true, place: true },
      }),
      prisma.bd.count(),
      prisma.author.count(),
    ]);
    const nextEvent = upcomingEvent ?? mostRecentEvent;

    return {
      numberOfAuthors,
      numberOfBds,
      nextBdiDate: nextEvent?.date.toDateString() || '',
      nextBdiName: nextEvent?.name || '',
      nextEventId: nextEvent?.id || null,
      nextEventHour: nextEvent?.hour || null,
      nextEventPlace: nextEvent?.place || null,
      nextEventDateRaw: nextEvent?.date || null,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// --- Filter option fetchers ---

export async function fetchEventYears(): Promise<number[]> {
  await connection();
  const events = await prisma.event.findMany({
    select: { date: true },
    orderBy: { date: 'desc' },
  });
  const years = Array.from(new Set(events.map(e => e.date.getFullYear())));
  return years.sort((a, b) => b - a);
}

export async function fetchEventOptions(): Promise<{ id: string; name: string }[]> {
  await connection();
  return prisma.event.findMany({
    select: { id: true, name: true },
    orderBy: { date: 'desc' },
  });
}

export async function fetchPublishers(): Promise<PublisherOption[]> {
  await connection();
  return prisma.publisher.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
}

export async function fetchBdYears(): Promise<number[]> {
  await connection();
  const bds = await prisma.bd.findMany({
    select: { publishing_year: true },
    where: { publishing_year: { not: null } },
    distinct: ['publishing_year'],
    orderBy: { publishing_year: 'desc' },
  });
  return bds.map(b => b.publishing_year!);
}

export async function fetchAuthorOptions(): Promise<{ id: string; name: string }[]> {
  await connection();
  const authors = await prisma.author.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
  return authors;
}

export async function fetchGenreOptions(): Promise<{ id: string; name: string }[]> {
  await connection();
  return prisma.genre.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
}

export async function fetchBdOptions(): Promise<{ id: string; title: string }[]> {
  await connection();
  return prisma.bd.findMany({
    select: { id: true, title: true },
    orderBy: { title: 'asc' },
  });
}

export async function fetchWizardDrafts(email: string) {
  await connection();
  return prisma.wizardDraft.findMany({
    where: { email },
    select: { id: true, name: true, data: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function fetchWizardDraftById(id: string) {
  await connection();
  return prisma.wizardDraft.findUnique({
    where: { id },
    select: { id: true, name: true, data: true, updatedAt: true },
  });
}

// --- Filtered queries with cross-entity search ---

export async function fetchFilteredEvents(query: string, year?: number, sort?: string, order?: string) {
  await connection();
  try {
    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { bds: { some: { bd: { title: { contains: query, mode: "insensitive" } } } } },
        { bds: { some: { bd: { authors: { some: { author: { name: { contains: query, mode: "insensitive" } } } } } } } },
      ];
    }

    if (year) {
      where.date = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      };
    }

    const dir = order === 'asc' || order === 'desc' ? order : 'desc';
    const orderBy = sort === 'date' ? { date: dir as 'asc' | 'desc' } : { date: dir as 'asc' | 'desc' };

    const events = await prisma.event.findMany({
      orderBy,
      include: {
        bds: {
          select: {
            bd: {
              select: {
                id: true,
                title: true,
                authors: {
                  select: {
                    author: {
                      select: { id: true, name: true }
                    }
                  }
                }
              }
            }
          }
        }
      },
      where,
    });
    return events as EventsTable[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch events table.');
  }
}

export async function fetchEventById(id: string) {
  await connection();
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: {
        bds: {
          select: {
            bd: {
              select: {
                id: true,
                title: true,
                publisher: true,
                publisherRef: { select: { id: true, name: true } },
                publishing_year: true,
                authors: {
                  select: {
                    author: {
                      select: { id: true, name: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    return event as EventsTable | null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch event.');
  }
}

export async function fetchFilteredBds(
  query: string,
  filters?: { eventId?: string; publisherId?: string; year?: number; authorId?: string; genreId?: string },
  sort?: string,
  order?: string,
) {
  await connection();
  try {
    const where: any = {};
    const andConditions: any[] = [];

    if (query) {
      andConditions.push({
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { publisherRef: { name: { contains: query, mode: "insensitive" } } },
          { authors: { some: { author: { name: { contains: query, mode: "insensitive" } } } } },
          { events: { some: { event: { name: { contains: query, mode: "insensitive" } } } } },
          { genres: { some: { genre: { name: { contains: query, mode: "insensitive" } } } } },
        ],
      });
    }

    if (filters?.eventId) {
      andConditions.push({ events: { some: { eventId: filters.eventId } } });
    }
    if (filters?.publisherId) {
      andConditions.push({ publisherId: filters.publisherId });
    }
    if (filters?.year) {
      andConditions.push({ publishing_year: filters.year });
    }
    if (filters?.authorId) {
      andConditions.push({ authors: { some: { authorId: filters.authorId } } });
    }
    if (filters?.genreId) {
      andConditions.push({ genres: { some: { genreId: filters.genreId } } });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const dir = (order === 'asc' || order === 'desc' ? order : 'asc') as 'asc' | 'desc';
    const orderByMap: Record<string, any> = {
      title: { title: dir },
      price: { price: dir },
      pages: { page_count: dir },
    };
    // 'bdi' sort: no longer possible at Prisma level with M2M, handled in JS
    // 'author' sort is handled in JS after fetch (M2M prevents Prisma-level sort)
    const orderBy = sort && sort !== 'author' && sort !== 'bdi' && orderByMap[sort] ? orderByMap[sort] : { title: 'asc' };

    let bds = await prisma.bd.findMany({
      orderBy,
      include: {
        events: { select: { event: { select: { id: true, name: true, date: true } } } },
        publisherRef: { select: { id: true, name: true } },
        authors: {
          select: {
            author: {
              select: { id: true, name: true }
            }
          }
        },
        genres: { select: { genre: { select: { id: true, name: true } } } },
      },
      where,
    });

    // JS-level sort for 'bdi' (by first event date)
    if (sort === 'bdi') {
      bds = bds.sort((a, b) => {
        const dateA = a.events[0]?.event?.date?.getTime() ?? 0;
        const dateB = b.events[0]?.event?.date?.getTime() ?? 0;
        return dir === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return bds as unknown as BdsTable[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch bds table.');
  }
}

export async function fetchBdById(id: string) {
  await connection();
  try {
    const bd = await prisma.bd.findFirst({
      where: { id },
      include: {
        events: { select: { event: { select: { id: true, name: true } } } },
        publisherRef: { select: { id: true, name: true } },
        authors: {
          select: {
            author: {
              select: { id: true, name: true }
            }
          }
        },
        genres: { select: { genre: { select: { id: true, name: true } } } },
      }
    });
    return bd as BdsTable | null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch bd.');
  }
}

export async function fetchFilteredAuthors(query: string, eventId?: string) {
  await connection();
  try {
    const where: any = {};
    const andConditions: any[] = [];

    if (query) {
      andConditions.push({
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { bds: { some: { bd: { title: { contains: query, mode: "insensitive" } } } } },
        ],
      });
    }

    if (eventId) {
      andConditions.push({
        bds: { some: { bd: { events: { some: { eventId } } } } },
      });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const authors = await prisma.author.findMany({
      orderBy: { name: 'asc' },
      include: {
        bds: {
          select: {
            bd: {
              select: { id: true, title: true }
            }
          }
        }
      },
      where,
    });
    return authors as AuthorsTable[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch authors table.');
  }
}

const ADMIN_PAGE_SIZE = 20;

export async function fetchPaginatedEvents(page: number = 1, query?: string, year?: number, sort?: string, order?: string) {
  await connection();
  const where: any = {};
  const andConditions: any[] = [];

  if (query) {
    andConditions.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { bds: { some: { bd: { title: { contains: query, mode: 'insensitive' } } } } },
      ],
    });
  }
  if (year) {
    andConditions.push({
      date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) },
    });
  }
  if (andConditions.length > 0) where.AND = andConditions;

  const dir = order === 'asc' || order === 'desc' ? order : 'desc';
  const orderBy = sort === 'date' ? { date: dir as 'asc' | 'desc' } : { date: dir as 'asc' | 'desc' };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      orderBy,
      include: {
        bds: {
          select: {
            bd: {
              select: {
                id: true,
                title: true,
                authors: { select: { author: { select: { id: true, name: true } } } },
              },
            },
          },
        },
      },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
      where,
    }),
    prisma.event.count({ where }),
  ]);
  return {
    data: events as EventsTable[],
    totalPages: Math.ceil(total / ADMIN_PAGE_SIZE),
  };
}

export async function fetchPaginatedBds(
  page: number = 1,
  query?: string,
  filters?: { eventId?: string; publisherId?: string; year?: number; genreId?: string },
  sort?: string,
  order?: string,
) {
  await connection();
  const where: any = {};
  const andConditions: any[] = [];

  if (query) {
    andConditions.push({
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { publisherRef: { name: { contains: query, mode: 'insensitive' } } },
        { authors: { some: { author: { name: { contains: query, mode: 'insensitive' } } } } },
        { events: { some: { event: { name: { contains: query, mode: 'insensitive' } } } } },
        { genres: { some: { genre: { name: { contains: query, mode: 'insensitive' } } } } },
      ],
    });
  }
  if (filters?.eventId) andConditions.push({ events: { some: { eventId: filters.eventId } } });
  if (filters?.publisherId) andConditions.push({ publisherId: filters.publisherId });
  if (filters?.year) andConditions.push({ publishing_year: filters.year });
  if (filters?.genreId) andConditions.push({ genres: { some: { genreId: filters.genreId } } });
  if (andConditions.length > 0) where.AND = andConditions;

  const dir = (order === 'asc' || order === 'desc' ? order : 'asc') as 'asc' | 'desc';
  const orderByMap: Record<string, any> = {
    title: { title: dir },
    price: { price: dir },
    pages: { page_count: dir },
  };
  const orderBy = sort && sort !== 'bdi' && orderByMap[sort] ? orderByMap[sort] : { title: 'asc' };

  const [bds, total] = await Promise.all([
    prisma.bd.findMany({
      orderBy,
      include: {
        events: { select: { event: { select: { id: true, name: true } } } },
        publisherRef: { select: { id: true, name: true } },
        authors: { select: { author: { select: { id: true, name: true } } } },
        genres: { select: { genre: { select: { id: true, name: true } } } },
      },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
      where,
    }),
    prisma.bd.count({ where }),
  ]);
  return {
    data: bds as BdsTable[],
    totalPages: Math.ceil(total / ADMIN_PAGE_SIZE),
  };
}

export async function fetchPaginatedAuthors(page: number = 1, query?: string) {
  await connection();
  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { bds: { some: { bd: { title: { contains: query, mode: 'insensitive' } } } } },
    ];
  }

  const [authors, total] = await Promise.all([
    prisma.author.findMany({
      orderBy: { name: 'asc' },
      include: {
        bds: { select: { bd: { select: { id: true, title: true } } } },
      },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
      where,
    }),
    prisma.author.count({ where }),
  ]);
  return {
    data: authors as AuthorsTable[],
    totalPages: Math.ceil(total / ADMIN_PAGE_SIZE),
  };
}

export async function fetchAuthorById(id: string) {
  await connection();
  try {
    const author = await prisma.author.findFirst({
      where: { id },
      include: {
        bds: {
          select: {
            bd: {
              select: { id: true, title: true }
            }
          }
        }
      }
    });
    return author as AuthorsTable | null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch author.');
  }
}

export async function fetchPublisherById(id: string) {
  await connection();
  const publisher = await prisma.publisher.findFirst({
    where: { id },
    include: {
      parent: { select: { id: true, name: true } },
      imprints: { select: { id: true, name: true } },
      _count: { select: { bds: true } },
      bds: {
        select: {
          id: true, title: true,
          authors: { select: { author: { select: { id: true, name: true } } } },
          events: { select: { event: { select: { id: true, name: true } } } },
        },
        orderBy: { title: 'asc' },
      },
    },
  });
  return publisher;
}

export async function fetchFilteredPublishers(query?: string) {
  await connection();
  const where: any = {};
  if (query) {
    where.name = { contains: query, mode: 'insensitive' };
  }
  return prisma.publisher.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { bds: true } },
      bds: { select: { id: true, title: true }, orderBy: { title: 'asc' } },
    },
    where,
  });
}

export async function fetchPaginatedPublishers(page: number = 1, query?: string) {
  await connection();
  const where: any = {};

  if (query) {
    where.name = { contains: query, mode: 'insensitive' };
  }

  const [publishers, total] = await Promise.all([
    prisma.publisher.findMany({
      orderBy: { name: 'asc' },
      include: {
        parent: { select: { id: true, name: true } },
        _count: { select: { bds: true } },
      },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
      where,
    }),
    prisma.publisher.count({ where }),
  ]);
  return {
    data: publishers,
    totalPages: Math.ceil(total / ADMIN_PAGE_SIZE),
  };
}

// --- Stats queries ---

export async function fetchBdsPerYear(): Promise<{ year: number; count: number }[]> {
  await connection();
  const result = await prisma.bd.groupBy({
    by: ['publishing_year'],
    _count: { id: true },
    where: { publishing_year: { not: null } },
    orderBy: { publishing_year: 'asc' },
  });
  return result.map(r => ({ year: r.publishing_year!, count: r._count.id }));
}

export async function fetchEventsPerYear(): Promise<{ year: number; count: number }[]> {
  await connection();
  const events = await prisma.event.findMany({
    select: { date: true },
  });
  const counts: Record<number, number> = {};
  for (const e of events) {
    const year = e.date.getFullYear();
    counts[year] = (counts[year] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year);
}

export type TopAuthor = {
  id: string;
  name: string;
  _count: { bds: number };
};

export async function fetchTopAuthors(limit: number = 10): Promise<TopAuthor[]> {
  await connection();
  return prisma.author.findMany({
    select: {
      id: true,
      name: true,
      _count: { select: { bds: true } },
    },
    orderBy: { bds: { _count: 'desc' } },
    take: limit,
  });
}

export type TopPublisher = {
  id: string;
  name: string;
  _count: { bds: number };
};

export async function fetchTopPublishers(limit: number = 10): Promise<TopPublisher[]> {
  await connection();
  return prisma.publisher.findMany({
    select: {
      id: true,
      name: true,
      _count: { select: { bds: true } },
    },
    orderBy: { bds: { _count: 'desc' } },
    take: limit,
  });
}

export type AggregateStats = {
  totalBds: number;
  totalAuthors: number;
  totalEvents: number;
  totalPublishers: number;
  totalGenres: number;
  totalPages: number;
  medianPages: number | null;
  medianPrice: number | null;
};

export async function fetchAggregateStats(): Promise<AggregateStats> {
  await connection();
  const [totalBds, totalAuthors, totalEvents, totalPublishers, totalGenres, pageSum] = await Promise.all([
    prisma.bd.count(),
    prisma.author.count(),
    prisma.event.count(),
    prisma.publisher.count(),
    prisma.genre.count(),
    prisma.bd.aggregate({ _sum: { page_count: true } }),
  ]);
  const totalPages = pageSum._sum.page_count ?? 0;

  // Median pages
  const pagesData = await prisma.bd.findMany({
    select: { page_count: true },
    where: { page_count: { not: null } },
    orderBy: { page_count: 'asc' },
  });
  const pages = pagesData.map(b => b.page_count!);
  const medianPages = pages.length > 0 ? pages[Math.floor(pages.length / 2)] : null;

  // Median price
  const pricesData = await prisma.bd.findMany({
    select: { price: true },
    where: { price: { not: null } },
    orderBy: { price: 'asc' },
  });
  const prices = pricesData.map(b => Number(b.price));
  const medianPrice = prices.length > 0 ? prices[Math.floor(prices.length / 2)] : null;

  return {
    totalBds,
    totalAuthors,
    totalEvents,
    totalPublishers,
    totalGenres,
    totalPages,
    medianPages,
    medianPrice,
  };
}

// ---------- Genre queries ----------

export async function fetchPaginatedGenres(page: number = 1, query?: string) {
  await connection();
  const where: any = {};
  if (query) {
    where.name = { contains: query, mode: 'insensitive' };
  }

  const [genres, total] = await Promise.all([
    prisma.genre.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { bds: true } } },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
      where,
    }),
    prisma.genre.count({ where }),
  ]);
  return {
    data: genres as GenresTable[],
    totalPages: Math.ceil(total / ADMIN_PAGE_SIZE),
  };
}

export async function fetchGenreById(id: string) {
  await connection();
  return prisma.genre.findFirst({
    where: { id },
    include: {
      _count: { select: { bds: true } },
      bds: {
        select: {
          bd: {
            select: {
              id: true, title: true,
              authors: { select: { author: { select: { id: true, name: true } } } },
            },
          },
        },
        orderBy: { bd: { title: 'asc' } },
      },
    },
  });
}

export type TopGenre = {
  id: string;
  name: string;
  _count: { bds: number };
};

export async function fetchTopGenres(limit: number = 10): Promise<TopGenre[]> {
  await connection();
  return prisma.genre.findMany({
    select: {
      id: true,
      name: true,
      _count: { select: { bds: true } },
    },
    orderBy: { bds: { _count: 'desc' } },
    take: limit,
  });
}

// ---------- Instagram Posts ----------

export async function fetchActiveInstagramPosts() {
  await connection();
  return prisma.instagramPost.findMany({
    where: { active: true },
    orderBy: { position: 'asc' },
    select: { id: true, shortcode: true },
  });
}

export async function fetchAllInstagramPosts() {
  await connection();
  return prisma.instagramPost.findMany({
    orderBy: { position: 'asc' },
    select: { id: true, shortcode: true, position: true, active: true },
  });
}
