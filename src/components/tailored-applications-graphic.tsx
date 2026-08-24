'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <path d="M13.7 3.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6 9.6l6.3-6.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  )
}

// Temporary placeholder avatar β€” easy to swap for a real photo/mark later.
function Avatar() {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 sm:size-14 sm:bg-linear-145">
      MB
    </span>
  )
}

function AutoAppliedPill({ active }: { active: boolean }) {
  return (
    <motion.span
      animate={
        active
          ? { scale: [1, 1.05, 1], opacity: [1, 0.85, 1] }
          : { scale: 1, opacity: 1 }
      }
      transition={{
        duration: 1.8,
        repeat: active ? Infinity : 0,
        repeatDelay: 4,
        ease: 'easeInOut',
      }}
      className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-emerald-700"
    >
      <CheckIcon className="size-3 fill-emerald-700" />
      Auto applied
    </motion.span>
  )
}

function HighlightedPhrase({
  active,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) {
  return (
    <motion.span
      animate={active ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
      transition={{
        duration: 1.6,
        repeat: active ? Infinity : 0,
        repeatDelay: 4.5,
        ease: 'easeInOut',
      }}
      className="font-semibold text-gray-700"
    >
      {children}
    </motion.span>
  )
}

export function TailoredApplicationsGraphic() {
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const active = !paused && !reducedMotion

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex size-full flex-col overflow-hidden bg-white"
    >
      {/* Warm gradient wash confined to the header, fading to white before
          the divider β€” same treatment as Radiant's own gradient, just
          restricted to this region instead of a full hero-strength wash. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* Candidate identity β€” proportions measured from Radiant's original
          profile-header screenshot (avatar ~56px, ~40px/32px left/top
          padding, ~24px gap to name). */}
      <div className="relative z-10 flex items-start justify-between gap-3 px-6 pt-6 sm:px-10 sm:pt-7">
        <div className="flex items-center gap-4 sm:gap-6">
          <Avatar />
          <div>
            <p className="text-lg font-semibold text-gray-950 sm:text-xl">
              Melisa Battal
            </p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Product Manager
            </p>
          </div>
        </div>
        <AutoAppliedPill active={active} />
      </div>

      {/* Divider sits at roughly the same vertical position as Radiant's
          original tab-row divider. */}
      <div className="relative z-10 mx-6 mt-5 border-t border-gray-100 sm:mx-10 sm:mt-7" />

      {/* Tailored Resume + Tailored Cover Letter on one clean surface β€”
          no nested card frame, just a subtle divide-x between columns.
          Headings are the strong element here; body copy stays lighter
          and more spaced out so it reads as calm, real preview content
          rather than competing with the headings. */}
      <div className="relative z-10 grid flex-1 grid-cols-1 gap-5 px-6 pt-4 pb-5 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-gray-100 sm:px-10 sm:pt-5 sm:pb-6">
        <div className="flex flex-col sm:pr-7">
          <span className="text-sm font-bold text-gray-950 sm:text-base">
            Tailored Resume
          </span>
          <div className="mt-2.5 flex flex-col text-[10px] leading-snug text-gray-400 sm:mt-3 sm:text-[11px]">
            <p className="font-medium text-gray-600">Melisa Battal</p>
            <p>Product Manager</p>
            <div className="mt-2.5 flex flex-col gap-0.5">
              <p className="font-semibold text-gray-500">Experience</p>
              <p>Northstar β€” Associate Product Manager</p>
              <p>Brightpath β€” Product Operations Intern</p>
            </div>
            <div className="mt-2.5 hidden flex-col gap-0.5 sm:flex">
              <p className="font-semibold text-gray-500">Project</p>
              <p>Workflow Hub</p>
            </div>
            <div className="mt-2.5 hidden flex-col gap-0.5 sm:flex">
              <p className="font-semibold text-gray-500">Skills</p>
              <p>User research Β· Roadmapping Β· SaaS</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:pl-7">
          <span className="text-sm font-bold text-gray-950 sm:text-base">
            Tailored Cover Letter
          </span>
          <div className="mt-2.5 flex flex-col gap-2 text-[10px] leading-relaxed text-gray-400 sm:mt-3 sm:text-[11px]">
            <p>Dear Hiring Team,</p>
            <p>
              I&rsquo;m excited to apply for this Product Manager role. My
              background in SaaS products,{' '}
              <HighlightedPhrase active={active}>
                user research
              </HighlightedPhrase>
              , and cross-functional collaboration makes me a strong fit for
              the role.
            </p>
            <p className="hidden sm:block">
              I&rsquo;d welcome the opportunity to contribute and discuss the
              position further.
            </p>
            <p className="text-gray-600">Melisa Battal</p>
          </div>
        </div>
      </div>
    </div>
  )
}
