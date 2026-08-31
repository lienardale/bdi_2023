import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

/**
 * `/admin/home/highlights` exists only as the parent of `create` and
 * `[id]/edit`; the list itself is a tab on /admin/home. Redirect rather than
 * 404, so a truncated URL lands on the list the visitor was after.
 */
export default async function HighlightsIndexPage() {
  redirect(`/${await getLocale()}/admin/home?section=highlights`);
}
