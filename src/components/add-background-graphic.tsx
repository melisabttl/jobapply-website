'use client'

import { motion } from 'framer-motion'

const items = ['CV', 'Portfolio', 'Project', 'Document', 'URL', 'Notes']

function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 fill-gray-950/40">
      <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0H9l4 4v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5v-13Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3 fill-emerald-700">
      <path d="M13.7 3.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6 9.6l6.3-6.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  )
}

function Item({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.div
      variants={{
        idle: { opacity: 0, y: -8, scale: 0.9 },
        active: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.3, delay, ease: 'easeOut' },
        },
      }}
      className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-gray-950 shadow-xs ring-1 ring-black/5"
    >
      <FileIcon />
      {name}
    </motion.div>
  )
}

export function AddBackgroundGraphic() {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col justify-center gap-3 px-8"
    >
      <div className="grid grid-cols-2 gap-2">
        {items.map((name, i) => (
          <Item key={name} name={name} delay={i * 0.08} />
        ))}
      </div>
      <motion.div
        variants={{
          idle: { opacity: 0, y: 4 },
          active: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              delay: items.length * 0.08 + 0.15,
              ease: 'easeOut',
            },
          },
        }}
        className="flex items-center gap-1.5 self-start rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-medium text-emerald-700"
      >
        <CheckIcon />
        Profile updated
      </motion.div>
    </div>
  )
}
