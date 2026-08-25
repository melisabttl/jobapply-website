import { AddBackgroundGraphic } from '@/components/add-background-graphic'
import { ApplicationAnswersGraphic } from '@/components/application-answers-graphic'
import { ApplicationFormGraphic } from '@/components/application-form-graphic'
import { ApplicationsTrackerGraphic } from '@/components/applications-tracker-graphic'
import { AutoApplyGraphic } from '@/components/auto-apply-graphic'
import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { RecruiterOutreachGraphic } from '@/components/recruiter-outreach-graphic'
import { Screenshot } from '@/components/screenshot'
import { TailoredApplicationsGraphic } from '@/components/tailored-applications-graphic'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Radiant helps you sell more by revealing sensitive information about your customers.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-12 pb-24 sm:pt-20 sm:pb-32 md:pt-28 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Your job search,
            <br className="hidden sm:inline" /> on autopilot.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Set up your career profile once. JobApply finds relevant roles,
            checks fit and eligibility, tailors every application from your
            real experience, applies automatically when it&rsquo;s safe, and
            only stops when it needs you.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Start applying</Button>
            <Button variant="secondary" href="/#how-it-works">
              See how it works
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Your entire application process, in one place.
        </Heading>
        {/* TODO: placeholder Radiant screenshot — replace before launch with
            the real authenticated JobApply Home / application-overview
            screenshot. Framing/sizing below is Radiant's existing treatment,
            kept intact so the real screenshot can drop in unchanged. */}
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
          className="mt-16 h-144 sm:h-auto sm:w-304"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Your career</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        JobApply knows what you’ve actually done.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Tailored applications"
          title="A tailored application for every job."
          description="JobApply uses the background you provide to create a tailored resume and cover letter for every job it applies to."
          graphic={<TailoredApplicationsGraphic />}
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Auto apply"
          title="Apply to 200+ jobs a day."
          description="JobApply finds relevant roles, tailors your resume and cover letter, completes the application, and submits it for you — automatically."
          graphic={<AutoApplyGraphic />}
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Background"
          title="Start with anything you already have."
          description="Add your CV, portfolio, projects, documents, links, or notes. JobApply organizes the rest."
          graphic={<AddBackgroundGraphic />}
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Connected sources"
          title="Connected to where jobs are posted."
          description="JobApply pulls relevant roles from job platforms into one place, so you don’t have to search each one separately."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Discovery"
          title="Find jobs wherever you want to work."
          description="JobApply searches across the locations and remote markets you choose, then brings the relevant roles to you."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>End-to-end</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          More than clicking Apply.
        </Heading>
        <p className="mt-4 max-w-2xl text-lg/7 text-gray-400">
          JobApply doesn&rsquo;t just find jobs — it completes the real
          application work for you.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Application forms"
            title="Every field, filled for you."
            description="JobApply completes application forms using the information already stored in your Career Profile."
            graphic={<ApplicationFormGraphic />}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Application answers"
            title="Questions answered automatically."
            description="JobApply writes role-specific answers using your background, the job description, and relevant company context."
            graphic={<ApplicationAnswersGraphic />}
            className="lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Recruiter outreach"
            title="High-match roles get a personal follow-up."
            description="JobApply finds the relevant recruiter and sends a short, personalized message automatically."
            graphic={<RecruiterOutreachGraphic />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Applications"
            title="Everything you applied to, automatically tracked."
            description="Every application stays organized in one place, from submitted to interview."
            graphic={<ApplicationsTrackerGraphic />}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
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
        <Container className="mt-10 -mb-6">
          <p className="text-center text-sm/6 font-medium text-gray-500">
            Find jobs across the platforms that matter.
          </p>
          <LogoCloud className="mt-11" />
        </Container>
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
