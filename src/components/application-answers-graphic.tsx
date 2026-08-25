'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Mark } from './logo'

type QA = { question: string; answer: string }

const items: QA[] = [
  {
    question: 'Describe your B2B SaaS experience.',
    answer:
      'Led product discovery and shipped core workflows for a B2B SaaS platform used across sales and support teams.',
  },
  {
    question: 'Why do you want to work here?',
    answer:
      'Your focus on evidence-based hiring lines up directly with how I approach product decisions.',
  },
  {
    question: 'Tell us about a relevant project.',
    answer:
      'Built and launched a workflow automation tool that cut manual review time for the team.',
  },
]

const CYCLE_MS = 6000

export function ApplicationAnswersGraphic() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const intervalId = setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length)
    }, CYCLE_MS)
    return () => clearInterval(intervalId)
  }, [reducedMotion])

  const active = items[activeIndex]
  const queued = items.filter((_, i) => i !== activeIndex)

  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col items-center justify-center gap-3 px-6 sm:px-8"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-t from-white/5 to-white/25 ring-1 ring-white/10">
        <Mark className="h-3.5 fill-white" />
      </span>

      {/* `variants` here rely on BentoCard's hover propagation on purpose:
          idle state is already fully visible, hover only brightens it
          slightly — a safe use of the inherited hover state, unlike
          hiding content behind it. */}
      <motion.div
        variants={{
          idle: { filter: 'brightness(1)' },
          active: { filter: 'brightness(1.12)' },
        }}
        className="w-full max-w-72 rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-xs text-gray-400">{active.question}</p>
            <p className="mt-1.5 line-clamp-2 text-sm text-white">
              {active.answer}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="flex w-full max-w-72 flex-col gap-1.5">
        {queued.map((item) => (
          <div
            key={item.question}
            className="flex items-center gap-1.5 text-[11px] text-gray-500"
          >
            <span className="size-1 shrink-0 rounded-full bg-gray-600" />
            <span className="truncate">{item.question}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
