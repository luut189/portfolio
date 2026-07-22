/* oxlint-disable nextjs/no-img-element -- ImageResponse requires a raw image element. */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const GET = async () => {
  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        backgroundColor: '#f8f8f8ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <img src='https://kyzel.dev/icon.png' alt='Tuong Luu' width={512} height={512} />
    </div>,
    { width: 1200, height: 630 },
  );
};
