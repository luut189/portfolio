# Portfolio

Tuong Luu's portfolio, built with Next.js.

## Spotify authorization

The Spotify widget uses Authorization Code OAuth for the `user-read-recently-played` and
`user-top-read` scopes. Access and refresh tokens are encrypted with the Spotify client secret and
stored in a private Vercel Blob store. Production only needs these Spotify environment variables:

```dotenv
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

All application-owned environment variables are documented in `.env.example` and accessed through
the validated, server-only module at `src/lib/env.ts`.

To connect Spotify:

1. Create a private Blob store in the Vercel project and use its OIDC connection.
2. Add `http://127.0.0.1:3000/api/spotify/callback` to the Spotify app's redirect URIs.
3. Run `pnpm vercel:link` once to link the local repository to its Vercel project.
4. Run `pnpm dev`. The Vercel CLI fetches the Development environment, including short-lived Blob
   credentials, before starting Next.js on `127.0.0.1:3000`.
5. Visit `http://127.0.0.1:3000/api/spotify/login` to authorize the account.
6. Repeat the local authorization before Spotify's six-month refresh-token lifetime ends, or after
   the widget reports that Spotify data is unavailable.

The OAuth login and callback routes return `404` in production. Production can read and refresh the
encrypted grant in Blob, but authorization can only be initiated from a local development server.
