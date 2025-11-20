import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    'https://raw.githubusercontent.com/luut189/latex-repo/gh-pages/resume.pdf',
  );
  const buffer = await response.arrayBuffer();

  res.setHeader('Content-Disposition', 'attachment; filename=TuongLuuResume.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(buffer));
}
