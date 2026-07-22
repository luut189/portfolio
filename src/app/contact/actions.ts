'use server';

import { sendContactEmail } from '@/lib/contact';
import { contactFormSchema } from '@/lib/contact-schema';

import { headers } from 'next/headers';

import type { ContactFormValues } from '@/lib/contact-schema';

export async function submitContactAction(values: ContactFormValues) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message ?? 'Please check the form fields and try again.',
    };
  }

  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'unknown';

    await sendContactEmail(parsed.data, { ip });

    return { success: true as const };
  } catch (error) {
    console.error('Unexpected contact action error:', error);
    return {
      success: false as const,
      error: 'Something went wrong. Try again.',
    };
  }
}
