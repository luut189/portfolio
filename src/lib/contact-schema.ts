import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { error: 'Name must be at least 2 characters' }),
  email: z.email({ error: 'Please enter a valid email address' }),
  subject: z.string().min(1, { error: 'Subject cannot be empty' }),
  message: z.string().min(1, { error: 'Message cannot be empty' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
