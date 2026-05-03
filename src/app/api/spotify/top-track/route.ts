import { getTopTracks } from '@/lib/spotify';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      items: await getTopTracks(),
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
