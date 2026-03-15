import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { requireAdminApi } from '@/app/lib/auth-utils';

export async function GET() {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
  });

  const data = events.map(e => ({
    id: e.id,
    name: e.name,
    date: e.date.toISOString().split('T')[0],
    fb_event: e.fb_event || '',
  }));

  const csv = generateCsv(data);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="events.csv"',
    },
  });
}
