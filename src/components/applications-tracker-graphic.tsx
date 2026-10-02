'use client'

import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

type Status = 'Applied' | 'Interview' | 'Closed'

type Row = { role: string; company: string; timing: string; status: Status }

const rows: Row[] = [
  { role: 'Product Manager', company: 'Acme', timing: 'Applied today', status: 'Applied' },
  { role: 'Product Owner', company: 'Nova', timing: 'Interview tomorrow', status: 'Interview' },
  { role: 'Founding Product Manager', company: 'Northstar', timing: 'Submitted yesterday', status: 'Applied' },
  { role: 'Product Designer', company: 'Lumen', timing: 'Closed last week', status: 'Closed' },
]

const statusStyles: Record<Status, string> = {
  Applied: 'bg-blue-500/15 text-blue-300',
  Interview: 'bg-emerald-500/15 text-emerald-300',
  Closed: 'bg-white/10 text-gray-400',
}

const tabs = ['All applications', 'Applied', 'Interview']

function StatusBadge({ status, animated }: { status: Status; animated: boolean }) {
  const pulse = animated && status === 'Interview'
  return (
    <motion.span
      animate={pulse ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
      transition={{ duration: 1.8, repeat: pulse ? Infinity : 0, ease: 'easeInOut' }}
      className={clsx(
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        statusStyles[status],
      )}
    >
      {status}
    </motion.span>
  )
}

export function ApplicationsTrackerGraphic() {
  const reducedMotion = useReducedMotion()
  const animated = !reducedMotion

  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center gap-3 px-6 sm:px-10"
    >
      <div className="flex items-center gap-1.5">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className={clsx(
              'rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
              i === 0 ? 'bg-white/10 text-white ring-1 ring-white/15' : 'text-gray-500',
            )}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div
            key={`${row.role}-${row.company}`}
            className={clsx(
              'flex items-center justify-between gap-4 rounded-lg bg-white/5 px-4 py-2.5 ring-1 ring-white/10',
              row.status === 'Closed' && 'opacity-60',
            )}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{row.role}</p>
              <p className="truncate text-xs text-gray-500">
                {row.company} · {row.timing}
              </p>
            </div>
            <StatusBadge status={row.status} animated={animated} />
          </div>
        ))}
      </div>
    </div>
  )
}
