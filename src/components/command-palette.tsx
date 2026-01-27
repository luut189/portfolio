'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCommandPalette } from '@/context/command-palette-context';
import { COMMAND_ITEMS, type CommandItem as Item } from '@/lib/command-items';

import fuzzysort from 'fuzzysort';
import { Search, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from './ui/button';

function useCommandK(onToggle: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onToggle]);
}

function getSearchText(item: Item): string {
  const parts = [item.title(), item.subtitle ?? '', ...(item.keywords ? item.keywords() : [])];

  if (item.type === 'preview') {
    parts.push(item.preview.heading ?? '');
    parts.push(...(item.preview.bullets ?? []));
  }

  return parts.filter(Boolean).join(' ');
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

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    setTimeout(() => {
      if (!next) {
        setQuery('');
      }
    }, 100);
  };

  useCommandK(() => handleOpenChange(!open));

  const run = useCallback(
    (item: Item) => {
      if (item.type === 'route' || item.type === 'preview') {
        router.push(item.href);
      } else if (item.type === 'action') {
        item.action();
      }
      setOpen(false);
      return;
    },
    [router, setOpen],
  );

  const all = useMemo(
    () => ({
      pages: COMMAND_ITEMS.pages,
      projects: COMMAND_ITEMS.projects,
      experience: COMMAND_ITEMS.experience,
      actions: [...COMMAND_ITEMS.actions, themeItem],
    }),
    [themeItem],
  );

  const itemById = useMemo(() => {
    const flat = [
      ...all.pages,
      ...all.projects,
      ...all.experience,
      ...[...COMMAND_ITEMS.actions, themeItem],
    ];
    return new Map(flat.map((it) => [it.id, it]));
  }, [all, themeItem]);

  const selected = useMemo(() => itemById.get(activeId) ?? null, [activeId, itemById]);

  const handleValueChange = useCallback(
    (v: string) => {
      if (itemById.has(v)) setActiveId(v);
    },
    [itemById],
  );

  const flatItems = useMemo(
    () => [
      ...all.pages,
      ...all.projects,
      ...all.experience,
      ...[...COMMAND_ITEMS.actions, themeItem],
    ],
    [all, themeItem],
  );

  const filtered = useMemo(() => {
    if (!query) return flatItems;

    return fuzzysort
      .go(query, flatItems, {
        keys: [(item) => getSearchText(item)],
        threshold: -1000,
      })
      .map((r) => r.obj);
  }, [query, flatItems]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className='max-w-4xl justify-center border-none bg-transparent p-0'
        showCloseButton={false}>
        <DialogHeader className='bg-background rounded-md border px-4 py-2 shadow'>
          <DialogTitle className='flex items-center gap-2 text-sm font-medium'>
            <Terminal size={64} className='h-5 w-5' /> Command Palette
          </DialogTitle>
        </DialogHeader>
        <div className='flex max-h-130 gap-2'>
          <Command
            value={activeId}
            onValueChange={handleValueChange}
            shouldFilter={false}
            className='shadow md:w-md'>
            <CommandInput
              placeholder='Search pages, projects, experience...'
              value={query}
              onValueChange={setQuery}
            />

            <CommandList className='max-h-130'>
              <CommandEmpty>No results found.</CommandEmpty>

              {!query ? (
                <>
                  <CommandGroup heading='Pages'>
                    {all.pages.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => run(item)}
                        onMouseEnter={() => setActiveId(item.id)}>
                        <div className='flex w-full items-center justify-between gap-3'>
                          <div>
                            <div className='text-sm font-medium'>{item.title()}</div>
                            {item.subtitle ? (
                              <div className='text-muted-foreground text-xs'>{item.subtitle}</div>
                            ) : null}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading='Projects'>
                    {all.projects.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => run(item)}
                        onMouseEnter={() => setActiveId(item.id)}>
                        <div className='flex w-full items-center justify-between gap-3'>
                          <div>
                            <div className='text-sm font-medium'>{item.title()}</div>
                            {item.subtitle ? (
                              <div className='text-muted-foreground text-xs'>{item.subtitle}</div>
                            ) : null}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading='Experience'>
                    {all.experience.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => run(item)}
                        onMouseEnter={() => setActiveId(item.id)}>
                        <div className='flex w-full items-center justify-between gap-3'>
                          <div>
                            <div className='text-sm font-medium'>{item.title()}</div>
                            {item.subtitle ? (
                              <div className='text-muted-foreground text-xs'>{item.subtitle}</div>
                            ) : null}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading='Actions'>
                    {all.actions.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => {
                          if (item.type !== 'action') return;
                          item.action();
                          setOpen(false);
                        }}
                        onMouseEnter={() => setActiveId(item.id)}>
                        <div className='flex w-full items-center justify-between gap-4'>
                          <div className='space-y-1'>
                            <div className='text-sm font-medium'>{item.title()}</div>
                            {item.subtitle ? (
                              <div className='text-muted-foreground text-xs'>{item.subtitle}</div>
                            ) : null}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              ) : filtered.length > 0 ? (
                <CommandGroup heading='Search results'>
                  {filtered.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={() => run(item)}
                      onMouseEnter={() => setActiveId(item.id)}>
                      <div className='flex w-full items-center justify-between gap-3'>
                        <div>
                          <div className='text-sm font-medium'>{item.title()}</div>
                          {item.subtitle ? (
                            <div className='text-muted-foreground text-xs'>{item.subtitle}</div>
                          ) : null}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
            </CommandList>
          </Command>

          {selected ? (
            <div className='bg-background hidden min-h-100 w-115 rounded-md border p-4 shadow lg:block'>
              {selected.type === 'preview' ? (
                <div>
                  <div className='text-sm font-semibold'>
                    {selected.preview.heading ?? selected.title()}
                  </div>
                  <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                    {selected.preview.body}
                  </p>

                  {selected.preview.bullets?.length ? (
                    <ul className='text-muted-foreground mt-3 list-disc space-y-1 pl-5 text-sm'>
                      {selected.preview.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <div>
                  <div className='text-sm font-semibold'>{selected.title()}</div>
                  <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                    {selected.subtitle}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CommandPaletteButton() {
  const { open } = useCommandPalette();
  const isMac = /Macintosh|Mac OS X/.test(navigator.userAgent);

  return (
    <Button variant={'outline'} onClick={open} className='flex items-center justify-between px-2'>
      <div className='mr-4 flex items-center justify-center gap-2'>
        <Search />
        <p className='text-muted-foreground text-xs'>Search...</p>
      </div>
      <div className='space-x-0.5 text-xs'>
        <kbd className='bg-accent rounded border px-1.5 py-0.5'>{isMac ? '⌘' : 'Ctrl'}</kbd>
        <span>+</span>
        <kbd className='bg-accent rounded border px-1.5 py-0.5'>K</kbd>
      </div>
    </Button>
  );
}
