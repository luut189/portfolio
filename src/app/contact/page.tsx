'use client';

import { submitContactAction } from '@/app/contact/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema } from '@/lib/contact-schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ContactPage() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const result = await submitContactAction(values);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success('Email sent successfully!');

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Try again.', {
        action: {
          label: 'Retry',
          onClick: () => {
            onSubmit(values);
          },
        },
      });
    }
  };

  return (
    <div className='mx-4 w-full'>
      <div className='flex items-center justify-center gap-2'>
        <h1 className='text-2xl font-semibold whitespace-nowrap'>Contact Me</h1>
        <div className='h-0.5 flex-1 bg-primary' />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto mt-4 w-full space-y-6 rounded-md p-4'>
          <div className='flex w-full flex-col items-stretch gap-6 md:flex-row md:items-start md:gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full md:w-1/3'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='John Doe'
                      {...field}
                      className='rounded-none border-0 border-b border-primary bg-transparent focus-visible:ring-0 dark:bg-transparent'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full md:w-2/3'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='john@example.com'
                      {...field}
                      className='rounded-none border-0 border-b border-primary bg-transparent focus-visible:ring-0 dark:bg-transparent'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='subject'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Subject of your message'
                    {...field}
                    className='rounded-none border-0 border-b border-primary bg-transparent focus-visible:ring-0 dark:bg-transparent'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Your message...'
                    {...field}
                    className='min-h-30 rounded-none border-0 border-b border-primary bg-transparent focus-visible:ring-0 dark:bg-transparent'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex w-full items-center justify-end gap-2'>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <LoaderCircle className='animate-spin' /> : 'Submit'}
            </Button>
            <Button
              variant={'ghost'}
              size={'icon'}
              type='button'
              onClick={() => form.reset()}
              aria-label='Reset contact form'
              className='cursor-pointer'>
              <RefreshCw />
            </Button>
          </div>
        </form>
      </Form>
      <p className='p-2 text-center text-sm text-muted-foreground'>
        This contact form will send an email to me.
      </p>
    </div>
  );
}
