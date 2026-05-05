import ContactEmail from '@/lib/contact-email';

import { render as renderEmail } from '@react-email/render';
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { error: 'Name must be at least 2 characters' }),
  email: z.email({ error: 'Please enter a valid email address' }),
  subject: z.string().min(1, { error: 'Subject cannot be empty' }),
  message: z.string().min(1, { error: 'Message cannot be empty' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_RECEIVER = process.env.RESEND_RECEIVER ?? 'delivered@resend.dev';

export async function sendContactEmail(
  values: ContactFormValues,
  options?: { ip?: string },
): Promise<void> {
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
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Kyzel.dev <noreply@anidis.moe>',
      to: [RESEND_RECEIVER],
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
