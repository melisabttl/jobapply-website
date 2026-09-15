import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import {
  type BillingPeriod,
  resolveBilling,
  resolvePlan,
  signupHref,
  tiers,
} from '@/lib/pricing'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  MinusIcon,
} from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Choose how much of your job search runs on autopilot. Every Easli plan builds your Career Profile, finds relevant roles, and tailors every application.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Subheading>Pricing</Subheading>
      <Heading as="h1" className="mt-2">
        Choose your level of autopilot.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Choose the application volume that fits your job search.
      </Lead>
    </Container>
  )
}

function BillingToggle({
  billing,
  tier,
}: {
  billing: BillingPeriod
  tier: (typeof tiers)[number]
}) {
  return (
    <div className="mb-10 flex justify-center">
      <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1">
        <Link
          scroll={false}
          href={`/pricing?billing=monthly&tier=${tier.slug}`}
          data-active={billing === 'monthly' ? true : undefined}
          className="rounded-full px-4 py-1.5 text-sm/6 font-medium text-gray-600 data-active:bg-white data-active:text-gray-950 data-active:shadow-sm"
        >
          Monthly
        </Link>
        <Link
          scroll={false}
          href={`/pricing?billing=threeMonth&tier=${tier.slug}`}
          data-active={billing === 'threeMonth' ? true : undefined}
          className="rounded-full px-4 py-1.5 text-sm/6 font-medium text-gray-600 data-active:bg-white data-active:text-gray-950 data-active:shadow-sm"
        >
          3 months · Save 20%
        </Link>
      </div>
    </div>
  )
}

function PricingCards({
  billing,
  selectedTier,
}: {
  billing: BillingPeriod
  selectedTier: (typeof tiers)[number]
}) {
  return (
    <div className="py-24">
      <Container>
        <BillingToggle billing={billing} tier={selectedTier} />
        <Gradient className="overflow-hidden rounded-4xl p-4 ring-1 ring-black/5 ring-inset md:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {tiers.map((tier, tierIndex) => (
              <PricingCard key={tierIndex} tier={tier} billing={billing} />
            ))}
          </div>
        </Gradient>
      </Container>
    </div>
  )
}

function PricingCard({
  tier,
  billing,
}: {
  tier: (typeof tiers)[number]
  billing: BillingPeriod
}) {
  const price = tier.pricing[billing]
  const amount = price.discountedPrice ?? price.regularPrice
  const suffix = billing === 'monthly' ? 'per month' : 'total for 3 months'

  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <Subheading>{tier.name}</Subheading>
          <p className="mt-2 text-sm/6 text-gray-950/75">{tier.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="text-5xl font-medium text-gray-950">
              ${amount}
            </div>
            <div className="text-sm/5 text-gray-950/75">
              <p>USD</p>
              <p>{suffix}</p>
            </div>
          </div>
          <div className="mt-8">
            <Button href={signupHref(tier, billing)}>Start applying</Button>
          </div>
          <div className="mt-8">
            <h3 className="text-sm/6 font-medium text-gray-950">
              What&rsquo;s included:
            </h3>
            <ul className="mt-3 space-y-3">
              {tier.highlights.map((props, featureIndex) => (
                <FeatureItem key={featureIndex} {...props} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingTable({
  selectedTier,
  billing,
}: {
  selectedTier: (typeof tiers)[number]
  billing: BillingPeriod
}) {
  return (
    <Container className="py-24">
      <table className="w-full text-left">
        <caption className="sr-only">Pricing plan comparison</caption>
        <colgroup>
          <col className="w-3/5 sm:w-2/5" />
          <col
            data-selected={selectedTier === tiers[0] ? true : undefined}
            className="w-2/5 data-selected:table-column max-sm:hidden sm:w-1/5"
          />
          <col
            data-selected={selectedTier === tiers[1] ? true : undefined}
            className="w-2/5 data-selected:table-column max-sm:hidden sm:w-1/5"
          />
          <col
            data-selected={selectedTier === tiers[2] ? true : undefined}
            className="w-2/5 data-selected:table-column max-sm:hidden sm:w-1/5"
          />
        </colgroup>
        <thead>
          <tr className="max-sm:hidden">
            <td className="p-0" />
            {tiers.map((tier) => (
              <th
                key={tier.slug}
                scope="col"
                data-selected={selectedTier === tier ? true : undefined}
                className="p-0 data-selected:table-cell max-sm:hidden"
              >
                <Subheading as="div">{tier.name}</Subheading>
              </th>
            ))}
          </tr>
          <tr className="sm:hidden">
            <td className="p-0">
              <div className="relative inline-block">
                <div>
                  <Menu>
                    <MenuButton className="flex items-center justify-between gap-2 font-medium">
                      {selectedTier.name}
                      <ChevronUpDownIcon className="size-4 fill-gray-900" />
                    </MenuButton>
                    <MenuItems
                      anchor="bottom start"
                      className="min-w-(--button-width) rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
                    >
                      {tiers.map((tier) => (
                        <MenuItem key={tier.slug}>
                          <Link
                            scroll={false}
                            href={`/pricing?tier=${tier.slug}`}
                            data-selected={
                              tier === selectedTier ? true : undefined
                            }
                            className="group flex items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-200"
                          >
                            {tier.name}
                            <CheckIcon className="hidden size-4 group-data-selected:block" />
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <ChevronUpDownIcon className="size-4 fill-gray-900" />
                </div>
              </div>
            </td>
            <td colSpan={3} className="p-0 text-right">
              <Button variant="outline" href={signupHref(selectedTier, billing)}>
                Start applying
              </Button>
            </td>
          </tr>
          <tr className="max-sm:hidden">
            <th className="p-0" scope="row">
              <span className="sr-only">Start applying</span>
            </th>
            {tiers.map((tier) => (
              <td
                key={tier.slug}
                data-selected={selectedTier === tier ? true : undefined}
                className="px-0 pt-4 pb-0 data-selected:table-cell max-sm:hidden"
              >
                <Button variant="outline" href={signupHref(tier, billing)}>
                  Start applying
                </Button>
              </td>
            ))}
          </tr>
        </thead>
        {[...new Set(tiers[0].features.map(({ section }) => section))].map(
          (section) => (
            <tbody key={section} className="group">
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="px-0 pt-10 pb-0 group-first-of-type:pt-5"
                >
                  <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
                    {section}
                  </div>
                </th>
              </tr>
              {tiers[0].features
                .filter((feature) => feature.section === section)
                .map(({ name }) => (
                  <tr
                    key={name}
                    className="border-b border-gray-100 last:border-none"
                  >
                    <th
                      scope="row"
                      className="px-0 py-4 text-sm/6 font-normal text-gray-600"
                    >
                      {name}
                    </th>
                    {tiers.map((tier) => {
                      let value = tier.features.find(
                        (feature) =>
                          feature.section === section && feature.name === name,
                      )?.value

                      return (
                        <td
                          key={tier.slug}
                          data-selected={
                            selectedTier === tier ? true : undefined
                          }
                          className="p-4 data-selected:table-cell max-sm:hidden"
                        >
                          {value === true ? (
                            <>
                              <CheckIcon className="size-4 fill-green-600" />
                              <span className="sr-only">
                                Included in {tier.name}
                              </span>
                            </>
                          ) : value === false || value === undefined ? (
                            <>
                              <MinusIcon className="size-4 fill-gray-400" />
                              <span className="sr-only">
                                Not included in {tier.name}
                              </span>
                            </>
                          ) : (
                            <div className="text-sm/6">{value}</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
            </tbody>
          ),
        )}
      </table>
    </Container>
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
              What counts as an application?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              An application is counted when Easli successfully submits an
              application to an employer on your behalf.
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
              Are cover letters included?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Yes. Tailored application materials are included rather than
              sold as separate personalization add-ons.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              What happens when I reach my application limit?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Easli pauses new automated submissions until your allowance
              becomes available again or you move to a higher plan.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Does Easli apply to every job it finds?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              No. Jobs are checked against your preferences, background, and
              eligibility before they enter the application workflow.
            </dd>
          </dl>
          <dl>
            <dt className="text-sm font-semibold">
              Do unused applications roll over?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              No. Paid-plan application allowances reset with each billing
              period.
            </dd>
          </dl>
        </div>
      </section>
    </Container>
  )
}

export default async function Pricing({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let params = await searchParams
  let tier = resolvePlan(params.tier)
  let billing = resolveBilling(params.billing)

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <PricingCards billing={billing} selectedTier={tier} />
      <PricingTable selectedTier={tier} billing={billing} />
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  )
}
