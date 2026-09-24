// Shared between the contact form (client) and its server action. The server
// action re-validates everything; the client only uses this for the options.

export const CONTACT_CATEGORIES = [
  'General support',
  'Billing',
  'Refund request',
  'Account issue',
] as const

export type ContactCategory = (typeof CONTACT_CATEGORIES)[number]

export type ContactField = 'name' | 'email' | 'category' | 'message'

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<ContactField, string>>
      values?: Partial<Record<ContactField, string>>
    }

// Honeypot input name. Deliberately not a word browsers autofill (like
// "website" or "company"), so real visitors never fill it by accident.
export const CONTACT_HONEYPOT_FIELD = 'contact_hp_confirm'
