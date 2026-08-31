import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import HighlightForm from '@/app/ui/admin/home/highlight-form';
import { fetchHighlightById } from '@/app/lib/data';

export default async function EditHighlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [highlight, tHighlights, tCommon] = await Promise.all([
    fetchHighlightById(id),
    getTranslations('adminHighlights'),
    getTranslations('common'),
  ]);
  if (!highlight) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: tHighlights('title'), href: '/admin/home?section=highlights' },
          {
            label: tCommon('edit'),
            href: `/admin/home/highlights/${id}/edit`,
            active: true,
          },
        ]}
      />
      <HighlightForm highlight={highlight} />
    </main>
  );
}
