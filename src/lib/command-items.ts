import { experiences } from '@/lib/experiences';
import { projects } from '@/lib/projects';

export type CommandItem =
  | {
      type: 'route';
      id: string;
      title: () => string;
      subtitle?: string;
      keywords?: () => string[];
      href: string;
    }
  | {
      type: 'preview';
      id: string;
      title: () => string;
      subtitle?: string;
      keywords?: () => string[];
      preview: {
        heading?: string;
        body: string;
        bullets?: string[];
      };
      href: string;
    }
  | {
      type: 'action';
      id: string;
      title: () => string;
      subtitle: string;
      keywords?: () => string[];
      action: () => void;
    };

const PAGES: CommandItem[] = [
  {
    type: 'route',
    id: 'home',
    title: () => 'Home',
    subtitle: 'Open homepage',
    href: '/',
  },
  {
    type: 'route',
    id: 'projects',
    title: () => 'Projects',
    subtitle: 'Explore projects',
    href: '/projects',
  },
  {
    type: 'route',
    id: 'resume',
    title: () => 'Resume',
    subtitle: 'View resume',
    href: '/resume',
  },
  {
    type: 'route',
    id: 'contact',
    title: () => 'Contact',
    subtitle: 'Send a message',
    href: '/contact',
  },
];

const projectItems: CommandItem[] = projects.map((p) => ({
  type: 'preview',
  id: `project:${p.slug}`,
  title: () => p.name,
  subtitle: p.tagline,
  href: `/projects/${p.slug}`,
  preview: {
    body: p.stack.join(', '),
    bullets: p.highlights,
  },
  keywords: () => [p.slug, ...p.stack, ...(p.liveUrl ? ['live', 'demo'] : []), 'project'],
}));

const experienceItems: CommandItem[] = experiences.map((e, idx) => {
  const heading = `${e.title} • ${e.company}`;
  const body = `${e.brief ? `${e.brief}` : ''} • ${e.from} - ${e.to}`;

  return {
    type: 'preview',
    id: `exp:${idx}:${e.company}:${e.title}`,
    title: () => `${e.title} @ ${e.company}`,
    subtitle: `${e.from} - ${e.to}`,
    href: '/',
    keywords: () => [
      e.title,
      e.company,
      e.from,
      e.to,
      ...(e.tasks ?? []).flatMap((t) => t.split(/\W+/).filter(Boolean)),
      'experience',
      'work',
      'intern',
      'education',
    ],
    preview: {
      heading,
      body,
      bullets: e.tasks,
    },
  };
});

const actionItems: CommandItem[] = [
  {
    type: 'action',
    id: 'action:resume',
    title: () => 'Download Resume',
    subtitle: 'Save PDF locally',
    keywords: () => ['resume', 'pdf'],
    action: () => window.location.assign('/api/resume'),
  },
];

export const COMMAND_ITEMS = {
  pages: PAGES,
  projects: projectItems,
  experience: experienceItems,
  actions: actionItems,
};
