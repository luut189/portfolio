import { Html, Head, Preview, Body, Container, Section, Text } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip: string;
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
  timestamp,
  ip,
}: ContactEmailProps) => (
  <Html>
    <Head>
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
        rel='stylesheet'
      />
    </Head>
    <Preview>New message from your website</Preview>

    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.title}>New Contact Form Message</Text>
        </Section>

        <Section style={styles.section}>
          <Text style={styles.label}>
            Name: <span style={styles.value}>{name}</span>
          </Text>
          <Text style={styles.label}>
            Email: <span style={styles.value}>{email}</span>
          </Text>
          <Text style={styles.label}>
            Subject: <span style={styles.value}>{subject}</span>
          </Text>
        </Section>

        <Section style={styles.section}>
          <Text style={styles.label}>Message:</Text>
          <Text style={styles.message}>{message}</Text>
        </Section>

        <Section style={styles.footer}>
          <Text>Date: {timestamp}</Text>
          <Text>IP Address: {ip}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const styles = {
  body: {
    fontFamily: "'Inter', Helvetica, Arial, sans-serif",
    backgroundColor: '#0f0f0f',
    padding: '20px 0',
    margin: 0,
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#181818',
    padding: '24px',
    borderRadius: '10px',
    border: '1px solid #222',
    boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  section: {
    marginBottom: '16px',
  },
  label: {
    color: '#e5e5e5',
    margin: '0 0 6px 0',
    fontSize: '14px',
  },
  value: {
    color: '#ffffff',
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'underline',
  },
  message: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
    color: '#d4d4d4',
    fontSize: '14px',
  },
  footer: {
    marginTop: '24px',
    borderTop: '1px solid #2a2a2a',
    paddingTop: '12px',
    fontSize: '12px',
    color: '#7d7d7d',
  },
} as const;
