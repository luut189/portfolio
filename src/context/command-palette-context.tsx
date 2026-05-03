'use client';

import dynamic from 'next/dynamic';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const loadCommandPalette = () => import('@/components/command-palette');

const LazyCommandPalette = dynamic(
  () => loadCommandPalette().then((module) => module.CommandPalette),
  {
    ssr: false,
  },
);

type CommandPaletteContextType = {
  open: () => void;
  close: () => void;
  warmup: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextType | null>(null);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const warmup = useMemo(() => () => void loadCommandPalette(), []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        warmup();
        setIsOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [warmup]);

  return (
    <CommandPaletteContext.Provider
      value={{
        open: () => {
          warmup();
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
        warmup,
      }}>
      {children}
      {isOpen ? <LazyCommandPalette open={isOpen} setOpen={setIsOpen} /> : null}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used inside provider');
  return ctx;
}
