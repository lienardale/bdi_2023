import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { requireAdminApi } from '@/app/lib/auth-utils';

export async function GET() {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const bds = await prisma.bd.findMany({
    orderBy: { title: 'asc' },
    include: {
      events: { select: { event: { select: { name: true } } } },
      publisherRef: { select: { name: true } },
      authors: { select: { author: { select: { name: true } } } },
    },
  });

  const data = bds.map(bd => ({
    id: bd.id,
    title: bd.title,
    publisher: bd.publisherRef?.name || bd.publisher || '',
    publishing_year: bd.publishing_year || '',
    events: bd.events.map(e => e.event.name).join('; '),
    authors: bd.authors.map(a => a.author.name).join('; '),
    ean: bd.ean || '',
    summary: bd.summary || '',
    cover_url: bd.cover_url || '',
    publication_date: bd.publication_date ? bd.publication_date.toISOString().split('T')[0] : '',
    page_count: bd.page_count ?? '',
    price: bd.price ? String(bd.price) : '',
  }));

  const csv = generateCsv(data);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="bds.csv"',
    },
  });
}
