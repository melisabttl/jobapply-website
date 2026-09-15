import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

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
          This Refund Policy explains how refunds work for Easli
          subscriptions.
        </Lead>
        <p className="mt-4 text-sm/6 text-gray-500">
          Last updated: September 2026
        </p>
        <div className="mx-auto mt-16 mb-32 max-w-2xl">
          <Section title="Payment processing">
            <p>
              Payments for Easli are processed by Paddle.com Market Limited
              (&ldquo;Paddle&rdquo;), our reseller and Merchant of Record.
              Paddle handles billing, payment collection, and related
              customer service inquiries for your purchase.
            </p>
          </Section>
          <Section title="Requesting a refund">
            <p>
              If you would like to request a refund, please reach out
              through our{' '}
              <Link href="/contact" className="font-medium hover:text-gray-600">
                contact page
              </Link>{' '}
              and we&rsquo;ll help you with your request.
            </p>
          </Section>
          <Section title="Refund eligibility">
            <p>
              Refunds are subject to Paddle&rsquo;s applicable buyer and
              refund terms, as well as any mandatory consumer protection
              law that applies to your purchase, since Paddle is the
              merchant of record for your purchase.
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
