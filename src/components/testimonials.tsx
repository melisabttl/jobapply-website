import { Container } from './container'
import { Heading, Subheading } from './text'

// DEVELOPMENT PLACEHOLDERS — replace with verified user testimonials before
// production launch. Names, roles, and quotes below are fictional and exist
// only to validate the "Subtle grid" layout during visual development.
// Avatars are temporarily reused from the Tailwind Plus reference
// (reference/tailwind-testimonials/subtle-grid.jsx) so the layout can be
// judged without sourcing new images — swap every avatarUrl for a real,
// user-approved photo before launch.
const testimonials = [
  {
    quote:
      'Before this, I would finish work, eat dinner, and then spend another two or three hours applying to jobs. Most nights I was just exhausted. Now I can set things up once, let applications move in the background, and use that time to actually prepare for interviews.',
    name: 'Maya Chen',
    role: 'Product Manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'I kept telling myself I would apply to more jobs after work, but by the time I got home I never had the energy to rewrite my resume and fill out another form. Having that repetitive part handled for me has made it much easier to stay consistent.',
    name: 'Daniel Brooks',
    role: 'Software Engineer',
    avatarUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'I used to have five different versions of my resume on my desktop and I was constantly wondering which one I had sent where. Now I add my experience once and each application is adapted to the role without me rebuilding everything from scratch.',
    name: 'Sofia Marin',
    role: 'UX Designer',
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'My job search was basically twenty browser tabs, a spreadsheet, LinkedIn, cover letters, and a lot of copy and paste. It felt messy all the time. Having one place that keeps the process moving has taken a lot of that stress away.',
    name: 'Marcus Lee',
    role: 'Marketing Manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'There was a point where I felt like applying for jobs had become my second job. I was spending so much time on applications that I barely had time to prepare when someone actually wanted to speak with me. Now I can focus much more on the interview side.',
    name: 'Priya Shah',
    role: 'Data Analyst',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'The part I hated most was answering the same questions over and over — work history, experience, links, cover letters, the same basic information every time. It sounds small, but not having to repeat all of that manually makes the whole process feel much lighter.',
    name: 'Emma Wilson',
    role: 'Customer Success Manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'I was nervous about using automation because I didn’t want every company receiving the exact same generic application. What I like is that the application can still change around the role while using the experience and projects I actually gave it.',
    name: 'Leo Martins',
    role: 'Product Designer',
    avatarUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'I used to keep my own spreadsheet because after a few weeks I honestly couldn’t remember where I had applied or which version of my resume I had used. Having everything organized in one place means I don’t have to manage the job search like a project anymore.',
    name: 'Nadia Hassan',
    role: 'Operations Manager',
    avatarUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    quote:
      'One Saturday I realized I had spent almost the entire afternoon applying and had barely made a dent in the roles I saved. That was the moment I knew I needed a different way to do this. I’d rather spend my weekend improving my skills or preparing for conversations than filling out forms.',
    name: 'Ethan Parker',
    role: 'Frontend Engineer',
    avatarUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export function Testimonials() {
  return (
    <div className="py-32">
      <Container>
        <Subheading>What job seekers say</Subheading>
        <Heading as="h3" className="mt-2 max-w-3xl">
          Less time applying. More time moving forward.
        </Heading>

        <div className="mt-10 flow-root sm:mt-16">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm/6 shadow-xs ring-1 ring-black/5">
                  <blockquote className="text-gray-950">
                    <p>{`“${testimonial.quote}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      alt=""
                      src={testimonial.avatarUrl}
                      className="size-10 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-950">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
