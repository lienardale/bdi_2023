import { describe, it, expect } from 'vitest';
import { isValidEan13 } from '@/app/lib/validation';

describe('isValidEan13', () => {
  it('accepts a valid EAN-13 (correct check digit)', () => {
    // 9783161484100 — classic ISBN-13 example, check digit 0.
    expect(isValidEan13('9783161484100')).toBe(true);
    // 9782205057805 — a real BD ISBN-13, check digit 5.
    expect(isValidEan13('9782205057805')).toBe(true);
  });

  it('strips spaces and hyphens before validating', () => {
    expect(isValidEan13('978-3-16-148410-0')).toBe(true);
    expect(isValidEan13('978 3 16 148410 0')).toBe(true);
  });

  it('rejects a wrong check digit', () => {
    expect(isValidEan13('9783161484101')).toBe(false);
  });

  it('rejects wrong length', () => {
    expect(isValidEan13('978316148410')).toBe(false); // 12
    expect(isValidEan13('97831614841000')).toBe(false); // 14
  });

  it('rejects non-digit characters', () => {
    expect(isValidEan13('97831614841OO')).toBe(false);
    expect(isValidEan13('abcdefghijklm')).toBe(false);
  });

  it('rejects empty/nullish', () => {
    expect(isValidEan13('')).toBe(false);
    expect(isValidEan13(null)).toBe(false);
    expect(isValidEan13(undefined)).toBe(false);
  });
});
