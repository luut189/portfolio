export async function GET() {
  const response = await fetch(
    'https://raw.githubusercontent.com/luut189/latex-repo/gh-pages/resume.pdf',
  );
  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Disposition': 'attachment; filename=TuongLuuResume.pdf',
      'Content-Type': 'application/pdf',
    },
  });
}
