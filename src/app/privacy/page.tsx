import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Easli collects, uses, and protects your information.',
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-medium text-gray-950">{title}</h2>
      <div className="mt-3 space-y-3 text-sm/6 text-gray-600">{children}</div>
    </div>
  )
}

export default function Privacy() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16">
        <Heading as="h1">Privacy Policy</Heading>
        <Lead className="mt-6 max-w-3xl">
          This Privacy Policy explains how Easli collects, uses, and
          protects your information.
        </Lead>
        <p className="mt-4 text-sm/6 text-gray-500">
          Last updated: September 2026
        </p>
        <div className="mx-auto mt-16 mb-32 max-w-2xl">
          <Section title="Information we collect">
            <p>
              When you use Easli, we collect information you provide
              directly, such as your name, contact details, and the career
              background you add to build your Career Profile.
            </p>
          </Section>
          <Section title="How we use information">
            <p>
              We use your information to operate the Easli product: to
              find relevant roles, tailor applications, and communicate with
              you about your account and applications.
            </p>
          </Section>
          <Section title="Data sharing">
            <p>
              We do not sell your personal information. Information may be
              shared with service providers who help us operate Easli,
              under appropriate confidentiality obligations.
            </p>
          </Section>
          <Section title="Your choices">
            <p>
              You can access, update, or request deletion of your
              information by contacting us.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Questions about this policy can be sent through our{' '}
              <Link href="/contact" className="font-medium hover:text-gray-600">
                contact page
              </Link>
              .
            </p>
          </Section>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
