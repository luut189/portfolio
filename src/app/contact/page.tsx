'use client';

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

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { error: 'Name must be at least 2 characters' }),
  email: z.email({ error: 'Please enter a valid email address' }),
  subject: z.string().min(1, { error: 'Subject cannot be empty' }),
  message: z.string().min(1, { error: 'Message cannot be empty' }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      toast.success('Email sent successfully!');

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again.', {
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
        <span className='text-2xl font-semibold whitespace-nowrap'>Contact Me</span>
        <div className='bg-primary h-0.5 flex-1' />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto mt-4 w-full space-y-6 rounded-md p-4'>
          <div className='flex w-full items-center justify-between gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-1/3'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='John Doe'
                      {...field}
                      className='border-primary rounded-none border-0 border-b bg-transparent focus-visible:ring-0 dark:bg-transparent'
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
                <FormItem className='w-2/3'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='john@example.com'
                      {...field}
                      className='border-primary rounded-none border-0 border-b bg-transparent focus-visible:ring-0 dark:bg-transparent'
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
                    className='border-primary rounded-none border-0 border-b bg-transparent focus-visible:ring-0 dark:bg-transparent'
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
                    className='border-primary min-h-[120px] rounded-none border-0 border-b bg-transparent focus-visible:ring-0 dark:bg-transparent'
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
              className='cursor-pointer'>
              <RefreshCw />
            </Button>
          </div>
        </form>
      </Form>
      <p className='text-muted-foreground p-2 text-center text-sm'>
        This contact form will send an email to me.
      </p>
    </div>
  );
}
