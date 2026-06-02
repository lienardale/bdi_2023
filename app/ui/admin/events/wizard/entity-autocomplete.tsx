'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Item = { id: string; label: string };

export type EntitySelection =
  | { mode: 'existing'; existingId: string }
  | { mode: 'new'; name: string };

/**
 * Integrated "find-or-create" combobox. The user types a name: matching
 * existing items appear in the dropdown (pick one → existing), and when the
 * text matches nothing a "Créer « … »" row is offered (→ new). Typing a
 * non-matching name also resolves to `new` live, so a value survives blur
 * without an explicit click. Replaces the old Existing/New pill toggle.
 */
export default function EntityAutocomplete({
  items,
  selection,
  onChange,
  placeholder,
}: {
  items: Item[];
  selection: EntitySelection | null;
  onChange: (selection: EntitySelection) => void;
  placeholder?: string;
}) {
  const t = useTranslations('wizard');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    selection?.mode === 'existing'
      ? items.find((i) => i.id === selection.existingId)?.label ?? ''
      : selection?.mode === 'new'
        ? selection.name
        : '';

  const trimmed = query.trim();
  const filtered = trimmed
    ? items.filter((i) => i.label.toLowerCase().includes(trimmed.toLowerCase()))
    : items;
  const hasExact = items.some((i) => i.label.trim().toLowerCase() === trimmed.toLowerCase());
  const showCreate = trimmed !== '' && !hasExact;
  const optionCount = filtered.length + (showCreate ? 1 : 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectExisting = (id: string) => {
    onChange({ mode: 'existing', existingId: id });
    setQuery('');
    setIsOpen(false);
  };

  const commitNew = (name: string) => {
    onChange({ mode: 'new', name: name.trim() });
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, optionCount - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < filtered.length) {
        e.preventDefault();
        selectExisting(filtered[activeIndex].id);
      } else if (showCreate && (activeIndex === filtered.length || activeIndex < 0)) {
        e.preventDefault();
        commitNew(trimmed);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={isOpen ? query : selectedLabel}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          setActiveIndex(-1);
          if (!isOpen) setIsOpen(true);
          // Live-resolve typed text as a new entity; picking an existing item
          // from the dropdown overrides this.
          onChange({ mode: 'new', name: value });
        }}
        onFocus={() => {
          setIsOpen(true);
          setQuery(selection?.mode === 'new' ? selection.name : '');
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? t('searchPlaceholder')}
        className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="entity-autocomplete-listbox"
        aria-autocomplete="list"
      />
      {isOpen && optionCount > 0 && (
        <ul
          id="entity-autocomplete-listbox"
          role="listbox"
          className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-md z-10 max-h-48 overflow-y-auto"
        >
          {filtered.map((item, i) => (
            <li
              key={item.id}
              role="option"
              aria-selected={i === activeIndex}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${i === activeIndex ? 'bg-muted' : ''}`}
              onMouseDown={() => selectExisting(item.id)}
            >
              {item.label}
            </li>
          ))}
          {showCreate && (
            <li
              role="option"
              aria-selected={activeIndex === filtered.length}
              className={`px-3 py-2 text-sm cursor-pointer border-t border-border text-primary hover:bg-muted ${
                activeIndex === filtered.length ? 'bg-muted' : ''
              }`}
              onMouseDown={() => commitNew(trimmed)}
            >
              {t('createNamed', { name: trimmed })}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
