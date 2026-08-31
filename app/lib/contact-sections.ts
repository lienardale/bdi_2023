import { brand } from '@/config/brand';
import type {
  ContactIconKey,
  ContactSectionKind,
  ContactSectionRow,
  ResolvedContactSection,
} from './definitions';

export const CONTACT_SECTION_KINDS: ContactSectionKind[] = ['mail', 'phone', 'link'];

export const CONTACT_ICON_KEYS: ContactIconKey[] = [
  'envelope',
  'phone',
  'link',
  'facebook',
  'instagram',
  'website',
  'x',
  'youtube',
];

/** The glyph a section falls back to when no icon was explicitly chosen. */
export const DEFAULT_ICON_FOR_KIND: Record<ContactSectionKind, ContactIconKey> = {
  mail: 'envelope',
  phone: 'phone',
  link: 'link',
};

/**
 * Resolve which glyph to draw. A stored icon wins, but an absent or
 * unrecognised one falls back to the kind's own default rather than to a
 * generic chain-link.
 */
export function contactSectionIcon(
  kind: ContactSectionKind,
  icon: string | null | undefined,
): ContactIconKey {
  return isContactIconKey(icon) ? icon : DEFAULT_ICON_FOR_KIND[kind];
}

export function isContactSectionKind(value: unknown): value is ContactSectionKind {
  return typeof value === 'string' && (CONTACT_SECTION_KINDS as string[]).includes(value);
}

export function isContactIconKey(value: unknown): value is ContactIconKey {
  return typeof value === 'string' && (CONTACT_ICON_KEYS as string[]).includes(value);
}

// Only these four schemes may ever reach an href.
const ALLOWED_SCHEME = /^(https?|mailto|tel):/i;
// Any scheme at all, so we can tell "has a scheme we reject" from "has none".
const ANY_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Control characters are a classic way to smuggle a scheme past a naive check.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

/**
 * Reduce a human-formatted phone number to something dialable — keeps a leading
 * "+", drops every non-digit. "06 12 34 56 78" becomes "0612345678". The card's
 * displayed text keeps the admin's formatting; only the tel: target is stripped.
 */
function normalizePhone(value: string): string | null {
  const plus = value.trimStart().startsWith('+') ? '+' : '';
  const digits = value.replace(/\D/g, '');
  if (digits.length < 3) return null;
  return `${plus}${digits}`;
}

/**
 * Build the href for a contact section from its kind and admin-entered value.
 *
 * Accepts a value that already carries an allowed scheme and passes it through,
 * otherwise derives one from the kind. Returns `null` for anything unusable or
 * unsafe — callers skip those sections rather than render a broken card, and
 * the Zod schema uses the same check to reject bad input at save time.
 */
export function contactSectionHref(
  kind: ContactSectionKind,
  value: string | null | undefined,
): string | null {
  const trimmed = (value ?? '').trim();
  if (!trimmed) return null;
  if (CONTROL_CHARS.test(trimmed)) return null;
  // Protocol-relative URLs inherit the page scheme and hide their host.
  if (trimmed.startsWith('//')) return null;

  if (ANY_SCHEME.test(trimmed)) {
    if (!ALLOWED_SCHEME.test(trimmed)) return null;
    // A tel: the admin typed by hand may still carry human formatting.
    if (/^tel:/i.test(trimmed)) {
      const normalized = normalizePhone(trimmed.slice(4));
      return normalized ? `tel:${normalized}` : null;
    }
    return trimmed;
  }

  switch (kind) {
    case 'mail':
      return EMAIL.test(trimmed) ? `mailto:${trimmed}` : null;
    case 'phone': {
      const normalized = normalizePhone(trimmed);
      return normalized ? `tel:${normalized}` : null;
    }
    case 'link':
      // No scheme: only an internal path is meaningful (e.g. a contact form).
      return trimmed.startsWith('/') ? trimmed : null;
    default:
      return null;
  }
}

/** True when the href leaves the site and so needs target/rel. */
export function isExternalHref(href: string): boolean {
  return /^https?:/i.test(href);
}

/**
 * Pick the copy for the active locale and resolve the href.
 * English is optional throughout and falls back to French.
 */
export function resolveContactSection(
  row: ContactSectionRow,
  locale: string,
): ResolvedContactSection {
  const en = locale === 'en';
  return {
    id: row.id,
    kind: row.kind,
    icon: contactSectionIcon(row.kind, row.icon),
    title: (en && row.titleEn?.trim()) || row.titleFr,
    text: (en && row.textEn?.trim()) || row.textFr,
    href: contactSectionHref(row.kind, row.value),
  };
}

/**
 * Which sections the public contact page should render.
 *
 * The brand defaults stand in only while the table is completely empty — which
 * is the state right after the migration, on a live site. Once an admin has
 * created even one section, their list is authoritative and deactivating
 * everything genuinely empties the page instead of resurrecting the defaults.
 */
export function contactSectionsForDisplay(rows: ContactSectionRow[]): ContactSectionRow[] {
  if (rows.length === 0) return defaultContactSections();
  return rows.filter((row) => row.active);
}

/**
 * The three cards the contact page shipped with, derived from the brand config.
 *
 * Used as the public page's fallback while the ContactSection table is empty —
 * so the migration can never blank a live contact page — and as the payload of
 * the admin's "create default sections" button.
 */
export function defaultContactSections(): ContactSectionRow[] {
  return [
    {
      id: 'default-email',
      kind: 'mail',
      icon: 'envelope',
      titleFr: 'Email',
      titleEn: 'Email',
      textFr: brand.email,
      textEn: brand.email,
      value: brand.email,
      position: 1,
      active: true,
    },
    {
      id: 'default-facebook',
      kind: 'link',
      icon: 'facebook',
      titleFr: 'Facebook',
      titleEn: 'Facebook',
      textFr: `Page Facebook ${brand.longName}`,
      textEn: `${brand.longName} Facebook page`,
      value: brand.facebookUrl,
      position: 2,
      active: true,
    },
    {
      id: 'default-instagram',
      kind: 'link',
      icon: 'instagram',
      titleFr: 'Instagram',
      titleEn: 'Instagram',
      textFr: brand.instagramHandle,
      textEn: brand.instagramHandle,
      value: brand.instagramUrl,
      position: 3,
      active: true,
    },
  ];
}
