'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCommandPalette } from '@/context/command-palette-context';
import { COMMAND_ITEMS, type CommandItem as Item } from '@/lib/command-items';

import fuzzysort from 'fuzzysort';
import { ArrowRight, CornerDownLeft, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import { Button } from './ui/button';

type CommandSection = {
  heading: string;
  label: string;
  items: Item[];
};

function getSearchText(item: Item): string {
  const parts = [item.title(), item.subtitle ?? '', ...(item.keywords ? item.keywords() : [])];

  if (item.type === 'preview') {
    parts.push(item.preview.heading ?? '');
    parts.push(item.preview.body);
    parts.push(...(item.preview.bullets ?? []));
  }

  return parts.filter(Boolean).join(' ');
}

function getActionText(item: Item): string {
  if (item.type === 'action') return 'Run';
  return 'Open';
}

function CommandRow({
  item,
  label,
  onRun,
  onActive,
}: {
  item: Item;
  label: string;
  onRun: (item: Item) => void;
  onActive: (id: string) => void;
}) {
  return (
    <CommandItem
      value={item.id}
      onSelect={() => onRun(item)}
      onMouseEnter={() => onActive(item.id)}
      className='group mx-1 rounded-lg px-3 py-2.5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-foreground data-[selected=true]:ring-1 data-[selected=true]:ring-primary/15'>
      <div className='grid min-w-0 flex-1 gap-1'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='truncate text-sm font-medium'>{item.title()}</span>
          <span className='shrink-0 rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground group-data-[selected=true]:bg-background/70 group-data-[selected=true]:text-foreground/70'>
            {label}
          </span>
        </div>
        {item.subtitle ? (
          <p className='truncate text-xs text-muted-foreground group-data-[selected=true]:text-foreground/70'>
            {item.subtitle}
          </p>
        ) : null}
      </div>
      <ArrowRight className='ml-2 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:text-foreground/80 group-data-[selected=true]:opacity-100' />
    </CommandItem>
  );
}

function SelectedPreview({ item, label }: { item: Item; label: string }) {
  const heading = item.type === 'preview' ? (item.preview.heading ?? item.title()) : item.title();
  const body = item.type === 'preview' ? item.preview.body : item.subtitle;
  const bullets = item.type === 'preview' ? item.preview.bullets?.slice(0, 4) : undefined;

  return (
    <aside className='hidden h-full min-h-0 border-l bg-card lg:flex lg:w-88 lg:flex-col'>
      <div className='command-palette-scroll min-h-0 flex-1 overflow-y-auto p-5'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between gap-3'>
            <span className='rounded bg-accent px-2 py-1 text-xs font-medium text-muted-foreground'>
              {label}
            </span>
            <span className='text-xs text-muted-foreground'>{getActionText(item)}</span>
          </div>

          <div className='space-y-2'>
            <h2 className='text-lg leading-snug font-semibold'>{heading}</h2>
            {body ? <p className='text-sm leading-6 text-muted-foreground'>{body}</p> : null}
          </div>
        </div>

        {bullets?.length ? (
          <ul className='mt-5 space-y-3 text-sm leading-6'>
            {bullets.map((bullet) => (
              <li key={bullet} className='flex gap-3'>
                <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className='flex h-10 shrink-0 items-center border-t px-5 text-xs text-muted-foreground'>
        Press Enter to {getActionText(item).toLowerCase()}.
      </div>
    </aside>
  );
}

function getItemLabel(item: Item, sections: CommandSection[]): string {
  return (
    sections.find((section) => section.items.some((sectionItem) => sectionItem.id === item.id))
      ?.label ?? item.type
  );
}

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const isDark = (resolvedTheme ?? theme) === 'dark';

  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string>('');

  const themeItem: Item = useMemo(
    () => ({
      type: 'action',
      id: 'action:theme',
      title: () => (isDark ? 'Switch to light mode' : 'Switch to dark mode'),
      subtitle: 'Toggle theme',
      keywords: () => ['theme', 'dark', 'light', 'mode', isDark ? 'light' : 'dark'],
      action: () => setTheme(isDark ? 'light' : 'dark'),
    }),
    [setTheme, isDark],
  );

  const sections: CommandSection[] = useMemo(
    () => [
      { heading: 'Pages', label: 'Page', items: COMMAND_ITEMS.pages },
      { heading: 'Projects', label: 'Project', items: COMMAND_ITEMS.projects },
      { heading: 'Experience', label: 'Experience', items: COMMAND_ITEMS.experience },
      { heading: 'Education', label: 'Education', items: COMMAND_ITEMS.education },
      { heading: 'Actions', label: 'Action', items: [...COMMAND_ITEMS.actions, themeItem] },
    ],
    [themeItem],
  );

  const flatItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);

  const filtered = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return flatItems;

    return fuzzysort
      .go(trimmed, flatItems, {
        keys: [(item) => getSearchText(item)],
        threshold: -1000,
      })
      .map((result) => result.obj);
  }, [query, flatItems]);

  const itemById = useMemo(() => new Map(flatItems.map((item) => [item.id, item])), [flatItems]);

  const selected = useMemo(() => {
    const active = itemById.get(activeId);
    if (active && filtered.some((item) => item.id === active.id)) return active;
    return filtered[0] ?? null;
  }, [activeId, filtered, itemById]);
  const selectedLabel = selected ? getItemLabel(selected, sections) : '';

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    setTimeout(() => {
      if (!next) {
        setQuery('');
      }
    }, 100);
  };

  const run = useCallback(
    (item: Item) => {
      if (item.type === 'route' || item.type === 'preview') {
        router.push(item.href);
      } else {
        item.action();
      }

      setOpen(false);
    },
    [router, setOpen],
  );

  const handleValueChange = useCallback(
    (value: string) => {
      if (itemById.has(value)) setActiveId(value);
    },
    [itemById],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='w-[min(calc(100vw-1.5rem),58rem)] max-w-none overflow-hidden border p-0 shadow-2xl sm:max-w-none'
        showCloseButton={false}>
        <DialogHeader className='sr-only'>
          <DialogTitle>Command Palette</DialogTitle>
        </DialogHeader>

        <Command
          value={selected?.id ?? ''}
          onValueChange={handleValueChange}
          shouldFilter={false}
          className='rounded-lg bg-background [&_[data-slot=command-input-wrapper]]:h-14 [&_[data-slot=command-input-wrapper]]:px-4 [&_[data-slot=command-input]]:h-14'>
          <div className='grid h-[min(72vh,31rem)] lg:grid-cols-[minmax(0,1fr)_22rem]'>
            <div className='flex min-h-0 flex-col'>
              <CommandInput
                placeholder='Search pages, projects, experience, education...'
                value={query}
                onValueChange={setQuery}
                className='text-base'
              />

              <CommandList className='command-palette-scroll max-h-none min-h-0 flex-1 scroll-py-2 px-2 py-2'>
                <CommandEmpty className='py-12 text-center text-sm text-muted-foreground'>
                  No commands found.
                </CommandEmpty>

                {query.trim() ? (
                  <CommandGroup heading='Results' className='p-0'>
                    {filtered.map((item) => (
                      <CommandRow
                        key={item.id}
                        item={item}
                        label={getItemLabel(item, sections)}
                        onRun={run}
                        onActive={setActiveId}
                      />
                    ))}
                  </CommandGroup>
                ) : (
                  sections.map((section) => (
                    <CommandGroup key={section.heading} heading={section.heading} className='p-0'>
                      {section.items.map((item) => (
                        <CommandRow
                          key={item.id}
                          item={item}
                          label={section.label}
                          onRun={run}
                          onActive={setActiveId}
                        />
                      ))}
                    </CommandGroup>
                  ))
                )}
              </CommandList>

              <div className='flex h-8 shrink-0 items-center justify-between gap-3 border-t px-4 text-[11px] text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <CornerDownLeft className='h-3 w-3' />
                  <span>Open selected</span>
                </div>
                <span>Esc to close</span>
              </div>
            </div>

            {selected ? <SelectedPreview item={selected} label={selectedLabel} /> : null}
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export function CommandPaletteButton() {
  const { open, warmup } = useCommandPalette();
  const isMac = typeof navigator !== 'undefined' && /Macintosh|Mac OS X/.test(navigator.userAgent);

  return (
    <Button
      variant='outline'
      onClick={open}
      onMouseEnter={warmup}
      onFocus={warmup}
      className='flex items-center justify-between gap-3 px-2.5'>
      <div className='flex min-w-0 items-center justify-center gap-2'>
        <Search className='h-4 w-4' />
        <p className='hidden text-xs text-muted-foreground sm:block'>Search...</p>
      </div>
      <div className='flex items-center gap-1 text-xs'>
        <kbd className='rounded border bg-accent px-1.5 py-0.5'>{isMac ? '⌘' : 'Ctrl'}</kbd>
        <kbd className='rounded border bg-accent px-1.5 py-0.5'>K</kbd>
      </div>
    </Button>
  );
}
