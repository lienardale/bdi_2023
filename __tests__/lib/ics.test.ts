import { describe, it, expect } from 'vitest';
import { generateIcsContent } from '@/app/lib/ics';

describe('generateIcsContent', () => {
  it('generates all-day event when no hour', () => {
    const ics = generateIcsContent({
      title: 'BDI 42',
      date: new Date('2024-06-15'),
    });

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('SUMMARY:BDI 42');
    expect(ics).toContain('DTSTART;VALUE=DATE:20240615');
    expect(ics).toContain('DTEND;VALUE=DATE:20240616');
    expect(ics).not.toContain('LOCATION');
    expect(ics).toContain('END:VEVENT');
    expect(ics).toContain('END:VCALENDAR');
  });

  it('generates timed event with hour', () => {
    const ics = generateIcsContent({
      title: 'BDI 43',
      date: new Date('2024-09-21'),
      hour: '14:30',
    });

    expect(ics).toContain('DTSTART:20240921T143000');
    expect(ics).toContain('DTEND:20240921T173000');
  });

  it('includes location when place is provided', () => {
    const ics = generateIcsContent({
      title: 'BDI 44',
      date: new Date('2024-12-07'),
      place: 'Librairie Le Divan, Paris',
    });

    expect(ics).toContain('LOCATION:Librairie Le Divan\\, Paris');
  });

  it('escapes special characters in title', () => {
    const ics = generateIcsContent({
      title: 'BDI; test, special\\chars',
      date: new Date('2024-01-01'),
    });

    expect(ics).toContain('SUMMARY:BDI\\; test\\, special\\\\chars');
  });
});
