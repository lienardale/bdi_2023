'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Item = { id: string; label: string };

export default function EntityCombobox({
  items,
  value,
  onChange,
  placeholder,
}: {
  items: Item[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
}) {
  const t = useTranslations('wizard');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  const selectedLabel = items.find((i) => i.id === value)?.label ?? '';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onChange(id);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[activeIndex].id);
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
          setQuery(e.target.value);
          setActiveIndex(-1);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          setQuery('');
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? t('searchPlaceholder')}
        className="block w-full rounded-md border border-input bg-background py-2 px-3 text-sm"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="entity-combobox-listbox"
        aria-autocomplete="list"
      />
      {isOpen && filtered.length > 0 && (
        <ul
          id="entity-combobox-listbox"
          role="listbox"
          className="absolute left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-md z-10 max-h-48 overflow-y-auto"
        >
          {filtered.map((item, i) => (
            <li
              key={item.id}
              role="option"
              aria-selected={i === activeIndex}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${i === activeIndex ? 'bg-muted' : ''}`}
              onMouseDown={() => handleSelect(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
