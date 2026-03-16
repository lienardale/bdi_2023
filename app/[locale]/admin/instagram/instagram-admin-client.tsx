'use client';

import { useActionState, useEffect, useRef, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { lusitana } from '@/app/ui/fonts';
import { toast } from 'sonner';
import {
  addInstagramPost,
  deleteInstagramPost,
  toggleInstagramPost,
  reorderInstagramPosts,
  InstagramPostState,
} from '@/app/lib/actions';
import ConfirmDeleteButton from '@/app/ui/admin/confirm-delete-button';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

type InstagramPostRow = {
  id: string;
  shortcode: string;
  position: number;
  active: boolean;
};

export default function InstagramAdminClient({
  posts,
}: {
  posts: InstagramPostRow[];
}) {
  const t = useTranslations('adminInstagram');
  const tCommon = useTranslations('common');
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: InstagramPostState = { message: null, errors: {} };
  const [state, dispatch] = useActionState<InstagramPostState, FormData>(
    addInstagramPost,
    initialState,
  );

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || 'OK');
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  function handleReorder(currentIndex: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= posts.length) return;

    const newOrder = posts.map((p) => p.id);
    [newOrder[currentIndex], newOrder[swapIndex]] = [
      newOrder[swapIndex],
      newOrder[currentIndex],
    ];

    startTransition(() => {
      reorderInstagramPosts(newOrder);
    });
  }

  function handleToggle(id: string, currentActive: boolean) {
    startTransition(() => {
      toggleInstagramPost(id, !currentActive);
    });
  }

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-2 text-xl md:text-2xl`}>
        {t('title')}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">{t('description')}</p>

      {/* Help box */}
      <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <InformationCircleIcon className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold">{t('helpTitle')}</h2>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>{t('helpStep1')}</li>
          <li>{t.rich('helpStep2', { strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong> })}</li>
          <li>{t('helpStep3')}</li>
        </ol>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p><span className="font-medium text-foreground">Actif / Inactif :</span> {t('helpToggle')}</p>
          <p><span className="font-medium text-foreground">&#8593; &#8595; :</span> {t('helpReorder')}</p>
        </div>
      </div>

      {/* Add form */}
      <form ref={formRef} action={dispatch} className="mb-6">
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <input
              name="shortcode"
              type="text"
              placeholder={t('shortcodePlaceholder')}
              className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
            />
            {state.errors?.shortcode && (
              <div className="mt-1 text-sm text-destructive">
                {state.errors.shortcode.map((e) => (
                  <p key={e}>{e}</p>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t('addPost')}
          </button>
        </div>
      </form>

      {/* Posts list */}
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('noPostsYet')}</p>
      ) : (
        <div className="rounded-xl bg-card border border-border">
          <div className="divide-y divide-border">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-center gap-3 px-4 py-3"
              >
                {/* Thumbnail preview */}
                <a
                  href={`https://www.instagram.com/p/${post.shortcode}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-16 h-16 rounded overflow-hidden border border-border bg-muted"
                >
                  <iframe
                    src={`https://www.instagram.com/p/${post.shortcode}/embed/captioned/`}
                    className="w-[300px] h-[400px] border-0 pointer-events-none"
                    style={{ transform: 'scale(0.213)', transformOrigin: 'top left' }}
                    tabIndex={-1}
                    loading="lazy"
                  />
                </a>

                {/* Shortcode */}
                <div className="flex-1 min-w-0">
                  <a
                    href={`https://www.instagram.com/p/${post.shortcode}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline truncate block"
                  >
                    {post.shortcode}
                  </a>
                </div>

                {/* Active toggle */}
                <button
                  type="button"
                  onClick={() => handleToggle(post.id, post.active)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    post.active
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {post.active ? t('active') : t('inactive')}
                </button>

                {/* Reorder buttons */}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleReorder(index, 'up')}
                    disabled={index === 0}
                    aria-label={t('moveUp')}
                    className="rounded-md border border-border p-1.5 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowUpIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReorder(index, 'down')}
                    disabled={index === posts.length - 1}
                    aria-label={t('moveDown')}
                    className="rounded-md border border-border p-1.5 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowDownIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Delete */}
                <ConfirmDeleteButton
                  action={deleteInstagramPost.bind(null, post.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
