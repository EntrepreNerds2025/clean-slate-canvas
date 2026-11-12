import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  submittedAt?: string
}

const Email = ({ name, email, phone, subject, message, submittedAt }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New website inquiry from {name || 'a website visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New website inquiry</Heading>
        <Text style={intro}>A visitor submitted the contact form on Pastor Q Website.</Text>
        <Section style={details}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || 'Not provided'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || 'Not provided'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || 'Not provided'}</Text>
          <Text style={label}>Subject</Text>
          <Text style={value}>{subject || 'General inquiry'}</Text>
          <Text style={label}>Message</Text>
          <Text style={messageText}>{message || 'No message provided.'}</Text>
        </Section>
        <Hr style={divider} />
        <Text style={footer}>Received {submittedAt || 'through the website contact form'}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => `New website inquiry: ${data.subject || 'General inquiry'}`,
  displayName: 'Contact form owner notification',
  previewData: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(416) 555-0123',
    subject: 'Wedding officiant inquiry',
    message: 'Hello Pastor Q, we would love to discuss our upcoming wedding ceremony.',
    submittedAt: 'November 12, 2026',
  },
  to: 'pastorq@torontoic.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto', padding: '32px 25px' }
const heading = { color: '#0d0d0d', fontSize: '26px', lineHeight: '34px', margin: '0 0 12px' }
const intro = { color: '#444444', fontSize: '15px', lineHeight: '24px', margin: '0 0 24px' }
const details = { padding: '20px', backgroundColor: '#f7f5f1', borderRadius: '6px' }
const label = { color: '#6b6258', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' as const, margin: '12px 0 2px' }
const value = { color: '#0d0d0d', fontSize: '15px', lineHeight: '22px', margin: '0 0 8px' }
const messageText = { ...value, whiteSpace: 'pre-wrap' as const }
const divider = { borderColor: '#e5e0d8', margin: '24px 0' }
const footer = { color: '#6b6258', fontSize: '12px', lineHeight: '18px' }
