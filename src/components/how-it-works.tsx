import { Container } from './container'
import { Heading, Subheading } from './text'

// Sits where the testimonials section used to be, keeping the page rhythm
// between the dark bento section and the footer. Every step here must
// describe something the product does today — no invented quotes or stats.
const steps = [
  {
    title: 'Set up your Career Profile',
    description:
      'Add your CV, projects, and the background you already have. Easli organizes it into one Career Profile.',
  },
  {
    title: 'Review relevant roles',
    description:
      'Easli finds roles that fit your preferences and evaluates each one against your Career Profile.',
  },
  {
    title: 'Prepare and submit',
    description:
      'Easli tailors your CV and cover letter for each role you choose. You review everything and submit the application yourself.',
  },
]

export function HowItWorks() {
  return (
    <div className="py-32">
      <Container>
        <Subheading>How it works</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Less busywork. More time moving forward.
        </Heading>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl bg-gray-50 p-8 text-sm/6 shadow-xs ring-1 ring-black/5"
            >
              <div className="font-mono text-xs/5 font-semibold tracking-widest text-gray-500">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="mt-4 text-lg/7 font-medium tracking-tight text-gray-950">
                {step.title}
              </p>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  )
}
