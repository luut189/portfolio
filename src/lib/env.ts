import 'server-only';
import { z } from 'zod';

const optionalValue = z.string().trim().min(1).optional();

const environmentSchema = z.object({
  nodeEnv: z.enum(['development', 'test', 'production']).default('development'),
  resendApiKey: optionalValue,
  resendReceiver: z.email().optional(),
  spotifyClientId: optionalValue,
  spotifyClientSecret: optionalValue,
});

export const env = Object.freeze(
  environmentSchema.parse({
    nodeEnv: process.env.NODE_ENV,
    resendApiKey: process.env.RESEND_API_KEY,
    resendReceiver: process.env.RESEND_RECEIVER,
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  }),
);

export function getSpotifyEnvironment() {
  if (!env.spotifyClientId || !env.spotifyClientSecret) {
    throw new Error(
      'Spotify OAuth is not configured. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.',
    );
  }

  return {
    clientId: env.spotifyClientId,
    clientSecret: env.spotifyClientSecret,
  };
}

export function getResendEnvironment() {
  if (!env.resendApiKey || !env.resendReceiver) {
    throw new Error('Email delivery is not configured. Set RESEND_API_KEY and RESEND_RECEIVER.');
  }

  return {
    apiKey: env.resendApiKey,
    receiver: env.resendReceiver,
  };
}
