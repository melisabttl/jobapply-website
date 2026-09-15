import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Field, Input, Label } from '@headlessui/react'
import { clsx } from 'clsx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to continue to Easli.',
}

// REAL AUTH PROVIDER NOT YET CONFIGURED. This form has nowhere real to
// submit to yet, so its action is a no-op Server Action instead of a
// non-functional href="#" or a bare POST that would 405 — it accepts the
// submission and does nothing until a real auth provider is wired in.
async function signIn(_formData: FormData) {
  'use server'
}

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let params = await searchParams
  let query = new URLSearchParams()
  if (typeof params.plan === 'string') query.set('plan', params.plan)
  if (typeof params.billing === 'string') query.set('billing', params.billing)
  let signupHref = query.size > 0 ? `/signup?${query}` : '/signup'

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form action={signIn} className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <img src="/brand/easli-symbol.svg" alt="Easli" className="h-9 w-auto" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">Welcome back</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Sign in to continue to Easli.
            </p>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                required
                autoFocus
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
                autoComplete="current-password"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>
            <div className="mt-8">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Don&rsquo;t have an account?{' '}
            <Link href={signupHref} className="font-medium hover:text-gray-600">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
