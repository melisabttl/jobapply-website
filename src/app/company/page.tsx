import { AnimatedNumber } from '@/components/animated-number'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Easli exists to make job hunting faster and fairer by tailoring every application to the role, so you can focus on the interviews.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Helping people land the job they want.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Applying for jobs shouldn’t be a second full-time job. Easli finds the
        right roles and prepares every application, so you spend your time on
        what matters: interviews.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">Our mission</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            Most people send a handful of generic applications and hope for the
            best. The ones who get hired tailor every CV and cover letter to the
            role, but that takes hours. Our mission is to give everyone that
            advantage in seconds.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            Easli only ever works from the experience you give it. It never
            invents skills or employers, and nothing is sent without your say-so
            unless you switch on auto-apply yourself. Your search, your
            decisions, far less effort.
          </p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                alt=""
                src="/company/1.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                alt=""
                src="/company/2.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <img
                alt=""
                src="/company/3.jpg"
                className="block size-full object-cover"
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <img
                alt=""
                src="/company/4.jpg"
                className="block size-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <Subheading>Easli in numbers</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Applications sent</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={200} end={300} />K
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Job seekers</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={5} end={12} />K
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
              <dt className="text-sm/6 text-gray-600">Interviews booked</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={20} end={48} />K
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">Job boards searched</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={50} end={100} />+
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}

const VALUES = [
  {
    title: 'Honest by default',
    body: 'Easli rephrases and emphasises what you have really done. It never fabricates experience, and you can review every change.',
  },
  {
    title: 'You stay in control',
    body: 'Approve each application yourself, or turn on auto-apply for the roles and match scores you trust.',
  },
  {
    title: 'Quality over volume',
    body: 'Sending more only helps if each application is good. Every one is tailored to the role it is going to.',
  },
  {
    title: 'Your data is yours',
    body: 'Your CV is used to prepare your applications and nothing else. It is never sold or shared without your approval.',
  },
]

function Values() {
  return (
    <Container className="mt-32 mb-32">
      <Subheading>What we believe</Subheading>
      <Heading as="h3" className="mt-2">
        Built around job seekers.
      </Heading>
      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
        {VALUES.map((v) => (
          <div key={v.title} className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium tracking-tight">{v.title}</h4>
            <p className="mt-2 text-sm/6 text-gray-600">{v.body}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Values />
      <Footer />
    </main>
  )
}
