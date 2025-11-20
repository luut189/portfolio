import ContactEmail from '@/lib/contact-email';
import { render } from '@react-email/components';
import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'unknown';

    const html = await render(
      <ContactEmail
        name={name}
        email={email}
        subject={subject}
        message={message}
        timestamp={timestamp}
        ip={ip}
      />,
    );

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'info@mail.kyzel.dev',
        to: ['tuong.luu@uwaterloo.ca'],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Resend API error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
