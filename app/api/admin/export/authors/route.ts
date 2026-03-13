import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateCsv } from '@/app/lib/csv';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
