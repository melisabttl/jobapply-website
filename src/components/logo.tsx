import { clsx } from 'clsx'

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        className,
        'font-display inline-flex items-center text-[2rem] leading-none font-semibold tracking-tight text-gray-950',
      )}
    >
      easli
    </span>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" className={className} aria-hidden="true">
      <text
        x="17"
        y="27"
        textAnchor="middle"
        fontSize="36"
        fontWeight="600"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        e
      </text>
    </svg>
  )
}
