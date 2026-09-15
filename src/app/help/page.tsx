import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help',
  description: 'Answers to common questions about how Easli works.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Subheading>Help</Subheading>
      <Heading as="h1" className="mt-2">
        Your questions answered.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Common questions about how Easli finds, tailors, and submits your
        applications.
      </Lead>
    </Container>
  )
}

function HelpTopics() {
  return (
    <Container>
      <div className="mx-auto mt-16 mb-32 max-w-xl space-y-12">
        <dl>
          <dt className="text-sm font-semibold">
            How does Easli choose which jobs to apply to?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            Easli matches open roles against your Career Profile,
            preferences, and eligibility. Only roles that clear those checks
            move into the application workflow.
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">
            How are applications tailored?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            Easli builds a resume and cover letter for each role from the
            experience, projects, and evidence in your Career Profile — not a
            generic template.
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">
            What counts as an application?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            An application is counted when Easli successfully submits an
            application to an employer on your behalf.
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">Can I change my plan?</dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            Yes. You can move between plans at any time from your account.
            See{' '}
            <Link href="/pricing" className="font-medium hover:text-gray-600">
              plans and pricing
            </Link>
            .
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">
            Does Easli send the same resume everywhere?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            No. Easli uses your Career Profile and the requirements of
            each role to tailor the application using your real experience.
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">
            How do application limits work?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            Each plan includes a monthly automated application allowance.
            Easli pauses new submissions once you reach it, until your
            allowance renews or you move to a higher plan.
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">
            Where can I see my applications?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            Every application Easli submits is tracked in one place, from
            submitted to interview.
          </dd>
        </dl>
        <dl>
          <dt className="text-sm font-semibold">
            Still have a question?
          </dt>
          <dd className="mt-4 text-sm/6 text-gray-600">
            <Link href="/contact" className="font-medium hover:text-gray-600">
              Contact us
            </Link>{' '}
            and we&rsquo;ll help you out.
          </dd>
        </dl>
      </div>
    </Container>
  )
}

export default function Help() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <HelpTopics />
      <Footer />
    </main>
  )
}
