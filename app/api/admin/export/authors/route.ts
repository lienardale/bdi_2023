import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { requireAdminApi } from '@/app/lib/auth-utils';

export async function GET() {
  const forbidden = await requireAdminApi();
  if (forbidden) return forbidden;

  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' },
  });

  const data = authors.map(a => ({
    id: a.id,
    name: a.name,
    bio: a.bio || '',
    photo_url: a.photo_url || '',
    wikipedia_url: a.wikipedia_url || '',
  }));

  const csv = generateCsv(data);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="authors.csv"',
    },
  });
}
