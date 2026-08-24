'use client'

import { clsx } from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0H9l4 4v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5v-13Z" />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <path d="M1.5 3A1.5 1.5 0 0 1 3 1.5h3.129a1.5 1.5 0 0 1 1.06.44L8.31 3H13A1.5 1.5 0 0 1 14.5 4.5v8A1.5 1.5 0 0 1 13 14H3a1.5 1.5 0 0 1-1.5-1.5V3Z" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <rect
        x="1.6"
        y="6.6"
        width="7"
        height="2.8"
        rx="1.4"
        transform="rotate(-45 5.1 8)"
      />
      <rect
        x="7.4"
        y="6.6"
        width="7"
        height="2.8"
        rx="1.4"
        transform="rotate(-45 10.9 8)"
      />
    </svg>
  )
}

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <rect x="2" y="1" width="12" height="14" rx="1.5" />
      <rect
        x="4.5"
        y="4.5"
        width="7"
        height="1.3"
        rx="0.65"
        fill="white"
        fillOpacity="0.55"
      />
      <rect
        x="4.5"
        y="7.3"
        width="7"
        height="1.3"
        rx="0.65"
        fill="white"
        fillOpacity="0.55"
      />
      <rect
        x="4.5"
        y="10.1"
        width="4.5"
        height="1.3"
        rx="0.65"
        fill="white"
        fillOpacity="0.55"
      />
    </svg>
  )
}

function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <rect x="1.5" y="2" width="13" height="12" rx="1.5" />
      <circle cx="5.2" cy="6" r="1.3" fill="white" fillOpacity="0.6" />
      <path
        d="M3 12.5 7 8.2l2.3 2.3 2-2.3 1.7 2.3v.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 13v-.5Z"
        fill="white"
        fillOpacity="0.6"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <path d="M13.7 3.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6 9.6l6.3-6.3a1 1 0 0 1 1.4 0Z" />
    </svg>
  )
}

const sources = [
  {
    name: 'CV',
    status: 'Imported',
    processingLabel: 'Processing…',
    Icon: DocumentIcon,
    bgClass: 'bg-blue-50',
    fillClass: 'fill-blue-600',
  },
  {
    name: 'Portfolio',
    status: 'Added',
    processingLabel: 'Reading…',
    Icon: GalleryIcon,
    bgClass: 'bg-violet-50',
    fillClass: 'fill-violet-600',
  },
  {
    name: 'Projects',
    status: '4 added',
    processingLabel: 'Scanning…',
    Icon: FolderIcon,
    bgClass: 'bg-amber-50',
    fillClass: 'fill-amber-600',
  },
  {
    name: 'Documents',
    status: '3 files',
    processingLabel: 'Reading…',
    Icon: DocumentIcon,
    bgClass: 'bg-slate-100',
    fillClass: 'fill-slate-500',
  },
  {
    name: 'URL',
    status: 'Parsed',
    processingLabel: 'Reading…',
    Icon: LinkIcon,
    bgClass: 'bg-cyan-50',
    fillClass: 'fill-cyan-600',
  },
  {
    name: 'Notes',
    status: 'Added',
    processingLabel: 'Saving…',
    Icon: NoteIcon,
    bgClass: 'bg-pink-50',
    fillClass: 'fill-pink-600',
  },
]

const CYCLE_MS = 5000
const ACTIVE_MS = 1500

function SourceTile({
  source,
  active,
}: {
  source: (typeof sources)[number]
  active: boolean
}) {
  const Icon = source.Icon
  return (
    <div
      className={clsx(
        'flex items-center gap-2.5 rounded-lg bg-white px-2.5 py-2.5 shadow-xs ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-sm hover:ring-black/10',
        active && 'shadow-sm ring-black/10',
      )}
    >
      <motion.span
        animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{
          duration: 0.9,
          repeat: active ? Infinity : 0,
          ease: 'easeInOut',
        }}
        className={clsx(
          'flex size-7 shrink-0 items-center justify-center rounded-md',
          source.bgClass,
        )}
      >
        <Icon className={clsx('size-3.5', source.fillClass)} />
      </motion.span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-gray-900">
          {source.name}
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={active ? 'processing' : 'status'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="truncate text-[9px] text-gray-400"
          >
            {active ? source.processingLabel : source.status}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

function CareerProfileUpdated({ pulseKey }: { pulseKey: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        key={pulseKey}
        initial={{ scale: 0.97 }}
        animate={{ scale: [0.97, 1.02, 1] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold whitespace-nowrap text-emerald-700"
      >
        <CheckIcon className="size-3 fill-emerald-700" />
        Career Profile updated
      </motion.div>
      <p className="text-[9px] whitespace-nowrap text-gray-400">
        Experience Β· Projects Β· Skills Β· Evidence
      </p>
    </div>
  )
}

export function AddBackgroundGraphic() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [pulseKey, setPulseKey] = useState(0)
  const reducedMotion = useReducedMotion()

  // Ambient cycle only β€” every source is already visible; this just moves
  // a soft "in progress" highlight across one item at a time.
  useEffect(() => {
    if (reducedMotion) return
    let index = 0
    let revertId: ReturnType<typeof setTimeout>
    const tick = () => {
      setActiveIndex(index)
      setPulseKey((k) => k + 1)
      revertId = setTimeout(() => setActiveIndex(null), ACTIVE_MS)
      index = (index + 1) % sources.length
    }
    tick()
    const intervalId = setInterval(tick, CYCLE_MS)
    return () => {
      clearInterval(intervalId)
      clearTimeout(revertId)
    }
  }, [reducedMotion])

  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col items-center justify-center gap-4 px-6 py-5 sm:px-8"
    >
      <div className="grid w-full grid-cols-2 gap-2">
        {sources.map((source, i) => (
          <SourceTile
            key={source.name}
            source={source}
            active={activeIndex === i}
          />
        ))}
      </div>
      <CareerProfileUpdated pulseKey={pulseKey} />
    </div>
  )
}
