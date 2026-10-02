'use client'

import { motion } from 'framer-motion'

function Marker({
  label,
  top,
  offset,
  delay,
}: {
  label: string
  top: number
  offset: number
  delay: number
}) {
  return (
    <motion.div
      variants={{
        idle: { scale: 0, opacity: 0, rotateX: 0, rotate: 0, y: 0 },
        active: { y: [-20, 0, 4, 0], scale: [0.75, 1], opacity: [0, 1] },
      }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      style={{ '--offset': `${offset}px`, top } as React.CSSProperties}
      className="absolute left-[calc(50%+var(--offset))] flex flex-col items-center"
    >
      <div className="relative size-[38px] drop-shadow-[0_3px_1px_rgba(0,0,0,.15)]">
        <svg fill="none" viewBox="0 0 38 38" className="absolute size-full">
          <path
            d="M29.607 5.193c5.858 5.857 5.858 15.355 0 21.213l-9.9 9.9-.707.706-.708-.708-9.899-9.898c-5.857-5.858-5.857-15.356 0-21.213 5.858-5.858 15.356-5.858 21.214 0Z"
            className="fill-black/5"
          />
          <path
            d="m28.9 25.698-9.9 9.9-9.9-9.9C3.634 20.232 3.634 11.367 9.1 5.9 14.569.432 23.433.432 28.9 5.9c5.467 5.468 5.467 14.332 0 19.8Z"
            className="fill-white"
          />
        </svg>
        <span className="absolute top-[9px] left-[9px] size-5 rounded-full bg-blue-600" />
      </div>
      <span className="mt-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap text-gray-950 shadow-xs ring-1 ring-black/5">
        {label}
      </span>
    </motion.div>
  )
}

export function Map() {
  return (
    <div aria-hidden="true" className="relative size-full">
      <div className="absolute inset-0 bg-[url(/map.png)] mask-[linear-gradient(to_bottom,black_50%,transparent)] bg-size-[530px_430px] bg-position-[center_-75px] bg-no-repeat" />
      <div className="absolute inset-0">
        <Marker label="Berlin" top={96} offset={-128} delay={0.15} />
        <Marker label="London" top={160} offset={-16} delay={0.4} />
        <Marker label="Warsaw" top={144} offset={96} delay={0.3} />
        <Marker label="Remote EU" top={192} offset={64} delay={0.6} />
        <Marker label="New York" top={224} offset={-32} delay={0.8} />
      </div>
    </div>
  )
}
