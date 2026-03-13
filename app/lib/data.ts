import {
  EventsTable,
  BdsTable,
  AuthorsTable
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import prisma from './prisma';

export async function fetchCardData() {
  noStore();
  try {
    const [nextEvent, numberOfBds, numberOfAuthors] = await Promise.all([
      prisma.event.findFirst({ orderBy: { date: 'desc' } }),
      prisma.bd.count(),
      prisma.author.count(),
    ]);

    return {
      numberOfAuthors,
      numberOfBds,
      nextBdiDate: nextEvent?.date.toDateString() || '',
      nextBdiName: nextEvent?.name || '',
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchDashboardData() {
  noStore();
  try {
    const [totalEvents, totalBds, totalAuthors, recentEvents, topAuthors, bdsPerYear] = await Promise.all([
      prisma.event.count(),
      prisma.bd.count(),
      prisma.author.count(),
      prisma.event.findMany({
        orderBy: { date: 'desc' },
        take: 5,
        include: {
          bds: { select: { id: true } },
        },
      }),
      prisma.author.findMany({
        orderBy: { bds: { _count: 'desc' } },
        take: 5,
        include: {
          _count: { select: { bds: true } },
        },
      }),
      prisma.bd.groupBy({
        by: ['publishing_year'],
        _count: { id: true },
        where: { publishing_year: { not: null } },
        orderBy: { publishing_year: 'asc' },
      }),
    ]);

    return {
      totalEvents,
      totalBds,
      totalAuthors,
      recentEvents,
      topAuthors,
      bdsPerYear: bdsPerYear.map(g => ({
        year: g.publishing_year!,
        count: g._count.id,
      })),
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard data.');
  }
}

// --- Filter option fetchers ---

export async function fetchEventYears(): Promise<number[]> {
  noStore();
  const events = await prisma.event.findMany({
    select: { date: true },
    orderBy: { date: 'desc' },
  });
  const years = Array.from(new Set(events.map(e => e.date.getFullYear())));
  return years.sort((a, b) => b - a);
}

export async function fetchEventOptions(): Promise<{ id: string; name: string }[]> {
  noStore();
  return prisma.event.findMany({
    select: { id: true, name: true },
    orderBy: { date: 'desc' },
  });
}

export async function fetchPublishers(): Promise<string[]> {
  noStore();
  const bds = await prisma.bd.findMany({
    select: { publisher: true },
    where: { publisher: { not: null } },
    distinct: ['publisher'],
    orderBy: { publisher: 'asc' },
  });
  return bds.map(b => b.publisher!);
}

export async function fetchBdYears(): Promise<number[]> {
  noStore();
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
  noStore();
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
  noStore();
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
  noStore();
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
  noStore();
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
  noStore();
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

export async function fetchAuthorById(id: string) {
  noStore();
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
