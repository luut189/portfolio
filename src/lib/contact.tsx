import 'server-only';
import ContactEmail from '@/lib/contact-email';
import { getResendEnvironment } from '@/lib/env';

import { render as renderEmail } from '@react-email/render';

import type { ContactFormValues } from '@/lib/contact-schema';

export async function sendContactEmail(
  values: ContactFormValues,
  options?: { ip?: string },
): Promise<void> {
  const { apiKey, receiver } = getResendEnvironment();
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const html = await renderEmail(
    <ContactEmail
      name={values.name}
      email={values.email}
      subject={values.subject}
      message={values.message}
      timestamp={timestamp}
      ip={options?.ip ?? 'unknown'}
    />,
  );

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Kyzel.dev <noreply@anidis.moe>',
      to: [receiver],
      subject: values.subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Resend API error:', error);
    throw new Error('Failed to send email');
  }
}
