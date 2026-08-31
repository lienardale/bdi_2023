import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/app/ui/admin/breadcrumbs';
import HighlightForm from '@/app/ui/admin/home/highlight-form';

export default async function CreateHighlightPage() {
  const [tHighlights, tCommon] = await Promise.all([
    getTranslations('adminHighlights'),
    getTranslations('common'),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: tHighlights('title'), href: '/admin/home?section=highlights' },
          {
            label: tCommon('create'),
            href: '/admin/home/highlights/create',
            active: true,
          },
        ]}
      />
      <HighlightForm />
    </main>
  );
}
