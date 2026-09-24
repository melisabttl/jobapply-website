'use server'

import {
  CONTACT_CATEGORIES,
  CONTACT_HONEYPOT_FIELD,
  type ContactCategory,
  type ContactField,
  type ContactState,
} from '@/lib/contact'

// Contact form → Resend → the configured support inbox.
//
// Required server-side environment variables (never NEXT_PUBLIC_, never
// hardcoded here):
//   RESEND_API_KEY      Resend API key with sending access
//   CONTACT_TO_EMAIL    inbox that receives contact messages
//   CONTACT_FROM_EMAIL  sender on a domain verified in Resend,
//                       e.g. "Easli <…@your-verified-domain>"
//
// If any of them is missing, the action reports a failure to the visitor
// instead of pretending the message was sent. Nothing here issues refunds
// or changes billing — a refund request is just routed to the inbox.

const LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 5000,
}

// Deliberately simple: one @, no whitespace, a dot in the domain. Stricter
// checks reject real addresses; the reply-to is what proves it works.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readField(formData: FormData, key: ContactField) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: the field is hidden from people and assistive tech, so any
  // value means an automated submission. Reply as if it worked so the bot
  // gets no signal, but never send anything.
  const honeypot = formData.get(CONTACT_HONEYPOT_FIELD)
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return { status: 'success' }
  }

  const values = {
    name: readField(formData, 'name'),
    email: readField(formData, 'email'),
    category: readField(formData, 'category'),
    message: readField(formData, 'message'),
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {}
  if (!values.name) fieldErrors.name = 'Please enter your name.'
  else if (values.name.length > LIMITS.name)
    fieldErrors.name = `Please keep your name under ${LIMITS.name} characters.`

  if (!values.email) fieldErrors.email = 'Please enter your email address.'
  else if (
    values.email.length > LIMITS.email ||
    !EMAIL_PATTERN.test(values.email)
  )
    fieldErrors.email = 'Please enter a valid email address.'

  if (!CONTACT_CATEGORIES.includes(values.category as ContactCategory))
    fieldErrors.category = 'Please choose a topic.'

  if (values.message.length < LIMITS.messageMin)
    fieldErrors.message = `Please write at least ${LIMITS.messageMin} characters.`
  else if (values.message.length > LIMITS.messageMax)
    fieldErrors.message = `Please keep your message under ${LIMITS.messageMax} characters.`

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors,
      values,
    }
  }

  const failure: ContactState = {
    status: 'error',
    message:
      'We couldn’t send your message. Please try again in a few minutes.',
    values,
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error(
      '[contact] Email is not configured. Missing:',
      [
        !apiKey && 'RESEND_API_KEY',
        !to && 'CONTACT_TO_EMAIL',
        !from && 'CONTACT_FROM_EMAIL',
      ]
        .filter(Boolean)
        .join(', '),
    )
    return failure
  }

  // Keep user input out of header-like fields: no line breaks in the subject.
  const safeName = values.name.replace(/[\r\n]+/g, ' ')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `[Easli contact] ${values.category} — ${safeName}`,
        text: [
          `Category: ${values.category}`,
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          '',
          values.message,
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    })

    // Success only once Resend has accepted the message and returned an id.
    const data = (await res.json().catch(() => null)) as {
      id?: string
      name?: string
    } | null
    if (!res.ok || !data?.id) {
      console.error('[contact] Resend rejected the message:', res.status, data?.name)
      return failure
    }
  } catch (error) {
    console.error(
      '[contact] Resend request failed:',
      error instanceof Error ? error.name : 'unknown',
    )
    return failure
  }

  return { status: 'success' }
}
