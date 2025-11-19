import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from './theme/theme-toggle';

const routes = [
    { display: 'about', href: '/' },
    { display: 'projects', href: '/projects' },
    { display: 'resume', href: '/resume' },
];

export default function Navbar() {
    return (
        <nav className='m-4 flex rounded-xl border-2 px-6 py-4'>
            <Link href='/' className='text-xl font-semibold'>
                kyzel's
            </Link>
            <div className='ml-auto flex items-center justify-center'>
                <ThemeToggle />
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        variant={'link'}
                        className='text-lg font-semibold'
                        asChild>
                        <Link href={route.href}>{route.display}</Link>
                    </Button>
                ))}
            </div>
        </nav>
    );
}
