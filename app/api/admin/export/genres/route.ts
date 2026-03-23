import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { requireAdminApi } from '@/app/lib/auth-utils';

export async function GET() {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const genres = await prisma.genre.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { bds: true } } },
  });

  const data = genres.map(g => ({
    id: g.id,
    name: g.name,
    bd_count: g._count.bds,
  }));

  const csv = generateCsv(data);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="genres.csv"',
    },
  });
}
