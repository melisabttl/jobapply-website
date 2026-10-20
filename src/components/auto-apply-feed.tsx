'use client'

import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
const TICK_MS = 1200
const TAILOR_MS = 500

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
        <motion.span
          key="applied"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22 }}
          className="inline-flex items-center gap-1 rounded-full bg-emerald-500 py-1 pr-2.5 pl-1.5 text-xs font-semibold text-white"
        >
          <CheckIcon className="size-3.5" />
          Applied
        </motion.span>
      ) : (
        <motion.span
          key="tailoring"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="relative inline-flex items-center overflow-hidden rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-semibold text-fuchsia-700"
        >
          Tailoring CV
          <motion.span
            className="absolute inset-y-0 left-0 w-full origin-left bg-fuchsia-500/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: TAILOR_MS / 1000, ease: 'linear' }}
          />
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function JobCard({ item }: { item: Item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -48, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
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
    </motion.div>
  )
}

function Counter({ value }: { value: number }) {
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function AutoApplyFeed({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const [items, setItems] = useState<Item[]>(initialItems)
  const [count, setCount] = useState(312)
  const nextId = useRef(VISIBLE)

  useEffect(() => {
    if (reduceMotion) return
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
  }, [reduceMotion])

  return (
    <div
      className={clsx('w-full max-w-md', className)}
      role="img"
      aria-label="Live feed of job applications being tailored and sent automatically"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Auto-apply ON
        </span>
      </motion.div>

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
  )
}
