'use client'

import { CheckIcon } from '@heroicons/react/16/solid'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type FormField = { label: string; value: string; shimmerWidth: string }

const fields: FormField[] = [
  { label: 'Current role', value: 'Product Manager', shimmerWidth: 'w-28' },
  { label: 'Years of experience', value: '3+ years', shimmerWidth: 'w-16' },
  { label: 'Work authorization', value: 'Authorized to work', shimmerWidth: 'w-36' },
  { label: 'Portfolio', value: 'melisabattal.com', shimmerWidth: 'w-28' },
]

// One row is "active" at a time and cycles shimmer → value, then the next
// row takes its turn; after the last row it loops back to the first. Every
// other row just sits in its completed state.
const SHIMMER_MS = 900
const STEP_MS = 1800

function CheckBadge() {
  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex size-4 shrink-0 items-center justify-center rounded-full bg-linear-to-t from-green-500 to-green-300 shadow-sm"
    >
      <CheckIcon className="size-2.5 fill-white" />
    </motion.span>
  )
}

function ShimmerBar({ widthClass }: { widthClass: string }) {
  return (
    <motion.span
      animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
      style={{ backgroundSize: '200% 100%' }}
      className={`block h-3.5 rounded-full bg-gradient-to-r from-white/10 via-white/35 to-white/10 ${widthClass}`}
    />
  )
}

function FormRow({ field, showValue }: { field: FormField; showValue: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white/8 px-4 py-3 ring-1 ring-white/15">
      <span className="text-xs text-gray-300">{field.label}</span>
      <div className="flex min-h-4 items-center gap-2">
        <AnimatePresence mode="wait">
          {showValue ? (
            <motion.span
              key="value"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-medium text-white"
            >
              {field.value}
            </motion.span>
          ) : (
            <motion.span
              key="shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ShimmerBar widthClass={field.shimmerWidth} />
            </motion.span>
          )}
        </AnimatePresence>
        {showValue && <CheckBadge />}
      </div>
    </div>
  )
}

export function ApplicationFormGraphic() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeFilled, setActiveFilled] = useState(false)
  const reducedMotion = useReducedMotion()
  const animated = !reducedMotion

  useEffect(() => {
    if (reducedMotion) return
    let index = 0
    let shimmerTimeout: ReturnType<typeof setTimeout>

    const startRow = () => {
      setActiveIndex(index)
      setActiveFilled(false)
      shimmerTimeout = setTimeout(() => setActiveFilled(true), SHIMMER_MS)
    }

    startRow()
    const stepInterval = setInterval(() => {
      index = (index + 1) % fields.length
      startRow()
    }, STEP_MS)

    return () => {
      clearInterval(stepInterval)
      clearTimeout(shimmerTimeout)
    }
  }, [reducedMotion])

  return (
    <motion.div
      aria-hidden="true"
      variants={{
        idle: { filter: 'brightness(1)' },
        active: { filter: 'brightness(1.06)' },
      }}
      className="flex size-full flex-col justify-center gap-3 px-6 sm:px-10"
    >
      <div className="flex items-center gap-2">
        <motion.span
          animate={animated ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
          transition={{
            duration: 1.6,
            repeat: animated ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.7)]"
        />
        <span className="text-xs font-medium text-gray-300">
          Completing application…
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field, i) => (
          <FormRow
            key={field.label}
            field={field}
            showValue={reducedMotion || i !== activeIndex || activeFilled}
          />
        ))}
      </div>
    </motion.div>
  )
}
