import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { EASLI_APP_REGISTER_URL } from '@/lib/auth'
import { plan, planPrice } from '@/lib/pricing'
import { CheckIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Easli Pro is $19/month. Find relevant jobs, tailor your CV for each role, and generate personalized cover letters — then review and submit each application yourself.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Subheading>Pricing</Subheading>
      <Heading as="h1" className="mt-2">
        One plan. Everything included.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Easli finds relevant roles, evaluates them against your Career Profile,
        and prepares a tailored CV and cover letter for each one. You review
        everything and submit the final application yourself.
      </Lead>
    </Container>
  )
}

function PricingCards() {
  return (
    <div className="py-24">
      <Container>
        <Gradient className="overflow-hidden rounded-4xl p-4 ring-1 ring-black/5 ring-inset md:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <PricingCard />
            <IncludedCard />
          </div>
        </Gradient>
      </Container>
    </div>
  )
}

function CardFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          {children}
        </div>
      </div>
    </div>
  )
}

function PricingCard() {
  const { amount, suffix } = planPrice()

  return (
    <CardFrame>
      <Subheading>{plan.name}</Subheading>
      <p className="mt-2 text-sm/6 text-gray-950/75">{plan.description}</p>
      <div className="mt-8 flex items-center gap-4">
        <div className="text-5xl font-medium text-gray-950">${amount}</div>
        <div className="text-sm/5 text-gray-950/75">
          <p>USD</p>
          <p>{suffix}</p>
        </div>
      </div>
      <div className="mt-8">
        <Button href={EASLI_APP_REGISTER_URL}>Get started</Button>
      </div>
      <div className="mt-8">
        <h3 className="text-sm/6 font-medium text-gray-950">
          What&rsquo;s included:
        </h3>
        <ul className="mt-3 space-y-3">
          {plan.highlights.map((props, featureIndex) => (
            <FeatureItem key={featureIndex} {...props} />
          ))}
        </ul>
      </div>
    </CardFrame>
  )
}

function IncludedCard() {
  const sections = [...new Set(plan.features.map(({ section }) => section))]

  return (
    <CardFrame>
      <Subheading>Everything in {plan.name}</Subheading>
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <div key={section}>
            <h3 className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold text-gray-950">
              {section}
            </h3>
            <ul className="mt-2">
              {plan.features
                .filter((feature) => feature.section === section)
                .map(({ name }) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 border-b border-gray-100 py-3 text-sm/6 text-gray-600 last:border-none"
                  >
                    <CheckIcon className="size-4 shrink-0 fill-green-600" />
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm/6 text-gray-500">
        Easli prepares your application. You review it and submit it to the
        employer yourself.
      </p>
    </CardFrame>
  )
}

function FeatureItem({
  description,
  disabled = false,
}: {
  description: string
  disabled?: boolean
}) {
  return (
    <li
      data-disabled={disabled ? true : undefined}
      className="flex items-start gap-4 text-sm/6 text-gray-950/75 data-disabled:text-gray-950/25"
    >
      <span className="inline-flex h-6 items-center">
        <PlusIcon className="size-3.75 shrink-0 fill-gray-950/25" />
      </span>
      {disabled && <span className="sr-only">Not included:</span>}
      {description}
    </li>
  )
}

function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" {...props}>
      <path clipRule="evenodd" d="M8 0H7v7H0v1h7v7h1V8h7V7H8V0z" />
    </svg>
  )
}

function FrequentlyAskedQuestions() {
  return (
    <Container>
      <section id="faqs" className="scroll-mt-8">
        <Subheading className="text-center">
          Frequently asked questions
        </Subheading>
        <Heading as="div" className="mt-2 text-center">
          Your questions answered.
        </Heading>
        <div className="mx-auto mt-16 mb-32 max-w-xl space-y-12">
          <dl>
            <dt className="text-sm font-semibold">
              Does Easli submit applications for me?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              No. Easli finds relevant roles, prepares a tailored CV and cover
              letter for each one, and fills in supported application forms.
              You review everything and submit the final application to the
              employer yourself.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Does Easli send the same resume everywhere?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              No. Easli uses your Career Profile and the requirements of each
              role to tailor your CV using your real experience.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Are cover letters included?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Yes. Personalized cover letters are included in Easli Pro rather
              than sold as a separate add-on.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Does Easli recommend every job it finds?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              No. Jobs are checked against your preferences, background, and
              eligibility before they are recommended to you.
            </dd>
          </dl>
        </div>
      </section>
    </Container>
  )
}

export default function Pricing() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <PricingCards />
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  )
}
