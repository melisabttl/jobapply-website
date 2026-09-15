// Shared pricing configuration — the single source of truth for plan data,
// so the pricing page, signup page, and any future checkout step never
// duplicate or drift from each other.

export type BillingPeriod = 'monthly' | 'threeMonth'

// Each plan's price for a billing period carries regularPrice /
// discountedPrice / discountLabel so a future promotion can be displayed
// (discountedPrice struck-through against regularPrice, discountLabel shown
// as a badge) without restructuring this data or the card UI. No promotion
// is active today, so discountedPrice/discountLabel stay null everywhere.
export type PlanPrice = {
  billingPeriod: BillingPeriod
  regularPrice: number
  discountedPrice: number | null
  discountLabel: string | null
}

export const tiers = [
  {
    name: 'Starter' as const,
    slug: 'starter',
    description: 'Get your applications moving.',
    pricing: {
      monthly: {
        billingPeriod: 'monthly',
        regularPrice: 9,
        discountedPrice: null,
        discountLabel: null,
      },
      threeMonth: {
        billingPeriod: 'threeMonth',
        regularPrice: 22,
        discountedPrice: null,
        discountLabel: null,
      },
    } satisfies Record<BillingPeriod, PlanPrice>,
    highlights: [
      { description: '50 automated applications / month' },
      { description: 'Career Profile' },
      { description: 'Relevant job discovery' },
      { description: 'Tailored applications' },
      { description: 'Automatic form completion' },
    ],
    features: [
      { section: 'Automation', name: 'Automated applications', value: '50 / month' },
      { section: 'Automation', name: 'Automatic form completion', value: true },
      { section: 'Automation', name: 'Application questions', value: true },
      { section: 'Personalization', name: 'Career Profile', value: true },
      { section: 'Personalization', name: 'Tailored resume', value: true },
      { section: 'Personalization', name: 'Tailored cover letter', value: true },
      { section: 'Personalization', name: 'Company and role context', value: true },
      { section: 'Discovery & organization', name: 'Relevant job discovery', value: true },
      { section: 'Discovery & organization', name: 'Eligibility checks', value: true },
      { section: 'Discovery & organization', name: 'Application tracking', value: true },
      { section: 'Processing', name: 'Standard processing', value: true },
      { section: 'Processing', name: 'Priority processing', value: false },
      { section: 'Processing', name: 'Priority support', value: false },
    ],
  },
  {
    name: 'Pro' as const,
    slug: 'pro',
    description: 'Put your applications on autopilot.',
    pricing: {
      monthly: {
        billingPeriod: 'monthly',
        regularPrice: 19,
        discountedPrice: null,
        discountLabel: null,
      },
      threeMonth: {
        billingPeriod: 'threeMonth',
        regularPrice: 45,
        discountedPrice: null,
        discountLabel: null,
      },
    } satisfies Record<BillingPeriod, PlanPrice>,
    highlights: [
      { description: 'Tailored resume & cover letter' },
      { description: 'Application answers' },
      { description: 'Application tracking' },
      { description: '150 automated applications / month' },
    ],
    features: [
      { section: 'Automation', name: 'Automated applications', value: '150 / month' },
      { section: 'Automation', name: 'Automatic form completion', value: true },
      { section: 'Automation', name: 'Application questions', value: true },
      { section: 'Personalization', name: 'Career Profile', value: true },
      { section: 'Personalization', name: 'Tailored resume', value: true },
      { section: 'Personalization', name: 'Tailored cover letter', value: true },
      { section: 'Personalization', name: 'Company and role context', value: true },
      { section: 'Discovery & organization', name: 'Relevant job discovery', value: true },
      { section: 'Discovery & organization', name: 'Eligibility checks', value: true },
      { section: 'Discovery & organization', name: 'Application tracking', value: true },
      { section: 'Processing', name: 'Standard processing', value: true },
      { section: 'Processing', name: 'Priority processing', value: false },
      { section: 'Processing', name: 'Priority support', value: false },
    ],
  },
  {
    name: 'Max' as const,
    slug: 'max',
    description: 'Apply at full speed.',
    pricing: {
      monthly: {
        billingPeriod: 'monthly',
        regularPrice: 39,
        discountedPrice: null,
        discountLabel: null,
      },
      threeMonth: {
        billingPeriod: 'threeMonth',
        regularPrice: 93,
        discountedPrice: null,
        discountLabel: null,
      },
    } satisfies Record<BillingPeriod, PlanPrice>,
    highlights: [
      { description: 'Everything in Pro' },
      { description: '400 automated applications / month' },
      { description: 'Priority processing' },
      { description: 'Priority support' },
    ],
    features: [
      { section: 'Automation', name: 'Automated applications', value: '400 / month' },
      { section: 'Automation', name: 'Automatic form completion', value: true },
      { section: 'Automation', name: 'Application questions', value: true },
      { section: 'Personalization', name: 'Career Profile', value: true },
      { section: 'Personalization', name: 'Tailored resume', value: true },
      { section: 'Personalization', name: 'Tailored cover letter', value: true },
      { section: 'Personalization', name: 'Company and role context', value: true },
      { section: 'Discovery & organization', name: 'Relevant job discovery', value: true },
      { section: 'Discovery & organization', name: 'Eligibility checks', value: true },
      { section: 'Discovery & organization', name: 'Application tracking', value: true },
      { section: 'Processing', name: 'Standard processing', value: true },
      { section: 'Processing', name: 'Priority processing', value: true },
      { section: 'Processing', name: 'Priority support', value: true },
    ],
  },
]

export type Plan = (typeof tiers)[number]

const DEFAULT_PLAN = tiers[0]

// 'free' is a retired slug from before the Starter rename — old
// bookmarked/shared links may still carry it, so map it forward instead of
// letting the lookup below miss and fall through to the default plan.
const LEGACY_SLUGS: Record<string, string> = { free: 'starter' }

// Never trust the raw query param: normalize legacy slugs, then fall back to
// the default plan for anything unrecognized (unknown slug, empty, missing).
export function resolvePlan(rawSlug: string | string[] | undefined): Plan {
  const slug =
    typeof rawSlug === 'string' ? (LEGACY_SLUGS[rawSlug] ?? rawSlug) : undefined
  return tiers.find((tier) => tier.slug === slug) ?? DEFAULT_PLAN
}

export function resolveBilling(
  rawBilling: string | string[] | undefined,
): BillingPeriod {
  return rawBilling === 'threeMonth' ? 'threeMonth' : 'monthly'
}

export function planPrice(plan: Plan, billing: BillingPeriod) {
  const price = plan.pricing[billing]
  return {
    amount: price.discountedPrice ?? price.regularPrice,
    suffix: billing === 'monthly' ? 'per month' : 'total for 3 months',
  }
}
