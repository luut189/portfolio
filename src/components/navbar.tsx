import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';

const routes = [
  { display: 'about', href: '/' },
  { display: 'projects', href: '/projects' },
  { display: 'resume', href: '/resume' },
];

export default function Navbar() {
  return (
    <nav className='my-4 flex items-center justify-between rounded-xl px-6 py-4'>
      <Link href='/' className='text-xl font-semibold'>
        kyzel's
      </Link>
      <div className='flex items-center justify-center gap-2'>
        <div className='hidden lg:flex'>
          {routes.map((route) => (
            <Button key={route.href} variant={'link'} className='text-lg font-semibold' asChild>
              <Link href={route.href}>{route.display}</Link>
            </Button>
          ))}
          <ThemeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex lg:hidden' asChild>
            <Button variant={'outline'} size={'icon'} className='group'>
              <Menu className='transition-transform group-data-[state=open]:rotate-90' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-5 flex flex-col items-end border-none p-2'>
            <ThemeToggle />
            {routes.map((route) => (
              <DropdownMenuItem
                key={route.href}
                className='font-medium underline underline-offset-2'
                asChild>
                <Link href={route.href}>{route.display}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
