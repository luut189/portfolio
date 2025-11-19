import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const GET = async () => {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#f8f8f8ff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img src='https://kyzel.dev/icon.png' width={128} height={128} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
};
