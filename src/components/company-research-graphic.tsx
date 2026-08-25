'use client'

import { clsx } from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Mark } from './logo'

type Satellite = {
  key: string
  label: string
  x: number
  y: number
  labelTransform: string
}

const satellites: Satellite[] = [
  { key: 'company', label: 'Company', x: 100, y: 26, labelTransform: 'translate(-50%, -150%)' },
  { key: 'role', label: 'Role', x: 174, y: 100, labelTransform: 'translate(-2%, -50%)' },
  { key: 'product', label: 'Product', x: 100, y: 174, labelTransform: 'translate(-50%, 50%)' },
  { key: 'industry', label: 'Industry', x: 26, y: 100, labelTransform: 'translate(-102%, -50%)' },
]

const CYCLE_MS = 4500

export function CompanyResearchGraphic() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const intervalId = setInterval(() => {
      setActiveIndex((i) => (i + 1) % satellites.length)
    }, CYCLE_MS)
    return () => clearInterval(intervalId)
  }, [reducedMotion])

  return (
    <div aria-hidden="true" className="flex size-full items-center justify-center px-6">
      <div className="relative size-44 sm:size-52">
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible">
          {satellites.map((sat, i) => (
            <line
              key={sat.key}
              x1={100}
              y1={100}
              x2={sat.x}
              y2={sat.y}
              strokeWidth={1}
              className={clsx(
                'transition-colors duration-700',
                i === activeIndex ? 'stroke-blue-400/70' : 'stroke-white/10',
              )}
            />
          ))}
          <motion.circle
            cx={100}
            cy={100}
            r={20}
            animate={
              reducedMotion
                ? { scale: 1, opacity: 0.25 }
                : { scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }
            }
            transition={{
              duration: 2.4,
              repeat: reducedMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="fill-blue-400/20"
          />
          <circle cx={100} cy={100} r={11} strokeWidth={1} className="fill-white/10 stroke-white/20" />
          {satellites.map((sat, i) => (
            <circle
              key={sat.key}
              cx={sat.x}
              cy={sat.y}
              r={6}
              className={clsx(
                'transition-colors duration-700',
                i === activeIndex ? 'fill-blue-400' : 'fill-white/25',
              )}
            />
          ))}
        </svg>
        <span className="absolute top-1/2 left-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-t from-white/10 to-white/30 ring-1 ring-white/20">
          <Mark className="h-3 fill-white" />
        </span>
        {satellites.map((sat, i) => (
          <span
            key={sat.key}
            style={{
              left: `${(sat.x / 200) * 100}%`,
              top: `${(sat.y / 200) * 100}%`,
              transform: sat.labelTransform,
            }}
            className={clsx(
              'absolute text-[10px] font-medium whitespace-nowrap transition-colors duration-700',
              i === activeIndex ? 'text-blue-300' : 'text-gray-500',
            )}
          >
            {sat.label}
          </span>
        ))}
      </div>
    </div>
  )
}
