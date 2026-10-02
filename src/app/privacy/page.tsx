import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

// Conservative baseline policy text. It needs professional legal review before
// launch. No legal entity, address, or registration details are stated here
// because none have been provided — add them only once confirmed.

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
          This Privacy Policy explains how Easli collects, uses, and protects
          your information.
        </Lead>
        <p className="mt-4 text-sm/6 text-gray-500">
          Last updated: September 2026
        </p>
        <div className="mx-auto mt-16 mb-32 max-w-2xl">
          <Section title="Information we collect">
            <p>
              <strong className="font-medium text-gray-950">
                Account information.
              </strong>{' '}
              Your name, email address, and sign-in details when you create an
              Easli account.
            </p>
            <p>
              <strong className="font-medium text-gray-950">
                Career information.
              </strong>{' '}
              The background you add to build your Career Profile, such as your
              CV, work history, projects, documents, links, notes, and job
              preferences, and the application materials Easli prepares from it.
            </p>
            <p>
              <strong className="font-medium text-gray-950">Messages.</strong>{' '}
              What you send us through our contact form, including your name,
              email address, and message.
            </p>
            <p>
              <strong className="font-medium text-gray-950">
                Billing information.
              </strong>{' '}
              Payments are processed by Paddle, our Merchant of Record. Paddle
              collects your payment details directly; we do not receive or store
              your full card number. We receive limited billing information,
              such as your subscription status.
            </p>
            <p>
              <strong className="font-medium text-gray-950">
                Technical information.
              </strong>{' '}
              Basic technical data needed to run and secure the service, such as
              log data about requests made to our servers.
            </p>
          </Section>
          <Section title="How we use information">
            <p>
              We use your information to operate Easli: to find relevant roles,
              evaluate them against your Career Profile, prepare tailored CVs
              and cover letters, and track your applications.
            </p>
            <p>
              We also use it to manage your account and subscription, respond to
              your messages, keep the service secure, and improve Easli.
            </p>
          </Section>
          <Section title="Data sharing">
            <p>We do not sell your personal information.</p>
            <p>
              Easli does not submit applications to employers. You review each
              application and decide what to submit when you apply for a role.
            </p>
            <p>
              We share information with service providers that help us run
              Easli, such as hosting, email delivery, payment processing, and
              the technology used to prepare application materials. They may use
              it only to provide their services to us. Paddle processes payment
              information under its own privacy notice.
            </p>
            <p>
              We may also disclose information when required by law or to
              protect the rights and safety of Easli, our users, or others.
            </p>
          </Section>
          <Section title="Cookies">
            <p>
              We use cookies and similar technologies that are needed to keep
              you signed in and to operate the service. We do not use
              advertising cookies on this website.
            </p>
          </Section>
          <Section title="Data retention">
            <p>
              We keep your information while your account is active. If you ask
              us to delete your account, we delete your information, except
              where we need to keep some of it to meet legal, tax, or billing
              obligations.
            </p>
          </Section>
          <Section title="Security">
            <p>
              We use reasonable measures to protect your information. No method
              of storing or sending data over the internet is completely secure,
              so we cannot guarantee absolute security.
            </p>
          </Section>
          <Section title="Your choices">
            <p>
              You can access, update, export, or request deletion of your
              information by contacting us. Depending on where you live, you may
              have additional rights under local data protection law.
            </p>
          </Section>
          <Section title="Children">
            <p>
              Easli is not intended for children, and we do not knowingly
              collect information from anyone under 16.
            </p>
          </Section>
          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. When we do, we will
              change the &ldquo;Last updated&rdquo; date above.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Questions about this policy can be sent through our{' '}
              <a href="/contact" className="font-medium hover:text-gray-600">
                contact page
              </a>
              .
            </p>
          </Section>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
