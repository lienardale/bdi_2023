import sanitizeHtml from 'sanitize-html';

/**
 * Allowlist for admin-authored rich text (the legal mentions page).
 *
 * Deliberately narrow: the editor only ever produces these tags, so anything
 * else in the payload was either pasted from elsewhere or forged, and is
 * dropped rather than trusted. `javascript:` / `data:` hrefs cannot survive
 * because `allowedSchemes` does not list them.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br',
    'strong', 'em', 'u', 's',
    'h2', 'h3', 'h4',
    'ul', 'ol', 'li',
    'a', 'blockquote', 'hr',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  // Reject protocol-relative (//evil.com) and other scheme-less absolutes.
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  },
};

/**
 * Clean admin-authored HTML before it is persisted.
 *
 * Returns `null` when the content carries no text and no meaningful markup —
 * an emptied editor submits `"<p></p>"` rather than an empty string, and we
 * want that stored as NULL so "has content" checks stay simple.
 */
export function sanitizeRichText(html: string | null | undefined): string | null {
  if (!html || !html.trim()) return null;

  const clean = sanitizeHtml(html, OPTIONS);

  // `<hr>` and `<br>` carry meaning without contributing text, so only treat
  // the result as empty when neither text nor a void tag survived.
  const hasText = sanitizeHtml(clean, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, ' ')
    .trim().length > 0;
  const hasVoidContent = /<(hr|br)\b/i.test(clean);

  if (!hasText && !hasVoidContent) return null;

  return clean;
}
