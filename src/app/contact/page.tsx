import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { Field, Input, Label, Textarea } from '@headlessui/react'
import { clsx } from 'clsx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Easli team.',
}

const inputStyles = clsx(
  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
)

// CONTACT FORM BACKEND NOT YET CONNECTED. There is no email/form service
// wired in yet, so this is a no-op Server Action rather than a form that
// silently pretends to send — it accepts the submission and does nothing
// until a real backend (email service, ticketing system, etc.) exists.
async function sendMessage(_formData: FormData) {
  'use server'
}

function Header() {
  return (
    <Container className="mt-16">
      <Subheading>Contact</Subheading>
      <Heading as="h1" className="mt-2">
        Get in touch.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Questions about Easli, your account, or a plan? Send us a message.
      </Lead>
    </Container>
  )
}

function ContactForm() {
  return (
    <Container className="py-24">
      <form
        action={sendMessage}
        className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md ring-1 ring-black/5 sm:p-11"
      >
        <Field className="space-y-3">
          <Label className="text-sm/5 font-medium">Name</Label>
          <Input
            required
            type="text"
            name="name"
            autoComplete="name"
            className={inputStyles}
          />
        </Field>
        <Field className="mt-8 space-y-3">
          <Label className="text-sm/5 font-medium">Email</Label>
          <Input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={inputStyles}
          />
        </Field>
        <Field className="mt-8 space-y-3">
          <Label className="text-sm/5 font-medium">Message</Label>
          <Textarea required name="message" rows={5} className={inputStyles} />
        </Field>
        <div className="mt-8">
          <Button type="submit" className="w-full sm:w-auto">
            Send message
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <ContactForm />
      <Footer />
    </main>
  )
}
