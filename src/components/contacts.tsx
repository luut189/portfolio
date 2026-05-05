import { GitHub, LinkedIn } from '@/components/ui/icons';

import { Mail } from 'lucide-react';

const iconClassName = 'h-6 w-6';

const contacts = [
  {
    label: 'Open GitHub profile',
    display: <GitHub className={iconClassName} />,
    href: 'https://github.com/luut189',
  },
  {
    label: 'Open LinkedIn profile',
    display: <LinkedIn className={iconClassName} />,
    href: 'https://www.linkedin.com/in/luut189/',
  },
  {
    label: 'Send email',
    display: <Mail className={iconClassName} />,
    href: 'mailto:tm2luu@uwaterloo.ca',
  },
];

export default function Contacts() {
  return (
    <div className='flex items-center justify-center gap-4'>
      {contacts.map((contact) => (
        <a
          key={contact.href}
          className='text-foreground hover:text-muted-foreground transition-all hover:scale-110'
          rel='noopener noreferrer'
          target='_blank'
          aria-label={contact.label}
          title={contact.label}
          href={contact.href}>
          {contact.display}
        </a>
      ))}
    </div>
  );
}
