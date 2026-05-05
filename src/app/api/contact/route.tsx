import { contactFormSchema, sendContactEmail } from '@/lib/contact';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request body' },
        { status: 400 },
      );
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'unknown';

    await sendContactEmail(parsed.data, { ip });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
