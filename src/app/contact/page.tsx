import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Easli team.',
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

function ContactSection() {
  return (
    <Container className="py-24">
      <ContactForm />
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
      <ContactSection />
      <Footer />
    </main>
  )
}
