export function generateIcsContent({
  title,
  date,
  hour,
  place,
}: {
  title: string;
  date: Date;
  hour?: string | null;
  place?: string | null;
}): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());

  let dtStart: string;
  let dtEnd: string;

  if (hour) {
    const [hh, mm] = hour.split(':').map(Number);
    dtStart = `${y}${m}${d}T${pad(hh)}${pad(mm)}00`;
    // Default 3h duration
    const endH = hh + 3;
    dtEnd = `${y}${m}${d}T${pad(endH)}${pad(mm)}00`;
  } else {
    // All-day event
    dtStart = `${y}${m}${d}`;
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    dtEnd = `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`;
  }

  const uid = `${y}${m}${d}-${title.replace(/\s+/g, '-').toLowerCase()}@bdi`;
  const escapedTitle = title.replace(/[,;\\]/g, (c) => `\\${c}`);
  const escapedPlace = place ? place.replace(/[,;\\]/g, (c) => `\\${c}`) : '';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BDI//Bande des Idées//FR',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    hour ? `DTSTART:${dtStart}` : `DTSTART;VALUE=DATE:${dtStart}`,
    hour ? `DTEND:${dtEnd}` : `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:${escapedTitle}`,
    ...(place ? [`LOCATION:${escapedPlace}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}
