import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { planPrice, resolveBilling, resolvePlan } from '@/lib/pricing'
import { Field, Input, Label } from '@headlessui/react'
import { clsx } from 'clsx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account',
  description:
    'Set up your Career Profile once and let Easli handle the repetitive application work.',
}

// REAL AUTH PROVIDER NOT YET CONFIGURED. This form has nowhere real to
// submit to yet, so its action is a no-op Server Action instead of a
// non-functional href="#" or a bare POST that would 405 — it accepts the
// submission (plan/billing included) and does nothing until a real auth
// provider and checkout/onboarding flow exist.
async function createAccount(_formData: FormData) {
  'use server'
}

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let params = await searchParams
  let hasPlanSelection = typeof params.plan === 'string'
  let plan = resolvePlan(params.plan)
  let billing = resolveBilling(params.billing)
  let { amount, suffix } = planPrice(plan, billing)

  let loginQuery = new URLSearchParams()
  if (typeof params.plan === 'string') loginQuery.set('plan', params.plan)
  if (typeof params.billing === 'string')
    loginQuery.set('billing', params.billing)
  let loginHref = loginQuery.size > 0 ? `/login?${loginQuery}` : '/login'
  let changePlanHref = `/pricing?tier=${plan.slug}&billing=${billing}`

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form action={createAccount} className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <img src="/brand/easli-symbol.svg" alt="Easli" className="h-9 w-auto" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">
              Create your Easli account
            </h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Set up your Career Profile once and let Easli handle the
              repetitive application work.
            </p>

            {hasPlanSelection && (
              <div className="mt-8 rounded-lg bg-gray-50 p-4 text-sm/6 ring-1 ring-black/5">
                <p className="text-xs font-medium text-gray-500">
                  Selected plan
                </p>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-medium text-gray-950">
                    {plan.name}
                  </span>
                  <span className="text-gray-600">
                    ${amount} {suffix}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-gray-600">
                    {plan.highlights[0]?.description}
                  </span>
                  <Link
                    href={changePlanHref}
                    className="font-medium hover:text-gray-600"
                  >
                    Change plan
                  </Link>
                </div>
              </div>
            )}

            <input type="hidden" name="plan" value={plan.slug} />
            <input type="hidden" name="billing" value={billing} />

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Name</Label>
              <Input
                required
                autoFocus
                type="text"
                name="name"
                autoComplete="name"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                required
                type="email"
                name="email"
                autoComplete="email"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Password</Label>
              <Input
                required
                type="password"
                name="password"
                autoComplete="new-password"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>
            <div className="mt-8">
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </div>
          </form>
          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Already have an account?{' '}
            <Link href={loginHref} className="font-medium hover:text-gray-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
