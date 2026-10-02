import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { registerUrlForPlan } from '@/lib/auth'
import { plans, planPrice, type Plan, type PlanId } from '@/lib/pricing'
import { CheckIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Easli plans are built around complete AI applications: start free, then upgrade to Starter, Pro, or Max as your job search picks up.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Subheading>Pricing</Subheading>
      <Heading as="h1" className="mt-2">
        Plans for every stage of your job search.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Easli finds relevant roles, evaluates them against your Career
        Profile, and prepares a tailored CV and cover letter for each one. You
        review everything and submit the final application yourself. Every
        plan is priced around complete AI applications — how many roles Easli
        fully prepares for you.
      </Lead>
    </Container>
  )
}

// Presentation-only — not part of the pricing data model. Free has no
// "best for" line.
const BEST_FOR: Partial<Record<PlanId, string>> = {
  starter: 'A focused job search',
  pro: 'An active job search',
  max: 'A high-volume search',
}

function PricingCards() {
  return (
    <div className="py-24">
      <Container>
        <Gradient className="overflow-hidden rounded-4xl p-4 ring-1 ring-black/5 ring-inset md:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </Gradient>
      </Container>
    </div>
  )
}

function CardFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="-m-2 grid h-full grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-sm:mx-auto max-sm:w-full max-sm:max-w-md">
      <div className="grid h-full grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="h-full rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
          {children}
        </div>
      </div>
    </div>
  )
}

function PricingCard({ plan }: { plan: Plan }) {
  const price = planPrice(plan)
  const bestFor = BEST_FOR[plan.id]

  return (
    <CardFrame>
      <div className="flex h-full flex-col">
        <div>
          <Subheading>{plan.name}</Subheading>
          <p className="mt-2 text-sm/6 text-gray-950/75">
            {plan.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {price.hasDiscount && (
            <div className="text-2xl font-medium text-gray-950/40 line-through">
              ${price.regularAmount}
            </div>
          )}
          <div className="text-5xl font-medium text-gray-950">
            ${price.amount}
          </div>
          {plan.billingPeriod !== 'lifetime' && (
            <div className="text-sm/5 text-gray-950/75">
              <p>USD</p>
              <p>{price.billingSuffix}</p>
            </div>
          )}
        </div>
        {price.discountLabel && (
          <p className="mt-2 inline-flex items-center self-start rounded-full bg-gray-950/5 px-2.5 py-1 text-xs font-medium text-gray-950">
            {price.discountLabel}
          </p>
        )}

        <div className="mt-6">
          <p className="text-sm/6 font-medium text-gray-950">
            {plan.applicationLimit.toLocaleString()} complete AI applications
          </p>
          <p className="text-sm/6 text-gray-950/60">
            {plan.billingPeriod === 'lifetime'
              ? 'Lifetime'
              : 'Per billing period'}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <Button href={registerUrlForPlan(plan.id)}>{plan.cta}</Button>
          {/* Always rendered, hidden when absent, so every card reserves
              the same height and the buttons above stay aligned. */}
          <p
            className={`mt-4 text-xs/5 text-gray-950/50 ${bestFor ? '' : 'invisible'}`}
          >
            <span className="font-medium text-gray-950/70">Best for</span>{' '}
            {bestFor ?? 'placeholder'}
          </p>
        </div>
      </div>
    </CardFrame>
  )
}

// All plans share the same core feature set — the application allowance
// shown on each card above is what actually differs between them.
function IncludedFeatures() {
  const highlights = plans[0].highlights

  return (
    <Container className="pb-24">
      <Subheading className="text-center">Included in every plan</Subheading>
      <Heading as="div" className="mt-2 text-center">
        The application allowance is what changes.
      </Heading>
      <ul className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map(({ description }) => (
          <li
            key={description}
            className="flex items-center gap-3 text-sm/6 text-gray-600"
          >
            <CheckIcon className="size-4 shrink-0 fill-green-600" />
            {description}
          </li>
        ))}
      </ul>
    </Container>
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
              What counts as a complete AI application?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              It&rsquo;s a role Easli fully prepares for you: matched against
              your Career Profile, with a tailored CV and cover letter ready
              for you to review. Free includes 5 for the lifetime of your
              account. Paid plans renew your allowance every billing period.
            </dd>
          </dl>
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
              Yes. Personalized cover letters are included on every plan
              rather than sold as a separate add-on.
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
      <IncludedFeatures />
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  )
}
