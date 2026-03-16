import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { requireAdminApi } from '@/app/lib/auth-utils';

export async function GET() {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const publishers = await prisma.publisher.findMany({
    orderBy: { name: 'asc' },
    include: { parent: { select: { name: true } } },
  });

  const data = publishers.map(p => ({
    id: p.id,
    name: p.name,
    parent: p.parent?.name || '',
  }));

  const csv = generateCsv(data);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="publishers.csv"',
    },
  });
}
