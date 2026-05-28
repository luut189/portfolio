export interface TimelineEntry {
  from: string;
  to: string;
  title: string;
  company: string;
  url: string;
  logo: string;
  brief: string;
  tasks: string[];
}

export const experiences: TimelineEntry[] = [
  {
    from: 'May 2026',
    to: 'Present',
    title: 'Software Engineer Intern',
    company: 'Carta',
    url: 'https://carta.com/',
    logo: '/carta.png',
    brief: 'data ecosystem team',
    tasks: ['to be added'],
  },
  {
    from: 'Sep 2025',
    to: 'Dec 2025',
    title: 'Software Developer Intern',
    company: 'Lynkr',
    url: 'https://lynkr.ca',
    logo: '/lynkr.png',
    brief: 'built FastAPI + Next.js with AI orchestration',
    tasks: [
      'shipped FastAPI + Next.js app with AI agents, driving $100k+ CAD revenue and 500+ beta users',
      'migrated DB seeder into a Kubernetes job on GKE, cutting deploy time by 40%',
      'architected multi-org tenancy with tenant isolation and RBAC',
      'built MFA with TOTP + Twilio and JWT session controls, cutting unauthorized access by 70%',
      'delivered audit logging for user actions, admin changes, and security events',
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    from: 'Sep 2023',
    to: 'Aug 2028',
    title: 'Computational Mathematics',
    company: 'UWaterloo',
    url: 'https://uwaterloo.ca',
    logo: '/uwaterloo.svg',
    brief: 'studying cs and suffering with math',
    tasks: [
      'studied computer architecture concepts including processors, memory, I/O, and performance',
      'learned design and implementation of core data structures such as lists, trees, sets, and maps',
      'gained experience in object-oriented programming and building medium-sized software systems',
      'developed skills in algorithm design, sorting, recursion, and data abstraction',
      'practiced Linux command-line workflows, version control, scripting, debugging, and automated testing',
    ],
  },
];
