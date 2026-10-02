'use client'

import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Future product flow (marketing UI only — nothing below is implemented):
//   high-match application
//     -> identify the appropriate recruiter / hiring contact
//     -> obtain verified contact information
//     -> generate a short personalized outreach message from candidate
//        background, the job description, and company context
//     -> send outreach
//     -> track outreach state
// This card only visualizes that flow — no recruiter discovery, contact
// enrichment, or message sending is actually implemented.

type Phase = 'default' | 'high-match' | 'recruiter-found' | 'message-ready'

const phaseLabel: Record<Phase, string> = {
  default: '',
  'high-match': 'High match',
  'recruiter-found': 'Recruiter found',
  'message-ready': '✓ Message sent',
}

// message-ready runs longer so the full staggered ring sweep (up to a
// ~2.8s delay across the outermost rings) has room to actually play.
const phases: { phase: Phase; duration: number }[] = [
  { phase: 'default', duration: 1400 },
  { phase: 'high-match', duration: 1400 },
  { phase: 'recruiter-found', duration: 1400 },
  { phase: 'message-ready', duration: 3000 },
]

// Same ring transition shape as the original Radiant LinkedAvatars rings —
// duration, repeat, and repeatDelay preserved exactly.
const pulseTransition = { duration: 0.75, repeat: Infinity, repeatDelay: 1.25 }

function Rings({ pulsing }: { pulsing: boolean }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      className={clsx(
        'col-start-1 row-start-1 size-full',
        'mask-[linear-gradient(to_bottom,black_90%,transparent),radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] mask-intersect',
      )}
    >
      {Array.from(Array(42).keys()).map((n) => (
        <motion.circle
          key={n}
          animate={
            pulsing
              ? { scale: [1, 1.08, 1], strokeOpacity: [0.15, 0.3, 0.15] }
              : { scale: 1, strokeOpacity: 0.15 }
          }
          transition={{ ...pulseTransition, delay: n * 0.05 }}
          cx="250"
          cy="250"
          r={n * 14 + 4}
          className="stroke-white"
        />
      ))}
    </svg>
  )
}

function Checkmark({ pop, label }: { pop: boolean; label: string }) {
  return (
    <div className="z-10 col-start-1 row-start-1 flex flex-col items-center justify-center gap-1.5">
      <motion.div
        animate={pop ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 0.75 }}
        className="flex size-6 items-center justify-center rounded-full bg-linear-to-t from-green-500 to-green-300 shadow-sm"
      >
        <CheckIcon className="size-4 fill-white" />
      </motion.div>
      <AnimatePresence mode="wait">
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-full bg-gray-900/80 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-gray-300 ring-1 ring-white/10"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function Photos() {
  return (
    <div className="z-10 col-start-1 row-start-1">
      <div className="mx-auto flex size-full max-w-md items-center justify-around">
        {/* Candidate — temporary placeholder, easy to swap later. */}
        <img
          alt=""
          src="/linked-avatars/customer.jpg"
          className="size-20 rounded-full bg-white/15 ring-4 ring-white/10"
        />
        {/* Recruiter / hiring contact — existing Radiant template avatar. */}
        <img
          alt=""
          src="/linked-avatars/manager.jpg"
          className="size-20 rounded-full bg-white/15 ring-4 ring-white/10"
        />
      </div>
    </div>
  )
}

export function RecruiterOutreachGraphic() {
  const indexRef = useRef(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || paused) return
    let timeoutId: ReturnType<typeof setTimeout>
    const advance = () => {
      setPhaseIndex(indexRef.current)
      timeoutId = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % phases.length
        advance()
      }, phases[indexRef.current].duration)
    }
    advance()
    return () => clearTimeout(timeoutId)
  }, [reducedMotion, paused])

  // Reduced motion settles on the calm resting state — rings, avatars, and
  // the checkmark stay visible, just without the status-label sequence.
  const phase = reducedMotion ? 'default' : phases[phaseIndex].phase
  const pulsing = !reducedMotion && phase === 'message-ready'

  return (
    <motion.div
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      variants={{
        idle: { filter: 'brightness(1)' },
        active: { filter: 'brightness(1.08)' },
      }}
      className="isolate mx-auto grid h-full grid-cols-1"
    >
      <Rings pulsing={pulsing} />
      <Photos />
      <Checkmark pop={pulsing} label={phaseLabel[phase]} />
    </motion.div>
  )
}
