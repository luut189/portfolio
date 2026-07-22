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
2. Add `https://kyzel.dev/api/spotify/callback` to the Spotify app's redirect URIs.
3. Deploy the application, then visit `https://kyzel.dev/api/spotify/login` and authorize the
   account once.
4. Repeat the authorization before Spotify's six-month refresh-token lifetime ends, or after the
   widget reports that Spotify data is unavailable.

For local authorization, add `http://127.0.0.1:3000/api/spotify/callback` in Spotify, run
`vercel link`, then `vercel env pull` to obtain short-lived Blob credentials before starting the app
on `127.0.0.1`.
