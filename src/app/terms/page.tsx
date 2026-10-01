import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

// Conservative baseline policy text. It needs professional legal review before
// launch. No legal entity, address, or registration details are stated here
// because none have been provided — add them only once confirmed.

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of Easli.',
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

export default function Terms() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16">
        <Heading as="h1">Terms of Service</Heading>
        <Lead className="mt-6 max-w-3xl">
          These Terms of Service govern your use of Easli, including our website
          and product.
        </Lead>
        <p className="mt-4 text-sm/6 text-gray-500">
          Last updated: September 2026
        </p>
        <div className="mx-auto mt-16 mb-32 max-w-2xl">
          <Section title="Using Easli">
            <p>
              Easli helps you build a Career Profile, find relevant roles, and
              prepare applications. To use Easli, you must be old enough to form
              a binding contract where you live.
            </p>
          </Section>
          <Section title="Your account">
            <p>
              You are responsible for the accuracy of the information you
              provide, for keeping your account credentials confidential, and
              for all activity under your account.
            </p>
          </Section>
          <Section title="Your content">
            <p>
              You keep ownership of the CVs, documents, and other information
              you add to Easli. You give us permission to use that content only
              as needed to provide the service to you. You confirm that you have
              the right to share it with us.
            </p>
          </Section>
          <Section title="Application materials">
            <p>
              Easli prepares application materials, such as tailored CVs and
              cover letters, and can fill in supported application forms for
              your review. Easli does not perform the final submission of an
              application to an employer. You review and submit your
              applications yourself, and you are responsible for checking
              everything before you submit it.
            </p>
            <p>
              Prepared materials are generated from the information you provide
              and may contain mistakes. Check that everything is accurate and
              truthful before you use it.
            </p>
          </Section>
          <Section title="Job listings and third-party sites">
            <p>
              Job listings come from third-party sources. We do not guarantee
              that a listing is accurate or still open, and we do not guarantee
              interviews, job offers, or any other outcome. Your use of an
              employer&rsquo;s or job platform&rsquo;s site is governed by that
              site&rsquo;s own terms.
            </p>
          </Section>
          <Section title="Acceptable use">
            <p>
              Do not use Easli to break the law, to misrepresent your identity
              or experience, to interfere with the service or other users, or to
              access Easli in ways we have not made available.
            </p>
          </Section>
          <Section title="Plans and billing">
            <p>
              Easli Pro is a subscription billed monthly in advance. It renews
              automatically each month until you cancel. You can cancel at any
              time to stop future renewal charges. Payments are processed by
              Paddle, our Merchant of Record, and applicable taxes may be added
              at checkout.
            </p>
            <p>
              Current pricing is available on our{' '}
              <Link href="/pricing" className="font-medium hover:text-gray-600">
                pricing page
              </Link>
              , and refunds are covered by our{' '}
              <a href="/refund" className="font-medium hover:text-gray-600">
                refund policy
              </a>
              .
            </p>
          </Section>
          <Section title="Changes and termination">
            <p>
              We may change or discontinue parts of Easli, and we may update
              these terms. When we update them, we will change the &ldquo;Last
              updated&rdquo; date above. We may suspend or close accounts that
              break these terms. You can stop using Easli at any time.
            </p>
          </Section>
          <Section title="Disclaimers and liability">
            <p>
              To the extent permitted by law, Easli is provided &ldquo;as
              is&rdquo; without warranties of any kind, and we are not liable
              for indirect or consequential losses arising from your use of the
              service. Nothing in these terms limits rights you have under
              applicable consumer protection law.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Questions about these terms can be sent through our{' '}
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
