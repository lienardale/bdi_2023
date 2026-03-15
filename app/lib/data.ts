import {
  EventsTable,
  BdsTable,
  AuthorsTable
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

export async function fetchPublishers(): Promise<string[]> {
  await connection();
  const bds = await prisma.bd.findMany({
    select: { publisher: true },
    where: { publisher: { not: null } },
    distinct: ['publisher'],
    orderBy: { publisher: 'asc' },
  });
  return bds.map(b => b.publisher!);
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

// --- Filtered queries with cross-entity search ---

export async function fetchFilteredEvents(query: string, year?: number) {
  await connection();
  try {
    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { bds: { some: { title: { contains: query, mode: "insensitive" } } } },
        { bds: { some: { authors: { some: { author: { name: { contains: query, mode: "insensitive" } } } } } } },
      ];
    }

    if (year) {
      where.date = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      };
    }

    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
      include: {
        bds: {
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
            id: true,
            title: true,
            publisher: true,
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
    });
    return event as EventsTable | null;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch event.');
  }
}

export async function fetchFilteredBds(
  query: string,
  filters?: { eventId?: string; publisher?: string; year?: number }
) {
  await connection();
  try {
    const where: any = {};
    const andConditions: any[] = [];

    if (query) {
      andConditions.push({
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { publisher: { contains: query, mode: "insensitive" } },
          { authors: { some: { author: { name: { contains: query, mode: "insensitive" } } } } },
          { event: { name: { contains: query, mode: "insensitive" } } },
        ],
      });
    }

    if (filters?.eventId) {
      andConditions.push({ eventId: filters.eventId });
    }
    if (filters?.publisher) {
      andConditions.push({ publisher: filters.publisher });
    }
    if (filters?.year) {
      andConditions.push({ publishing_year: filters.year });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const bds = await prisma.bd.findMany({
      orderBy: { title: 'asc' },
      include: {
        event: { select: { id: true, name: true } },
        authors: {
          select: {
            author: {
              select: { id: true, name: true }
            }
          }
        }
      },
      where,
    });
    return bds as BdsTable[];
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
        event: { select: { id: true, name: true } },
        authors: {
          select: {
            author: {
              select: { id: true, name: true }
            }
          }
        }
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
        bds: { some: { bd: { eventId } } },
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

export async function fetchPaginatedEvents(page: number = 1, query?: string, year?: number) {
  await connection();
  const where: any = {};
  const andConditions: any[] = [];

  if (query) {
    andConditions.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { bds: { some: { title: { contains: query, mode: 'insensitive' } } } },
      ],
    });
  }
  if (year) {
    andConditions.push({
      date: { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) },
    });
  }
  if (andConditions.length > 0) where.AND = andConditions;

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      orderBy: { date: 'desc' },
      include: {
        bds: { select: { id: true, title: true, authors: { select: { author: { select: { id: true, name: true } } } } } },
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
  filters?: { eventId?: string; publisher?: string; year?: number }
) {
  await connection();
  const where: any = {};
  const andConditions: any[] = [];

  if (query) {
    andConditions.push({
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { publisher: { contains: query, mode: 'insensitive' } },
        { authors: { some: { author: { name: { contains: query, mode: 'insensitive' } } } } },
        { event: { name: { contains: query, mode: 'insensitive' } } },
      ],
    });
  }
  if (filters?.eventId) andConditions.push({ eventId: filters.eventId });
  if (filters?.publisher) andConditions.push({ publisher: filters.publisher });
  if (filters?.year) andConditions.push({ publishing_year: filters.year });
  if (andConditions.length > 0) where.AND = andConditions;

  const [bds, total] = await Promise.all([
    prisma.bd.findMany({
      orderBy: { title: 'asc' },
      include: {
        event: { select: { id: true, name: true } },
        authors: { select: { author: { select: { id: true, name: true } } } },
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
