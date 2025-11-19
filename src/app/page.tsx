import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Bio() {
    return (
        <div className='flex w-full items-center justify-center gap-10'>
            <div className='flex flex-col gap-2'>
                <div className='text-4xl font-bold'>Tuong Luu</div>
                <div className='text-muted-foreground text-2xl'>Computational Mathematics</div>
            </div>

            <Avatar className='h-32 w-32 border-2'>
                <AvatarImage src='https://github.com/luut189.png' />
                <AvatarFallback>KZ</AvatarFallback>
            </Avatar>
        </div>
    );
}

export default function Homepage() {
    return (
        <div className='flex w-full flex-1 flex-col items-center justify-center gap-8'>
            <Bio />
            <div>...</div>
        </div>
    );
}
