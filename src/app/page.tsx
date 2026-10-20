import { AutoApplyFeed } from '@/components/auto-apply-feed'
import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Navbar } from '@/components/navbar'
import {
  CvGraphic,
  LetterGraphic,
  MatchGraphic,
  PipelineGraphic,
  ReviewGraphic,
  StatsGraphic,
} from '@/components/product-graphics'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Easli finds relevant roles and tailors your CV and cover letter to each one, so every application is ready for you to review and submit.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Your job applications, made easy.
          </h1>
          <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                Easli finds relevant roles and tailors your CV and cover letter
                to each one, so every application is ready for you to review and
                submit.
              </p>
              <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                <Button href="#">Start applying</Button>
                <Button variant="secondary" href="#how-it-works">
                  See how it works
                </Button>
              </div>
            </div>
            <AutoApplyFeed className="lg:-mb-8" />
          </div>
        </div>
      </Container>
    </div>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Upload your CV once',
    body: 'Tell Easli what you are looking for: roles, locations, salary. It learns your experience and your voice.',
  },
  {
    n: '02',
    title: 'We find and tailor',
    body: 'Easli finds relevant roles every day and rewrites your CV and cover letter for each one in seconds.',
  },
  {
    n: '03',
    title: 'Review and submit',
    body: 'Every application is ready and waiting. Approve it, tweak it, or switch on auto-apply and let it run.',
  },
]

function StatsStrip() {
  return (
    <Container className="mt-10">
      <dl className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        {[
          ['300+', 'applications sent every week'],
          ['3 sec', 'to tailor a CV to a role'],
          ['94%', 'average role match'],
        ].map(([n, label]) => (
          <div key={label}>
            <dt className="font-display text-5xl font-medium tracking-tight text-gray-950">
              {n}
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-600">{label}</dd>
          </div>
        ))}
      </dl>
    </Container>
  )
}

function FeatureSection() {
  return (
    <div id="how-it-works" className="scroll-mt-8 overflow-hidden">
      <Container className="pb-24">
        <Subheading>How it works</Subheading>
        <Heading as="h2" className="mt-2 max-w-3xl">
          From search to submitted in three steps.
        </Heading>
        <ol className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-lg bg-white p-10 shadow-xs ring-1 ring-black/5"
            >
              <div className="font-display text-5xl font-medium text-gray-950/20">
                {step.n}
              </div>
              <h3 className="mt-6 text-2xl/8 font-medium tracking-tight text-gray-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm/6 text-gray-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <div id="product" className="scroll-mt-8">
      <Container>
        <Subheading>Product</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Apply to more of the right jobs, with less effort.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            eyebrow="Tailored CV"
            title="A CV written for every role"
            description="Easli rewrites your CV around the keywords and skills each employer asks for, without inventing anything you have not done."
            graphic={<CvGraphic />}
            className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
          />
          <BentoCard
            eyebrow="Best jobs"
            title="Only roles worth your time"
            description="Every role is scored against your experience and goals. You see the strongest matches first and skip the noise."
            graphic={<MatchGraphic />}
            className="lg:col-span-3 lg:rounded-tr-4xl"
          />
          <BentoCard
            eyebrow="Cover letters"
            title="Letters that sound like you"
            description="A fresh, specific cover letter for each application, written in your own tone."
            graphic={<LetterGraphic />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            eyebrow="Sources"
            title="Every job board in one place"
            description="Easli searches the boards you already use and surfaces the roles that fit, all in one feed."
            graphic={<LogoCluster />}
            className="lg:col-span-2"
          />
          <BentoCard
            eyebrow="Control"
            title="You always have the final say"
            description="Review each application before it goes out, or turn on auto-apply for the roles you trust Easli with."
            graphic={<ReviewGraphic />}
            className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>After you apply</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Stay on top of every application.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Tracking"
            title="Your whole search, one board"
            description="See every application, interview and offer in a single pipeline, updated automatically as replies come in."
            graphic={<PipelineGraphic />}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Inbox"
            title="Replies land where you work"
            description="Connect your email and calendar so recruiter replies and interview invites are never missed."
            graphic={<LogoTimeline />}
            // `overflow-visible!` is needed to work around a Chrome bug that disables the mask on the graphic.
            className="z-10 overflow-visible! lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Speed"
            title="Apply while you sleep"
            description="Easli works through new roles around the clock, so you are always among the first applicants."
            graphic={<StatsGraphic />}
            className="max-lg:rounded-b-4xl lg:col-span-6 lg:rounded-b-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <StatsStrip />
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection />
      </main>
      <Testimonials />
      <Footer />
    </div>
  )
}
