// Shared pricing configuration — the single source of truth for plan data,
// so the pricing page and any future checkout step never duplicate or drift
// from each other.
//
// This must match what is actually for sale in Paddle Live. Today that is a
// single price: Easli Pro, $19 USD billed monthly. Don't add plans or billing
// periods here until they exist in Paddle.

// The price carries regularPrice / discountedPrice / discountLabel so a future
// promotion can be displayed (discountedPrice struck-through against
// regularPrice, discountLabel shown as a badge) without restructuring this
// data or the card UI. No promotion is active today, so discountedPrice/
// discountLabel stay null.
export type PlanPrice = {
  regularPrice: number
  discountedPrice: number | null
  discountLabel: string | null
}

export const plan = {
  name: 'Easli Pro',
  slug: 'pro',
  description: 'Everything you need to prepare strong applications, faster.',
  price: {
    regularPrice: 19,
    discountedPrice: null,
    discountLabel: null,
  } satisfies PlanPrice,
  highlights: [
    { description: 'Relevant job discovery' },
    { description: 'Job evaluation against your Career Profile' },
    { description: 'Tailored CV for each role' },
    { description: 'Personalized cover letters' },
    { description: 'Application tracking' },
  ],
  features: [
    { section: 'Discovery', name: 'Relevant job discovery' },
    { section: 'Discovery', name: 'Job evaluation against your Career Profile' },
    { section: 'Discovery', name: 'Eligibility checks' },
    { section: 'Application materials', name: 'Tailored CV for each role' },
    { section: 'Application materials', name: 'Personalized cover letters' },
    { section: 'Application materials', name: 'Application preparation for supported forms' },
    { section: 'Organization', name: 'Career Profile' },
    { section: 'Organization', name: 'Application tracking' },
  ],
}

export type Plan = typeof plan

export function planPrice(p: Plan = plan) {
  return {
    amount: p.price.discountedPrice ?? p.price.regularPrice,
    suffix: 'per month',
  }
}
