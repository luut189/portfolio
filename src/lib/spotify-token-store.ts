/* oxlint-disable import/no-nodejs-modules -- Grant encryption runs only in the Node.js runtime. */
import 'server-only';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

import { getSpotifyOAuthCredentials } from '@/lib/spotify-oauth';

import { BlobPreconditionFailedError, get, put } from '@vercel/blob';

const SPOTIFY_GRANT_PATH = 'private/spotify/grant.json';
const ENCRYPTION_CONTEXT = 'portfolio:spotify-grant:v1';

export interface SpotifyGrant {
  accountId: string;
  displayName: string | null;
  refreshToken: string;
  accessToken: string;
  accessTokenExpiresAt: number;
  scope: string;
  authorizedAt: string;
  updatedAt: string;
}

export interface StoredSpotifyGrant {
  grant: SpotifyGrant;
  etag: string;
}

interface EncryptedSpotifyGrant {
  version: 1;
  iv: string;
  authTag: string;
  ciphertext: string;
}

export class SpotifyAccountMismatchError extends Error {
  constructor() {
    super('The authorized Spotify account does not match the account already bound to this site.');
    this.name = 'SpotifyAccountMismatchError';
  }
}

export async function readSpotifyGrant(): Promise<StoredSpotifyGrant | null> {
  const result = await get(SPOTIFY_GRANT_PATH, {
    access: 'private',
    useCache: false,
  });

  if (!result) {
    return null;
  }

  if (result.statusCode !== 200) {
    throw new Error(`Unexpected Spotify grant response status ${result.statusCode}.`);
  }

  const encrypted = (await new Response(result.stream).json()) as EncryptedSpotifyGrant;

  return {
    grant: decryptGrant(encrypted),
    etag: result.blob.etag,
  };
}

export async function writeSpotifyGrant(grant: SpotifyGrant, etag: string): Promise<void> {
  await put(SPOTIFY_GRANT_PATH, JSON.stringify(encryptGrant(grant)), {
    access: 'private',
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: 'application/json',
    ifMatch: etag,
  });
}

export async function saveAuthorizedSpotifyGrant(grant: SpotifyGrant): Promise<void> {
  const existing = await readSpotifyGrant();

  if (existing && existing.grant.accountId !== grant.accountId) {
    throw new SpotifyAccountMismatchError();
  }

  try {
    if (existing) {
      await writeSpotifyGrant(grant, existing.etag);
      return;
    }

    await put(SPOTIFY_GRANT_PATH, JSON.stringify(encryptGrant(grant)), {
      access: 'private',
      allowOverwrite: false,
      cacheControlMaxAge: 60,
      contentType: 'application/json',
    });
  } catch (error) {
    const latest = await readSpotifyGrant();

    if (!latest) {
      throw error;
    }

    if (latest.grant.accountId !== grant.accountId) {
      throw new SpotifyAccountMismatchError();
    }

    await writeSpotifyGrant(grant, latest.etag);
  }
}

export function isSpotifyGrantWriteConflict(error: unknown): boolean {
  return error instanceof BlobPreconditionFailedError;
}

function encryptGrant(grant: SpotifyGrant): EncryptedSpotifyGrant {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(grant), 'utf8'), cipher.final()]);

  return {
    version: 1,
    iv: iv.toString('base64url'),
    authTag: cipher.getAuthTag().toString('base64url'),
    ciphertext: ciphertext.toString('base64url'),
  };
}

function decryptGrant(encrypted: EncryptedSpotifyGrant): SpotifyGrant {
  if (encrypted.version !== 1) {
    throw new Error('Unsupported Spotify grant version.');
  }

  const decipher = createDecipheriv(
    'aes-256-gcm',
    getEncryptionKey(),
    Buffer.from(encrypted.iv, 'base64url'),
  );
  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'base64url'));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(encrypted.ciphertext, 'base64url')),
    decipher.final(),
  ]);

  return JSON.parse(plaintext.toString('utf8')) as SpotifyGrant;
}

function getEncryptionKey(): Buffer {
  const { clientSecret } = getSpotifyOAuthCredentials();

  return createHash('sha256').update(ENCRYPTION_CONTEXT).update(clientSecret).digest();
}
