'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

type EvidenceType = 'Experience' | 'Project' | 'Skill'

const rows: { requirement: string; evidence: EvidenceType }[] = [
  { requirement: 'B2B SaaS', evidence: 'Experience' },
  { requirement: 'Product discovery', evidence: 'Experience' },
  { requirement: 'API integrations', evidence: 'Project' },
  { requirement: 'User research', evidence: 'Project' },
  { requirement: 'SQL', evidence: 'Skill' },
]

const evidenceStyles: Record<EvidenceType, string> = {
  Experience: 'bg-blue-600/10 text-blue-700',
  Project: 'bg-purple-600/10 text-purple-700',
  Skill: 'bg-emerald-600/10 text-emerald-700',
}

function Row({
  requirement,
  evidence,
  delay,
}: {
  requirement: string
  evidence: EvidenceType
  delay: number
}) {
  return (
    <motion.div
      variants={{
        idle: { x: 0 },
        active: {
          x: [0, 3, 0],
          transition: { duration: 0.6, delay, ease: 'easeInOut' },
        },
      }}
      className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-2.5 shadow-xs ring-1 ring-black/5"
    >
      <span className="text-sm text-gray-950">{requirement}</span>
      <span
        className={clsx(
          'rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
          evidenceStyles[evidence],
        )}
      >
        {evidence}
      </span>
    </motion.div>
  )
}

export function EvidenceMatchGraphic() {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center gap-3 px-10"
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-medium text-gray-600">
          Evidence Match — Strong
        </span>
      </div>
      {rows.map((row, i) => (
        <Row
          key={row.requirement}
          requirement={row.requirement}
          evidence={row.evidence}
          delay={i * 0.08}
        />
      ))}
    </div>
  )
}
