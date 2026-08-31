import { describe, it, expect } from 'vitest';
import { sanitizeRichText } from '@/app/lib/rich-text';

describe('sanitizeRichText', () => {
  it('keeps the formatting the editor produces', () => {
    const html =
      '<h2>Éditeur</h2><p>Un <strong>gras</strong>, un <em>italique</em>.</p><ul><li>un</li><li>deux</li></ul>';
    expect(sanitizeRichText(html)).toBe(html);
  });

  it('strips script tags and their contents', () => {
    const clean = sanitizeRichText('<p>ok</p><script>alert(1)</script>');
    expect(clean).toBe('<p>ok</p>');
  });

  it('strips event handler attributes', () => {
    const clean = sanitizeRichText('<p onclick="alert(1)">texte</p>');
    expect(clean).toBe('<p>texte</p>');
  });

  it('strips tags outside the allowlist but keeps their text', () => {
    const clean = sanitizeRichText('<div><span>texte</span></div>');
    expect(clean).not.toContain('<div');
    expect(clean).not.toContain('<span');
    expect(clean).toContain('texte');
  });

  it('drops a javascript: href but keeps the link text', () => {
    const clean = sanitizeRichText('<p><a href="javascript:alert(1)">clic</a></p>');
    expect(clean).not.toContain('javascript');
    expect(clean).toContain('clic');
  });

  it('drops a data: href', () => {
    const clean = sanitizeRichText('<p><a href="data:text/html,<b>x</b>">clic</a></p>');
    expect(clean).not.toContain('data:');
  });

  it('keeps http, mailto and tel links', () => {
    expect(sanitizeRichText('<p><a href="https://example.com">a</a></p>')).toContain(
      'https://example.com',
    );
    expect(sanitizeRichText('<p><a href="mailto:a@b.com">a</a></p>')).toContain('mailto:a@b.com');
    expect(sanitizeRichText('<p><a href="tel:0612345678">a</a></p>')).toContain('tel:0612345678');
  });

  it('forces target and rel on links', () => {
    const clean = sanitizeRichText('<p><a href="https://example.com">a</a></p>');
    expect(clean).toContain('target="_blank"');
    expect(clean).toContain('rel="noopener noreferrer"');
  });

  it('returns null for content with no text and no meaningful markup', () => {
    expect(sanitizeRichText('')).toBeNull();
    expect(sanitizeRichText('   ')).toBeNull();
    expect(sanitizeRichText(null)).toBeNull();
    expect(sanitizeRichText(undefined)).toBeNull();
    // What Tiptap submits for an emptied editor.
    expect(sanitizeRichText('<p></p>')).toBeNull();
    expect(sanitizeRichText('<p><br></p>')).not.toBeNull();
    expect(sanitizeRichText('<script>alert(1)</script>')).toBeNull();
  });

  it('keeps a horizontal rule even though it carries no text', () => {
    expect(sanitizeRichText('<hr />')).not.toBeNull();
  });
});
