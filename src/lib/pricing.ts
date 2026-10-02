// Shared pricing configuration — the single source of truth for plan data,
// so the pricing page (cards, comparison table, and FAQ) and any future
// checkout step never duplicate or drift from each other.
//
// Each plan carries regularPrice / discountedPrice / discountLabel so a
// future promotion can be displayed (regularPrice struck-through and subdued,
// discountedPrice shown prominently, discountLabel as a badge) without
// restructuring this data or the pricing UI. No promotion is active today,
// so discountedPrice/discountLabel stay null for every plan. Free does not
// participate in discount logic — see planPrice() below.
export type PlanId = 'free' | 'starter' | 'pro' | 'max'

export type PlanFeature = {
  section: string
  name: string
  value: boolean | string
}

export type Plan = {
  id: PlanId
  name: string
  regularPrice: number
  discountedPrice: number | null
  discountLabel: string | null
  billingPeriod: 'lifetime' | 'month'
  applicationLimit: number
  applicationLimitLabel: string
  description: string
  cta: string
  highlights: { description: string }[]
  features: PlanFeature[]
}

// Highlights and features not yet differentiated by plan. The application
// allowance (see applicationLimit/applicationLimitLabel on each plan) is the
// primary difference between tiers today.
const CORE_HIGHLIGHTS = [
  { description: 'Relevant job discovery' },
  { description: 'Job evaluation against your Career Profile' },
  { description: 'Tailored CV for each role' },
  { description: 'Personalized cover letters' },
  { description: 'Application tracking' },
]

const CORE_FEATURES: Omit<PlanFeature, 'value'>[] = [
  { section: 'Discovery', name: 'Relevant job discovery' },
  { section: 'Discovery', name: 'Job evaluation against your Career Profile' },
  { section: 'Discovery', name: 'Eligibility checks' },
  { section: 'Application materials', name: 'Tailored CV for each role' },
  { section: 'Application materials', name: 'Personalized cover letters' },
  {
    section: 'Application materials',
    name: 'Application preparation for supported forms',
  },
  { section: 'Organization', name: 'Career Profile' },
  { section: 'Organization', name: 'Application tracking' },
]

function planFeatures(applicationLimitLabel: string): PlanFeature[] {
  return [
    {
      section: 'Allowance',
      name: 'Complete AI applications',
      value: applicationLimitLabel,
    },
    ...CORE_FEATURES.map((feature) => ({ ...feature, value: true })),
  ]
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    regularPrice: 0,
    discountedPrice: null,
    discountLabel: null,
    billingPeriod: 'lifetime',
    applicationLimit: 5,
    applicationLimitLabel: '5 lifetime',
    description: 'Try Easli before upgrading.',
    cta: 'Start free',
    highlights: CORE_HIGHLIGHTS,
    features: planFeatures('5 lifetime'),
  },
  {
    id: 'starter',
    name: 'Starter',
    regularPrice: 19,
    discountedPrice: null,
    discountLabel: null,
    billingPeriod: 'month',
    applicationLimit: 100,
    applicationLimitLabel: '100 / billing period',
    description: 'Build momentum in your job search.',
    cta: 'Start applying',
    highlights: CORE_HIGHLIGHTS,
    features: planFeatures('100 / billing period'),
  },
  {
    id: 'pro',
    name: 'Pro',
    regularPrice: 39,
    discountedPrice: null,
    discountLabel: null,
    billingPeriod: 'month',
    applicationLimit: 300,
    applicationLimitLabel: '300 / billing period',
    description: 'For an active job search.',
    cta: 'Start applying',
    highlights: CORE_HIGHLIGHTS,
    features: planFeatures('300 / billing period'),
  },
  {
    id: 'max',
    name: 'Max',
    regularPrice: 69,
    discountedPrice: null,
    discountLabel: null,
    billingPeriod: 'month',
    applicationLimit: 750,
    applicationLimitLabel: '750 / billing period',
    description: 'For higher-volume job searches.',
    cta: 'Start applying',
    highlights: CORE_HIGHLIGHTS,
    features: planFeatures('750 / billing period'),
  },
]

// Free never shows a discount, regardless of what's in its price fields.
export function planPrice(plan: Plan) {
  const hasDiscount = plan.id !== 'free' && plan.discountedPrice !== null

  return {
    amount: hasDiscount ? plan.discountedPrice! : plan.regularPrice,
    regularAmount: plan.regularPrice,
    hasDiscount,
    discountLabel: hasDiscount ? plan.discountLabel : null,
    billingSuffix: plan.billingPeriod === 'lifetime' ? 'one time' : 'per month',
  }
}
