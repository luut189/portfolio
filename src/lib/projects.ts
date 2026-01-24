export type Project = {
  slug: string;
  name: string;
  tagline: string;
  repoUrl: string;
  stack: string[];
  highlights: string[];
  images?: Array<{
    src: string;
    alt: string;
  }>;
};

export const projects: Project[] = [
  {
    slug: 'anidis',
    name: 'AniDis',
    tagline: 'Anime Discussion Platform',
    repoUrl: 'https://github.com/luut189/anime-discuss',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    highlights: [
      'Built a MERN-based anime discussion platform with real-time updates for 1,000+ titles and threaded comments with unlimited nesting.',
      'Automated data ingestion and trend updates with scheduled backend jobs to keep content fresh at scale.',
      'Containerized deployment with Docker and Docker Compose, environment-based configuration, and CI/CD-ready Git workflows; self-hosted with Cloudflare Tunnel.',
      'Implemented security best practices and optimized frontend rendering for high-performance discussions.',
    ],
    images: [
      {
        src: '',
        alt: 'AniDis interface preview',
      },
    ],
  },
  {
    slug: 'kyzen',
    name: 'Kyzen',
    tagline: '2D Game Engine',
    repoUrl: 'https://github.com/luut189/kyzen',
    stack: ['Java', 'LWJGL', 'Maven', 'OpenGL'],
    highlights: [
      'Built a 2D game engine with batch rendering, improving performance by up to 60% when handling 1,000+ objects per frame.',
      'Applied OOP principles and patterns (Builder, Singleton) to keep systems modular and maintainable.',
      'Implemented an Entity-Component System (ECS) for flexible, extensible game object composition.',
      'Added texture atlas support to reduce draw calls by over 70% for sprites and tiles.',
    ],
    images: [
      {
        src: '',
        alt: 'Kyzen engine preview',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
