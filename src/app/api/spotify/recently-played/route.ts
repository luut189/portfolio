/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSpotifyToken } from '@/lib/spotify';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getSpotifyToken();
    if (!token) {
      return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch recently played' },
        { status: response.status },
      );
    }

    const data = await response.json();

    const mapped = data.items.map((item: any) => ({
      id: item.track.id,
    }));

    const uniqueItems = Array.from(new Map(mapped.map((item: any) => [item.id, item])).values());

    return NextResponse.json({
      items: uniqueItems.slice(0, 5),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Failed to fetch recently played',
        details: String(err),
      },
      { status: 500 },
    );
  }
}
