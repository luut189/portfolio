export type Project = {
  slug: string;
  name: string;
  featured: boolean;
  tagline: string;
  repoUrl: string;
  liveUrl?: string;
  stack: string[];
  highlights: string[];
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  caseStudy?: {
    summary: string;
    role: string;
    sections: Array<{
      title: string;
      body: string;
      points: string[];
    }>;
  };
};

export const projects: Project[] = [
  {
    slug: 'anidis',
    name: 'AniDis',
    featured: true,
    tagline: 'Full-Stack Anime Platform',
    repoUrl: 'https://github.com/luut189/anidis',
    liveUrl: 'https://anidis.moe',
    stack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: [
      'Built an anime discovery, tracking, and discussion platform with Next.js product, landing, and Cel docs apps in a Turborepo monorepo.',
      'Designed FastAPI/PostgreSQL APIs for Jikan-powered discovery, profiles, folders, episode progress, follows, threads, nested comments, likes, and avatars.',
      'Created path-filtered GitHub Actions CI for linting, formatting, type checks, pytest suites, Playwright E2E, Docker builds, and Alembic schema drift checks.',
      'Published SHA-tagged GHCR images for web, landing, Cel docs, and backend services, then deployed by git SHA through a self-hosted GitHub Actions runner.',
      'Managed Docker Compose stacks behind Traefik with Doppler-synced secrets, migrations, smoke checks, and OpenTelemetry/Grafana/Loki/Tempo observability.',
    ],
    images: [
      {
        src: '/anidis/hero.png',
        alt: 'AniDis landing page with seasonal anime lineup and feature sections',
        caption: 'Landing experience for seasonal anime discovery.',
      },
      {
        src: '/anidis/auth.png',
        alt: 'AniDis sign in page for creating an anime desk',
        caption: 'App entry point with provider auth and browsing fallback.',
      },
    ],
    caseStudy: {
      summary:
        'AniDis is a full-stack anime discovery, tracking, and discussion platform built around current-season browsing, organized watch folders, episode progress, and threaded conversation.',
      role: 'Designed and shipped the product surface, API layer, database model, CI pipeline, container builds, and self-hosted deployment path.',
      sections: [
        {
          title: 'Product Shape',
          body: 'The app is centered on the moment a viewer asks what is airing now, what they are already following, and where the active discussion is happening.',
          points: [
            'Built separate Next.js product, landing, and Cel docs apps inside a Turborepo monorepo.',
            'Modeled discovery around current-season anime, folders, profile activity, and episode progress.',
            'Kept the entry flow usable for browsing while preserving authenticated watch and discussion state.',
          ],
        },
        {
          title: 'System Design',
          body: 'The backend keeps Jikan-powered discovery, social features, profile data, and discussion primitives behind a typed FastAPI/PostgreSQL API.',
          points: [
            'Designed API surfaces for anime metadata, profiles, follows, folders, episode progress, threads, comments, likes, and avatars.',
            'Used PostgreSQL, Redis, and Alembic migrations to keep application state explicit and deployable.',
            'Separated product concerns enough for the landing site, app shell, docs, and backend services to ship independently.',
          ],
        },
        {
          title: 'Shipping Discipline',
          body: 'The project is deployed like a real service rather than a static demo, with repeatable checks, versioned images, and observable infrastructure.',
          points: [
            'Created path-filtered GitHub Actions CI for linting, formatting, type checks, pytest, Playwright E2E, Docker builds, and schema drift checks.',
            'Published SHA-tagged GHCR images for web, landing, docs, and backend services.',
            'Deployed through a self-hosted runner with Traefik, Doppler-synced secrets, smoke checks, and OpenTelemetry/Grafana/Loki/Tempo observability.',
          ],
        },
      ],
    },
  },
  {
    slug: 'kyzen',
    name: 'Kyzen',
    featured: false,
    tagline: '2D Game Engine',
    repoUrl: 'https://github.com/luut189/kyzen',
    stack: ['Java', 'Maven', 'OpenGL'],
    highlights: [
      'Built a 2D game engine with batch rendering, improving performance by up to 60% when handling 1,000+ objects per frame.',
      'Applied OOP principles and patterns (Builder, Singleton) to keep systems modular and maintainable.',
      'Implemented an Entity-Component System (ECS) for flexible, extensible game object composition.',
      'Added texture atlas support to reduce draw calls by over 70% for sprites and tiles.',
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
