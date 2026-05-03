import { getRecentlyPlayedTracks } from '@/lib/spotify';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      items: await getRecentlyPlayedTracks(),
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
