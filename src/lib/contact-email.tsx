import {
  Body,
  Container,
  Font,
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
        background: '#0f0f0f',
        surface: '#181818',
        border: '#222222',
        muted: '#d4d4d4',
        subtle: '#7d7d7d',
        strong: '#ffffff',
        label: '#e5e5e5',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Helvetica', 'Arial', 'sans-serif'],
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
    <Head>
      <Font
        fontFamily='IBM Plex Sans'
        fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llzAA.ttf',
          format: 'truetype',
        }}
        fontWeight={400}
        fontStyle='normal'
      />
      <Font
        fontFamily='IBM Plex Sans'
        fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD2FlzAA.ttf',
          format: 'truetype',
        }}
        fontWeight={500}
        fontStyle='normal'
      />
      <Font
        fontFamily='IBM Plex Sans'
        fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSDNF5zAA.ttf',
          format: 'truetype',
        }}
        fontWeight={600}
        fontStyle='normal'
      />
    </Head>
    <Preview>You&apos;ve received a new message from your website</Preview>
    <Tailwind config={tailwindConfig}>
      <Body className='bg-background m-0 px-0 py-5 font-sans'>
        <Container className='border-border bg-surface mx-auto max-w-150 rounded-[10px] border px-6 py-6 shadow-none'>
          <Section className='mb-5'>
            <Img
              src='https://www.kyzel.dev/icon.png'
              alt='Logo'
              width='50'
              height='50'
              className='mb-3'
            />
            <Text className='text-strong m-0 text-[20px] leading-7 font-semibold'>
              New Contact Form Message
            </Text>
          </Section>

          <Section className='mb-4'>
            <Text className='text-label m-0 mb-1.5 text-[14px] leading-5.5'>
              Name: <span className='text-strong'>{name}</span>
            </Text>
            <Text className='text-label m-0 mb-1.5 text-[14px] leading-5.5'>
              Email: <span className='text-strong'>{email}</span>
            </Text>
            <Text className='text-label m-0 text-[14px] leading-5.5'>
              Subject: <span className='text-strong'>{subject}</span>
            </Text>
          </Section>

          <Section className='mb-4'>
            <Text className='text-label m-0 mb-1.5 text-[14px] leading-5.5'>Message:</Text>
            <Text className='text-muted m-0 text-[14px] leading-5.5 whitespace-pre-wrap'>
              {message}
            </Text>
          </Section>

          <Section className='border-border mt-6 border-t border-solid pt-3'>
            <Text className='text-subtle m-0 mb-1 text-[12px] leading-4.5'>Date: {timestamp}</Text>
            <Text className='text-subtle m-0 text-[12px] leading-4.5'>IP Address: {ip}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactEmail;
