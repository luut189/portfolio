'use client';

import { CommandPalette } from '@/components/command-palette';

import { createContext, useContext, useState } from 'react';

type CommandPaletteContextType = {
  open: () => void;
  close: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextType | null>(null);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CommandPaletteContext.Provider
      value={{
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}>
      {children}
      <CommandPalette open={isOpen} setOpen={setIsOpen} />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used inside provider');
  return ctx;
}
