import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import RichTextEditor from '@/app/ui/admin/rich-text-editor';
import fr from '@/messages/fr.json';

function renderEditor(defaultValue?: string) {
  return render(
    <NextIntlClientProvider locale="fr" messages={fr}>
      <RichTextEditor name="contentFr" defaultValue={defaultValue} ariaLabel="Contenu" />
    </NextIntlClientProvider>,
  );
}

describe('RichTextEditor', () => {
  it('mounts and shows its toolbar', async () => {
    const { container } = renderEditor('<p>Bonjour</p>');
    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).not.toBeNull();
    });
    expect(screen.getByLabelText('Gras')).toBeDefined();
    expect(screen.getByLabelText('Titre de niveau 2')).toBeDefined();
    expect(screen.getByLabelText('Liste à puces')).toBeDefined();
  });

  it('renders the existing content into the editable area', async () => {
    const { container } = renderEditor('<p>Bonjour</p>');
    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')?.innerHTML).toContain('Bonjour');
    });
  });

  it('backs the field with a hidden input carrying the current HTML', async () => {
    const { container } = renderEditor('<p>Bonjour</p>');
    const hidden = container.querySelector('input[type="hidden"][name="contentFr"]');
    expect(hidden).not.toBeNull();
    expect((hidden as HTMLInputElement).value).toBe('<p>Bonjour</p>');
  });

  it('starts empty when there is no stored content', () => {
    const { container } = renderEditor(undefined);
    const hidden = container.querySelector('input[type="hidden"][name="contentFr"]');
    expect((hidden as HTMLInputElement).value).toBe('');
  });
});
