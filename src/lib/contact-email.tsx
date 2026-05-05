import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip: string;
}

const tailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        background: '#141414',
        surface: '#1b1b1b',
        inset: '#202020',
        border: '#2c2c2c',
        muted: '#c9c9c9',
        subtle: '#8f8f8f',
        strong: '#f5f5f5',
        label: '#dedede',
      },
      fontFamily: {
        sans: ['Bricolage Grotesque', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
  timestamp,
  ip,
}: ContactEmailProps) => (
  <Html lang='en'>
    <Head />
    <Preview>{subject} from {name}</Preview>
    <Tailwind config={tailwindConfig}>
      <Body className='bg-background m-0 px-0 py-5 font-sans'>
        <Container className='border-border bg-surface mx-auto max-w-150 rounded-[10px] border px-6 py-6 shadow-none'>
          <Section className='mb-6'>
            <Text className='text-subtle m-0 mb-3 text-[12px] leading-4.5'>kyzel.dev</Text>
            <div className='mb-4 flex items-center gap-3'>
              <Img src='https://www.kyzel.dev/icon.png' alt='Kyzel logo' width='44' height='44' />
              <div>
                <Text className='text-strong m-0 text-[22px] leading-7 font-semibold'>
                  New message
                </Text>
                <Text className='text-muted m-0 text-[14px] leading-5.5'>
                  Someone reached out through your portfolio.
                </Text>
              </div>
            </div>
          </Section>

          <Section className='border-border mb-5 border-b border-solid pb-5'>
            <Text className='text-subtle m-0 mb-1 text-[12px] leading-4.5'>From</Text>
            <Text className='text-label m-0 text-[15px] leading-6 font-medium'>
              {name} <span className='text-muted font-normal'>&lt;{email}&gt;</span>
            </Text>
          </Section>

          <Section className='mb-5'>
            <Text className='text-subtle m-0 mb-2 text-[12px] leading-4.5'>Subject</Text>
            <Text className='text-strong m-0 text-[18px] leading-6 font-semibold'>{subject}</Text>
          </Section>

          <Section className='bg-inset border-border mb-5 rounded-[8px] border px-4 py-4'>
            <Text className='text-subtle m-0 mb-2 text-[12px] leading-4.5'>Message</Text>
            <Text className='text-muted m-0 text-[15px] leading-6 whitespace-pre-wrap'>
              {message}
            </Text>
          </Section>

          <Section className='border-border mt-6 border-t border-solid pt-3'>
            <Text className='text-subtle m-0 mb-1 text-[12px] leading-4.5'>
              Received {timestamp}
            </Text>
            <Text className='text-subtle m-0 text-[12px] leading-4.5'>IP {ip}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactEmail;
