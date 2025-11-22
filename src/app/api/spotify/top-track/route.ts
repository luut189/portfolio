/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSpotifyToken } from '@/lib/spotify';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getSpotifyToken();
    if (!token) {
      return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
    }

    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch top track' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      items: data.items.map((item: any) => ({
        id: item.id,
      })),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Failed to fetch top track',
        details: String(err),
      },
      { status: 500 },
    );
  }
}
