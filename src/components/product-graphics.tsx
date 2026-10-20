import { CheckIcon, SparklesIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'

function Line({ className }: { className?: string }) {
  return <div className={clsx('h-2 rounded-full bg-gray-200', className)} />
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-fuchsia-100 px-1 font-semibold text-fuchsia-700">
      {children}
    </span>
  )
}

export function CvGraphic() {
  return (
    <div className="absolute inset-0 flex items-start justify-center overflow-hidden bg-gray-50 pt-8">
      <div className="w-72 rounded-xl bg-white p-5 shadow-xl ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-950">
              Alex Morgan
            </div>
            <div className="text-xs text-gray-500">Product Designer</div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-600 px-2 py-1 text-[10px] font-semibold text-white">
            <SparklesIcon className="size-3" />
            Tailored
          </span>
        </div>
        <div className="mt-4 space-y-2 text-[11px]/5 text-gray-600">
          <p>
            Led <Key>design systems</Key> work across 4 product teams.
          </p>
          <p>
            Shipped <Key>user research</Key> driven redesigns.
          </p>
          <p>
            Strong <Key>Figma</Key> and <Key>prototyping</Key> skills.
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <Line className="w-full" />
          <Line className="w-5/6" />
          <Line className="w-2/3" />
        </div>
      </div>
    </div>
  )
}

const MATCHES = [
  { role: 'Product Designer', company: 'Northwind', score: 96 },
  { role: 'Senior UX Designer', company: 'Lumen Labs', score: 93 },
  { role: 'Design Lead', company: 'Vertex', score: 91 },
  { role: 'UX Researcher', company: 'Orbit', score: 84 },
]

export function MatchGraphic() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-50 p-8">
      <div className="space-y-3">
        {MATCHES.map((m) => (
          <div
            key={m.role}
            className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5"
          >
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-semibold text-gray-950">{m.role}</div>
                <div className="text-xs text-gray-500">{m.company}</div>
              </div>
              <div className="font-display text-xl font-medium text-gray-950">
                {m.score}%
              </div>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-[#fff1be] via-[#ee87cb] to-[#b060ff]"
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LetterGraphic() {
  return (
    <div className="absolute inset-0 flex items-start justify-center overflow-hidden bg-gray-50 pt-8">
      <div className="w-64 rounded-xl bg-white p-5 shadow-xl ring-1 ring-black/5">
        <div className="text-xs font-semibold text-gray-950">
          Dear Northwind team,
        </div>
        <div className="mt-3 space-y-2">
          <Line className="w-full" />
          <Line className="w-full" />
          <Line className="w-4/5" />
          <div className="h-2" />
          <Line className="w-full" />
          <Line className="w-3/4" />
        </div>
        <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
          <CheckIcon className="size-3" />
          Matches your voice
        </div>
      </div>
    </div>
  )
}

export function ReviewGraphic() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden bg-gray-50 p-8">
      {[
        'Review the application',
        'Edit anything you like',
        'Submit in one click',
      ].map((step, i) => (
        <div
          key={step}
          className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm font-semibold text-gray-950 shadow-sm ring-1 ring-black/5"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-gray-950 text-xs text-white">
            {i + 1}
          </span>
          {step}
        </div>
      ))}
    </div>
  )
}

const COLUMNS = [
  { label: 'Applied', count: 312, tone: 'bg-sky-500' },
  { label: 'Interview', count: 24, tone: 'bg-fuchsia-500' },
  { label: 'Offer', count: 3, tone: 'bg-emerald-500' },
]

export function PipelineGraphic() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gray-900 p-8">
      <div className="grid w-full max-w-lg grid-cols-3 gap-3">
        {COLUMNS.map((c) => (
          <div
            key={c.label}
            className="rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className={clsx('size-2 rounded-full', c.tone)} />
              {c.label}
            </div>
            <div className="font-display mt-2 text-4xl font-medium text-gray-950">
              {c.count}
            </div>
            <div className="mt-3 space-y-1.5">
              <Line className="w-full" />
              <Line className="w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatsGraphic() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gray-900 p-8">
      <div className="grid grid-cols-3 gap-8 text-center">
        {[
          ['300+', 'applications a week'],
          ['3s', 'to tailor each CV'],
          ['94%', 'average match'],
        ].map(([n, label]) => (
          <div key={label}>
            <div className="font-display text-5xl font-medium text-white">
              {n}
            </div>
            <div className="mt-1 text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
