export const revalidate = 86400;

export async function GET() {
  const response = await fetch(
    'https://raw.githubusercontent.com/luut189/resume-repo/gh-pages/resume.pdf',
    {
      next: {
        revalidate,
      },
    },
  );

  if (!response.ok) {
    return new Response('Failed to fetch resume', { status: 502 });
  }

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'Content-Disposition': 'attachment; filename=TuongLuuResume.pdf',
      'Content-Type': 'application/pdf',
    },
  });
}
