import { AddBackgroundGraphic } from '@/components/add-background-graphic'
import { ApplicationAnswersGraphic } from '@/components/application-answers-graphic'
import { ApplicationFormGraphic } from '@/components/application-form-graphic'
import { ApplicationQueueGraphic } from '@/components/application-queue-graphic'
import { ApplicationsTrackerGraphic } from '@/components/applications-tracker-graphic'
import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { EvidenceMatchGraphic } from '@/components/evidence-match-graphic'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { HowItWorks } from '@/components/how-it-works'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { TailoredApplicationsGraphic } from '@/components/tailored-applications-graphic'
import { Heading, Subheading } from '@/components/text'
import { EASLI_APP_REGISTER_URL } from '@/lib/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Easli — Your job applications, made easy' },
  description:
    'Set up your Career Profile once. Easli finds relevant roles, tailors your CV and cover letter for each one, and helps you prepare applications faster.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar />
        <div className="pt-12 pb-24 sm:pt-20 sm:pb-32 md:pt-28 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Your job applications,
            <br className="hidden sm:inline" /> made easy.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Easli finds relevant roles and tailors your CV and cover letter to
            each one, so every application is ready for you to review and
            submit.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href={EASLI_APP_REGISTER_URL}>Start applying</Button>
            <Button variant="secondary" href="/#how-it-works">
              See how it works
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Your career</Subheading>
      <Heading as="h2" className="mt-2 max-w-3xl">
        Easli knows what you’ve actually done.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Tailored applications"
          title="A tailored application for every job."
          description="Easli uses the background you provide to create a tailored resume and cover letter for every role you choose."
          graphic={<TailoredApplicationsGraphic />}
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Review before you apply"
          title="Every application, ready for your review."
          description="Easli finds relevant roles and prepares a tailored resume and cover letter for each one. You review everything and submit the final application yourself."
          graphic={<ApplicationQueueGraphic />}
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Background"
          title="Start with anything you already have."
          description="Add your CV, portfolio, projects, documents, links, or notes. Easli organizes the rest."
          graphic={<AddBackgroundGraphic />}
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Connected sources"
          title="Connected to where jobs are posted."
          description="Easli pulls relevant roles from job platforms into one place, so you don’t have to search each one separately."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Discovery"
          title="Find jobs wherever you want to work."
          description="Easli searches across the locations and remote markets you choose, then brings the relevant roles to you."
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
          Easli doesn&rsquo;t just find jobs — it prepares the application work,
          so you can review it and apply with confidence.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Application forms"
            title="Your details, ready to go."
            description="On supported application forms, Easli fills in your details from your Career Profile. You check every field and submit the form yourself."
            graphic={<ApplicationFormGraphic />}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Application answers"
            title="Answer common questions once."
            description="Save your answers to questions employers often ask. Easli reuses them where a question matches, and you review every answer before you submit."
            graphic={<ApplicationAnswersGraphic />}
            className="lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Job matching"
            title="See how well you fit, before you apply."
            description="Easli evaluates each role against your Career Profile and shows which requirements your experience, projects, and skills cover."
            graphic={<EvidenceMatchGraphic />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Applications"
            title="Everything you applied to, in one place."
            description="Keep your job search organized, from the roles you’re preparing to the ones you’ve applied to and interviewed for."
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
          <LogoCloud />
        </Container>
        <div
          id="product"
          className="bg-linear-to-b from-white from-50% to-gray-100 py-32"
        >
          <div id="how-it-works">
            <BentoSection />
          </div>
        </div>
        <DarkBentoSection />
      </main>
      <HowItWorks />
      <Footer />
    </div>
  )
}
