import { describe, it, expect } from 'vitest';
import { generateCsv, parseCsv } from '@/app/lib/csv';

describe('generateCsv', () => {
  it('generates CSV from array of objects', () => {
    const data = [
      { name: 'Event 1', date: '2024-01-01' },
      { name: 'Event 2', date: '2024-06-15' },
    ];
    const csv = generateCsv(data);
    expect(csv).toContain('name,date');
    expect(csv).toContain('Event 1');
    expect(csv).toContain('Event 2');
  });

  it('handles empty array', () => {
    const csv = generateCsv([]);
    expect(csv).toBe('');
  });

  it('handles special characters', () => {
    const data = [{ name: 'L\'événement, spécial', value: 'ok' }];
    const csv = generateCsv(data);
    expect(csv).toContain('événement');
  });
});

describe('parseCsv', () => {
  it('parses CSV string to objects', () => {
    const csv = 'name,date\nEvent 1,2024-01-01\nEvent 2,2024-06-15';
    const result = parseCsv<{ name: string; date: string }>(csv);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Event 1');
    expect(result[1].date).toBe('2024-06-15');
  });

  it('trims header whitespace', () => {
    const csv = ' name , date \nEvent 1,2024-01-01';
    const result = parseCsv<{ name: string; date: string }>(csv);
    expect(result[0].name).toBe('Event 1');
  });

  it('skips empty lines', () => {
    const csv = 'name,date\nEvent 1,2024-01-01\n\nEvent 2,2024-06-15\n';
    const result = parseCsv<{ name: string; date: string }>(csv);
    expect(result).toHaveLength(2);
  });

  it('roundtrips with generateCsv', () => {
    const original = [
      { title: 'BD 1', publisher: 'Dargaud' },
      { title: 'BD 2', publisher: 'Dupuis' },
    ];
    const csv = generateCsv(original);
    const parsed = parseCsv<{ title: string; publisher: string }>(csv);
    expect(parsed).toEqual(original);
  });
});
