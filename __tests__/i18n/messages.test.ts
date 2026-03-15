import { describe, it, expect } from 'vitest';
import fr from '@/messages/fr.json';
import en from '@/messages/en.json';

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe('i18n message files', () => {
  const frKeys = getKeys(fr);
  const enKeys = getKeys(en);

  it('fr.json and en.json have identical key sets', () => {
    const missingInEn = frKeys.filter(k => !enKeys.includes(k));
    const missingInFr = enKeys.filter(k => !frKeys.includes(k));

    if (missingInEn.length > 0 || missingInFr.length > 0) {
      const messages: string[] = [];
      if (missingInEn.length > 0) messages.push(`Missing in en.json: ${missingInEn.join(', ')}`);
      if (missingInFr.length > 0) messages.push(`Missing in fr.json: ${missingInFr.join(', ')}`);
      expect.fail(messages.join('\n'));
    }
  });

  it('no empty string values in fr.json', () => {
    const empty = frKeys.filter(k => {
      const parts = k.split('.');
      let val: unknown = fr;
      for (const p of parts) val = (val as Record<string, unknown>)[p];
      return val === '';
    });
    expect(empty, `Empty values in fr.json: ${empty.join(', ')}`).toHaveLength(0);
  });

  it('no empty string values in en.json', () => {
    const empty = enKeys.filter(k => {
      const parts = k.split('.');
      let val: unknown = en;
      for (const p of parts) val = (val as Record<string, unknown>)[p];
      return val === '';
    });
    expect(empty, `Empty values in en.json: ${empty.join(', ')}`).toHaveLength(0);
  });
});
