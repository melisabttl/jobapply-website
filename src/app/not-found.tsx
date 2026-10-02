import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh flex-col items-center justify-center p-6 text-center lg:p-8">
        <Link href="/" title="Home">
          <img src="/brand/easli-symbol.svg" alt="Easli" className="h-9 w-auto" />
        </Link>
        <p className="mt-8 font-mono text-sm/6 font-semibold text-gray-500">
          404
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 sm:text-4xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-md text-base text-gray-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have
          moved.
        </p>
        <div className="mt-8 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
          <Button href="/">Back to Easli</Button>
          <Button variant="secondary" href="/pricing">
            View pricing
          </Button>
        </div>
      </div>
    </main>
  )
}
