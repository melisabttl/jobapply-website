import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

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
          These Terms of Service govern your use of Easli, including our
          website and product.
        </Lead>
        <p className="mt-4 text-sm/6 text-gray-500">
          Last updated: September 2026
        </p>
        <div className="mx-auto mt-16 mb-32 max-w-2xl">
          <Section title="Using Easli">
            <p>
              Easli helps you build a Career Profile, find relevant
              roles, and complete applications. You are responsible for the
              accuracy of the information you provide.
            </p>
          </Section>
          <Section title="Automated applications">
            <p>
              Automation, including Auto Apply, operates according to the
              settings and permissions you choose, subject to your plan&rsquo;s
              application allowance.
            </p>
          </Section>
          <Section title="Plans and billing">
            <p>
              Paid plans are billed according to the plan and billing period
              you select at signup. Details for each plan are available on
              our{' '}
              <Link href="/pricing" className="font-medium hover:text-gray-600">
                pricing page
              </Link>
              .
            </p>
          </Section>
          <Section title="Account responsibilities">
            <p>
              You are responsible for maintaining the confidentiality of
              your account credentials and for all activity under your
              account.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Questions about these terms can be sent through our{' '}
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
