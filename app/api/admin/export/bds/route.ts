import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const bds = await prisma.bd.findMany({
    orderBy: { title: 'asc' },
    include: {
      event: { select: { name: true } },
      authors: { select: { author: { select: { name: true } } } },
    },
  });

  const data = bds.map(bd => ({
    id: bd.id,
    title: bd.title,
    publisher: bd.publisher || '',
    publishing_year: bd.publishing_year || '',
    event: bd.event.name,
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
