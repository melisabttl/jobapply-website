'use client'

import { CheckIcon, SparklesIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const JOBS = [
  {
    company: 'Northwind',
    role: 'Product Designer',
    match: 96,
    color: 'bg-sky-500',
  },
  {
    company: 'Lumen Labs',
    role: 'Frontend Engineer',
    match: 94,
    color: 'bg-amber-500',
  },
  {
    company: 'Vertex',
    role: 'Marketing Manager',
    match: 92,
    color: 'bg-emerald-500',
  },
  { company: 'Orbit', role: 'Data Analyst', match: 95, color: 'bg-violet-500' },
  {
    company: 'Helix',
    role: 'Customer Success Lead',
    match: 91,
    color: 'bg-rose-500',
  },
  {
    company: 'Nimbus',
    role: 'Software Engineer',
    match: 97,
    color: 'bg-indigo-500',
  },
  {
    company: 'Pulse',
    role: 'Operations Manager',
    match: 93,
    color: 'bg-teal-500',
  },
  { company: 'Acme', role: 'UX Researcher', match: 90, color: 'bg-orange-500' },
]

type Status = 'tailoring' | 'applied'
type Item = { id: number; job: (typeof JOBS)[number]; status: Status }

const VISIBLE = 4
const TICK_MS = 900
const TAILOR_MS = 350
const START_COUNT = 312

// Pre-filled so the very first frame already reads as "applied everywhere".
function initialItems(): Item[] {
  return Array.from({ length: VISIBLE }, (_, i) => ({
    id: VISIBLE - 1 - i,
    job: JOBS[(VISIBLE - 1 - i) % JOBS.length],
    status: 'applied' as const,
  }))
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'applied' ? (
        <m.span
          key="applied"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22 }}
          className="inline-flex items-center gap-1 rounded-full bg-emerald-500 py-1 pr-2.5 pl-1.5 text-xs font-semibold text-white"
        >
          <CheckIcon className="size-3.5" />
          Applied
        </m.span>
      ) : (
        <m.span
          key="tailoring"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          className="relative inline-flex items-center overflow-hidden rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-fuchsia-700"
        >
          Tailoring CV
          <m.span
            className="absolute inset-0 origin-left bg-fuchsia-500/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: TAILOR_MS / 1000, ease: 'linear' }}
          />
        </m.span>
      )}
    </AnimatePresence>
  )
}

function JobCard({ item }: { item: Item }) {
  return (
    <m.div
      layout="position"
      initial={{ opacity: 0, y: -40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 600, damping: 36 }}
      className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-lg ring-1 shadow-fuchsia-900/5 ring-black/5 backdrop-blur"
    >
      <div
        className={clsx(
          'flex size-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white',
          item.job.color,
        )}
      >
        {item.job.company[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm/5 font-semibold text-gray-950">
          {item.job.role}
        </div>
        <div className="truncate text-xs/5 text-gray-600">
          {item.job.company} · {item.job.match}% match
        </div>
      </div>
      <StatusBadge status={item.status} />
    </m.div>
  )
}

function Counter({ value }: { value: number }) {
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={value}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

function FloatingBadge({
  className,
  delay = 0,
  children,
}: {
  className?: string
  delay?: number
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -6, 0] }
      }
      transition={{
        opacity: { duration: 0.25, delay: 0.15 + delay },
        scale: {
          type: 'spring',
          stiffness: 500,
          damping: 20,
          delay: 0.15 + delay,
        },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={clsx(
        'absolute z-10 hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-xl ring-1 ring-black/5 sm:flex',
        className,
      )}
    >
      {children}
    </m.div>
  )
}

export function AutoApplyFeed({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  // Only animate while on screen, and pause in background tabs, to save CPU/battery.
  const inView = useInView(ref)
  const [tabVisible, setTabVisible] = useState(true)
  const [items, setItems] = useState<Item[]>(initialItems)
  const [count, setCount] = useState(START_COUNT)
  const nextId = useRef(VISIBLE)

  useEffect(() => {
    const onChange = () => setTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  const running = !reduceMotion && inView && tabVisible

  useEffect(() => {
    if (!running) return
    const timers = new Set<ReturnType<typeof setTimeout>>()

    const interval = setInterval(() => {
      const id = nextId.current++
      const job = JOBS[id % JOBS.length]
      setItems((prev) =>
        [{ id, job, status: 'tailoring' as const }, ...prev].slice(0, VISIBLE),
      )
      const t = setTimeout(() => {
        timers.delete(t)
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, status: 'applied' } : it)),
        )
        setCount((c) => c + 1)
      }, TAILOR_MS)
      timers.add(t)
    }, TICK_MS)

    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [running])

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        ref={ref}
        className={clsx('relative w-full max-w-md', className)}
        role="img"
        aria-label="Live feed of job applications being tailored and sent automatically"
      >
        <FloatingBadge
          className="-top-4 -left-6 bg-fuchsia-600 text-white"
          delay={0}
        >
          <SparklesIcon className="size-3.5" />
          CV tailored in 3s
        </FloatingBadge>
        <FloatingBadge
          className="bottom-16 -left-8 bg-amber-300 text-amber-950"
          delay={0.4}
        >
          ★ 96% match
        </FloatingBadge>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-3 flex items-center justify-between rounded-2xl bg-gray-950 px-4 py-3 text-white shadow-xl"
        >
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-display text-3xl/none font-medium sm:text-4xl/none">
              <Counter value={count} />
            </span>
            <span className="text-sm font-medium text-white/70">
              applications sent
            </span>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold whitespace-nowrap">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Auto-apply ON
          </span>
        </m.div>

        <div className="relative h-[19.5rem] overflow-hidden mask-b-from-70% sm:h-[20.5rem]">
          <div className="flex flex-col gap-2.5">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((item) => (
                <JobCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
