'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

const categories = ['Experience', 'Projects', 'Skills', 'Education', 'Evidence']

function CategoryPill({ name, active }: { name: string; active: boolean }) {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap',
        active ? 'bg-blue-600 text-white' : 'bg-gray-950/5 text-gray-600',
      )}
    >
      {name}
    </span>
  )
}

function SkeletonRow({ width, delay }: { width: string; delay: number }) {
  return (
    <motion.div
      variants={{
        idle: { opacity: 0.6 },
        active: {
          opacity: [0.6, 1, 0.6],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          },
        },
      }}
      style={{ width }}
      className="h-2.5 rounded-full bg-gray-950/8"
    />
  )
}

export function CareerProfileGraphic() {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center gap-6 px-10"
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((name) => (
          <CategoryPill key={name} name={name} active={name === 'Experience'} />
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-xs ring-1 ring-black/5">
        <SkeletonRow width="70%" delay={0} />
        <SkeletonRow width="45%" delay={0.15} />
        <SkeletonRow width="85%" delay={0.3} />
        <SkeletonRow width="55%" delay={0.45} />
      </div>
    </div>
  )
}
