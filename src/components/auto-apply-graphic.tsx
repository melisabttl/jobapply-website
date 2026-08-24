'use client'

import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <path d="M13.7 3.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6 9.6l6.3-6.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  )
}

type RowStatus = 'tailoring' | 'applying' | 'applied'

type QueueRow = { role: string; status: RowStatus }

// Snapshot mirrors the approved default mock exactly: three rows already
// sent, one row mid-flight. Only the mid-flight row advances over time —
// everything else is correct on first paint, no animation required to
// understand the card.
const initialRows: QueueRow[] = [
  { role: 'Product Manager', status: 'applied' },
  { role: 'Product Owner', status: 'applied' },
  { role: 'Associate Product Manager', status: 'applying' },
  { role: 'Founding Product Manager', status: 'applied' },
]

const statusConfig: Record<
  RowStatus,
  { label: string; application: string; badgeClass: string }
> = {
  tailoring: {
    label: 'Tailoring',
    application: 'Tailoring',
    badgeClass: 'bg-violet-600/10 text-violet-700',
  },
  applying: {
    label: 'Applying…',
    application: 'Tailoring',
    badgeClass: 'bg-blue-600/10 text-blue-700',
  },
  applied: {
    label: 'Auto applied',
    application: 'Resume + Cover Letter',
    badgeClass: 'bg-emerald-600/10 text-emerald-700',
  },
}

const CYCLE_MS = 5000
const PHASE_MS = 1400

function AutoApplyOnBadge({ animated }: { animated: boolean }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600/10 px-2 py-0.5 text-xs font-semibold text-emerald-700">
      <motion.span
        animate={animated ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
        transition={{ duration: 1.6, repeat: animated ? Infinity : 0, ease: 'easeInOut' }}
        className="size-1.5 rounded-full bg-emerald-600"
      />
      ON
    </span>
  )
}

function StatusBadge({ status, animated }: { status: RowStatus; animated: boolean }) {
  const config = statusConfig[status]
  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        config.badgeClass,
      )}
    >
      {status === 'applied' && <CheckIcon className="size-3 fill-emerald-700" />}
      {status === 'applying' && (
        <motion.span
          animate={animated ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
          transition={{ duration: 1, repeat: animated ? Infinity : 0, ease: 'easeInOut' }}
          className="size-1.5 rounded-full bg-blue-600"
        />
      )}
      {config.label}
    </span>
  )
}

function QueueRowItem({ row, animated }: { row: QueueRow; animated: boolean }) {
  const application = statusConfig[row.status].application
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2.5 shadow-xs ring-1 ring-black/5 sm:px-4">
      <div className="min-w-0 sm:flex sm:flex-1 sm:items-center sm:gap-4">
        <p className="truncate text-sm font-medium text-gray-950 sm:flex-1">
          {row.role}
        </p>
        <p className="truncate text-xs text-gray-400 sm:w-40 sm:shrink-0 sm:text-right">
          {application}
        </p>
      </div>
      <StatusBadge status={row.status} animated={animated} />
    </div>
  )
}

export function AutoApplyGraphic() {
  const [rows, setRows] = useState<QueueRow[]>(() =>
    initialRows.map((row) => ({ ...row })),
  )
  const reducedMotion = useReducedMotion()

  // Every cycle, advance whichever row is next in line through
  // Tailoring → Applying… → Auto applied, then move on to the next row.
  // The first cycle only fires after CYCLE_MS so the approved default
  // snapshot stays put on initial paint.
  useEffect(() => {
    if (reducedMotion) return
    let index = 0
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const runCycle = () => {
      setRows((prev) =>
        prev.map((row, i) => (i === index ? { ...row, status: 'tailoring' } : row)),
      )
      timeouts.push(
        setTimeout(() => {
          setRows((prev) =>
            prev.map((row, i) => (i === index ? { ...row, status: 'applying' } : row)),
          )
        }, PHASE_MS),
      )
      timeouts.push(
        setTimeout(() => {
          setRows((prev) =>
            prev.map((row, i) => (i === index ? { ...row, status: 'applied' } : row)),
          )
          index = (index + 1) % initialRows.length
        }, PHASE_MS * 2),
      )
    }

    const intervalId = setInterval(runCycle, CYCLE_MS)
    return () => {
      clearInterval(intervalId)
      timeouts.forEach(clearTimeout)
    }
  }, [reducedMotion])

  const animated = !reducedMotion

  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center gap-3 px-6 sm:px-10"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-950">Auto Apply</span>
          <AutoApplyOnBadge animated={animated} />
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-gray-600">
          200+ / day
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <QueueRowItem key={row.role} row={row} animated={animated} />
        ))}
      </div>
    </div>
  )
}
