'use client'

import { Button } from '@/components/button'
import {
  CONTACT_CATEGORIES,
  CONTACT_HONEYPOT_FIELD,
  type ContactField,
  type ContactState,
} from '@/lib/contact'
import { Field, Input, Label, Select, Textarea } from '@headlessui/react'
import { clsx } from 'clsx'
import { useActionState } from 'react'
import { sendContactMessage } from './actions'

const inputStyles = clsx(
  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
  'data-invalid:ring-red-500/60',
)

const cardStyles =
  'mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md ring-1 ring-black/5 sm:p-11'

function FieldError({ children }: { children?: string }) {
  if (!children) return null
  return <p className="text-sm/5 text-red-600">{children}</p>
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    { status: 'idle' },
  )

  if (state.status === 'success') {
    return (
      <div role="status" className={cardStyles}>
        <p className="text-lg/7 font-medium text-gray-950">Message sent.</p>
        <p className="mt-2 text-sm/6 text-gray-600">
          Thanks for getting in touch. We’ve received your message and will
          reply to the email address you gave us.
        </p>
      </div>
    )
  }

  const errors = state.status === 'error' ? state.fieldErrors ?? {} : {}
  const values = state.status === 'error' ? state.values ?? {} : {}
  const invalid = (field: ContactField) => Boolean(errors[field])

  return (
    // Keyed on the returned values so a failed attempt remounts the form with
    // what the visitor typed, instead of React's post-action reset clearing it.
    <form
      key={JSON.stringify(values)}
      action={formAction}
      className={cardStyles}
    >
      {/* Honeypot: off-screen rather than display:none (which many bots
          skip), removed from tab order and hidden from screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={CONTACT_HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          type="text"
          id={CONTACT_HONEYPOT_FIELD}
          name={CONTACT_HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <Field className="space-y-3">
        <Label className="text-sm/5 font-medium">Name</Label>
        <Input
          required
          type="text"
          name="name"
          autoComplete="name"
          maxLength={100}
          defaultValue={values.name}
          invalid={invalid('name')}
          className={inputStyles}
        />
        <FieldError>{errors.name}</FieldError>
      </Field>
      <Field className="mt-8 space-y-3">
        <Label className="text-sm/5 font-medium">Email</Label>
        <Input
          required
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          defaultValue={values.email}
          invalid={invalid('email')}
          className={inputStyles}
        />
        <FieldError>{errors.email}</FieldError>
      </Field>
      <Field className="mt-8 space-y-3">
        <Label className="text-sm/5 font-medium">Topic</Label>
        <Select
          required
          name="category"
          defaultValue={values.category ?? ''}
          invalid={invalid('category')}
          className={inputStyles}
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {CONTACT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <FieldError>{errors.category}</FieldError>
      </Field>
      <Field className="mt-8 space-y-3">
        <Label className="text-sm/5 font-medium">Message</Label>
        <Textarea
          required
          name="message"
          rows={5}
          minLength={10}
          maxLength={5000}
          defaultValue={values.message}
          invalid={invalid('message')}
          className={inputStyles}
        />
        <FieldError>{errors.message}</FieldError>
      </Field>
      {state.status === 'error' && (
        <p
          role="alert"
          className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm/6 text-red-700 ring-1 ring-red-600/10"
        >
          {state.message}
        </p>
      )}
      <div className="mt-8">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
