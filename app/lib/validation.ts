/**
 * Format validation helpers for admin data entry (warn-only on the client).
 */

/**
 * Validate an EAN-13 barcode (the form most BD ISBNs take).
 * Strips spaces/hyphens, requires exactly 13 digits, and verifies the
 * EAN-13 check digit: Σ(odd-position digits ×1 + even-position digits ×3)
 * over the first 12, check = (10 - sum % 10) % 10.
 */
export function isValidEan13(ean: string | null | undefined): boolean {
  if (!ean) return false;
  const digits = ean.replace(/[\s-]/g, '');
  if (!/^\d{13}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = digits.charCodeAt(i) - 48;
    sum += i % 2 === 0 ? d : d * 3;
  }
  const check = (10 - (sum % 10)) % 10;
  return check === digits.charCodeAt(12) - 48;
}
