'use client';

import { useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTranslations } from 'next-intl';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LinkIcon,
  ListBulletIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/app/lib/utils';

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active ?? false}
      className={cn(
        'rounded-md border border-border px-2 py-1.5 text-sm hover:bg-muted',
        active && 'bg-primary/10 text-primary border-primary/40',
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const t = useTranslations('adminLegal');

  return (
    <div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 p-2">
      <ToolbarButton
        label={t('bold')}
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton
        label={t('italic')}
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="font-serif italic">I</span>
      </ToolbarButton>
      <ToolbarButton
        label={t('heading2')}
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span className="font-semibold">H2</span>
      </ToolbarButton>
      <ToolbarButton
        label={t('heading3')}
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span className="font-semibold">H3</span>
      </ToolbarButton>
      <ToolbarButton
        label={t('bulletList')}
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListBulletIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label={t('orderedList')}
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <QueueListIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        label={t('link')}
        active={editor.isActive('link')}
        onClick={() => {
          if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = window.prompt(t('linkPrompt'));
          if (!url) return;
          // The stored HTML is sanitized server-side too; this only keeps the
          // editor itself from showing a link it will never be allowed to save.
          if (!/^(https?:|mailto:|tel:|\/)/i.test(url.trim())) {
            window.alert(t('linkInvalid'));
            return;
          }
          editor.chain().focus().setLink({ href: url.trim() }).run();
        }}
      >
        <LinkIcon className="w-4 h-4" />
      </ToolbarButton>
      <div className="ml-auto flex gap-1">
        <ToolbarButton
          label={t('undo')}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <ArrowUturnLeftIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          label={t('redo')}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <ArrowUturnRightIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}

/**
 * WYSIWYG field backed by a hidden input, so it submits with a plain
 * `<form action={dispatch}>` like every other admin field.
 */
export default function RichTextEditor({
  name,
  defaultValue,
  ariaLabel,
}: {
  name: string;
  defaultValue?: string | null;
  ariaLabel: string;
}) {
  const [html, setHtml] = useState(defaultValue ?? '');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false },
      }),
    ],
    content: defaultValue ?? '',
    // Required in the App Router: rendering on the server pass and again on the
    // client otherwise produces a hydration mismatch.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'aria-label': ariaLabel,
        class:
          'rich-text min-h-[16rem] w-full px-3 py-2 text-sm focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  return (
    <div className="rounded-md border border-input bg-background">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
