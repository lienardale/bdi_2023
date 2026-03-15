import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { generateIcsContent } from '@/app/lib/ics';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  const ics = generateIcsContent({
    title: event.name,
    date: event.date,
    hour: event.hour,
    place: event.place,
  });

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${event.name.replace(/[^a-zA-Z0-9]/g, '_')}.ics"`,
    },
  });
}
