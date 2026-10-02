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
  title: 'Refund Policy',
  description: 'How refunds work for Easli subscriptions.',
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

export default function Refund() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16">
        <Heading as="h1">Refund Policy</Heading>
        <Lead className="mt-6 max-w-3xl">
          This Refund Policy explains how refunds work for Easli subscriptions.
        </Lead>
        <p className="mt-4 text-sm/6 text-gray-500">
          Last updated: September 2026
        </p>
        <div className="mx-auto mt-16 mb-32 max-w-2xl">
          <Section title="Payment processing">
            <p>
              Payments for Easli are processed by Paddle.com Market Limited
              (&ldquo;Paddle&rdquo;), our reseller and Merchant of Record.
              Paddle handles billing, payment collection, and related customer
              service inquiries for your purchase.
            </p>
          </Section>
          <Section title="Your subscription">
            <p>
              Easli paid plans are billed in advance for each billing period
              and renew automatically until you cancel.
            </p>
          </Section>
          <Section title="Cancelling">
            <p>
              You can cancel at any time to stop future renewal charges. To
              cancel, use the subscription management link in your billing
              emails from Paddle, or contact us through our{' '}
              <a href="/contact" className="font-medium hover:text-gray-600">
                contact page
              </a>
              .
            </p>
          </Section>
          <Section title="Requesting a refund">
            <p>
              To request a refund, contact us through our{' '}
              <a href="/contact" className="font-medium hover:text-gray-600">
                contact page
              </a>{' '}
              and choose &ldquo;Refund request&rdquo;. Include the email address
              you used at checkout so we can find your purchase. You can also
              contact Paddle about your purchase at{' '}
              <a
                href="https://paddle.net"
                className="font-medium hover:text-gray-600"
              >
                paddle.net
              </a>
              .
            </p>
          </Section>
          <Section title="Refund eligibility">
            <p>
              Refunds are subject to Paddle&rsquo;s applicable buyer and refund
              terms, as well as any mandatory consumer protection law that
              applies to your purchase, since Paddle is the merchant of record
              for your purchase. Nothing in this policy limits rights you have
              under applicable law.
            </p>
            <p>
              Approved refunds are returned to your original payment method. How
              long they take to appear depends on your bank or card provider.
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
