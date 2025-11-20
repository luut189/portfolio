import { ImageResponse } from '@vercel/og';
import Image from 'next/image';

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
        <Image src='https://kyzel.dev/icon.png' alt='Tuong Luu' width={128} height={128} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
};
