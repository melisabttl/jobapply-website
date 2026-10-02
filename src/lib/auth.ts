import type { PlanId } from '@/lib/pricing'

// Authentication is owned entirely by app.easli.co — the marketing site
// never implements its own auth, it only links out to these destinations.
export const EASLI_APP_LOGIN_URL = 'https://app.easli.co/login'
export const EASLI_APP_REGISTER_URL = 'https://app.easli.co/register'

// Carries the visitor's selected plan across to signup as a stable plan id
// only — never a price — so app.easli.co can preserve the selection through
// auth and hand it to the correct checkout/free-activation flow itself.
export function registerUrlForPlan(planId: PlanId): string {
  return `${EASLI_APP_REGISTER_URL}?plan=${planId}`
}
