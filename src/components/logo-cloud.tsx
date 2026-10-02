import { clsx } from 'clsx'

type LogoAsset = {
  name: string
  src: string
  // Full pixel/viewBox size of the source file.
  canvasWidth: number
  canvasHeight: number
  // Bounding box of the actual visible mark within the canvas, used to crop
  // out surrounding whitespace via CSS so every logo reads at a comparable
  // visual weight despite very different source canvases. The master files
  // are never modified — this only affects how they're displayed.
  contentBox: { x: number; y: number; width: number; height: number }
  // Fine-tunes perceived visual weight after the content-box crop already
  // normalizes for whitespace. 1 = no adjustment. Applied on top of the
  // shared row height, so it scales correctly at every breakpoint.
  visualScale?: number
  // Distance from the contentBox's bottom edge UP to the mark's true
  // typographic baseline (the row where the main lettering sits, not
  // counting descenders like a lowercase "g"/"j" tail or an icon that
  // intentionally hangs below the wordmark). Expressed as a fraction of
  // contentBox.height, measured per-asset from the actual pixel/path data.
  // 0 means the baseline is the contentBox's bottom edge (no descender).
  baselineInset?: number
  // Small manual nudge (px) for any residual optical correction on top of
  // the measured baseline alignment. 0 = no adjustment.
  fineTuneY?: number
}

const jobSources: LogoAsset[] = [
  {
    name: 'Indeed',
    src: '/logo-cloud/indeed.png',
    canvasWidth: 264,
    canvasHeight: 148,
    contentBox: { x: 0, y: 32, width: 264, height: 83 },
    // No descenders in "indeed" — baseline sits ~7px above the padded
    // contentBox bottom.
    baselineInset: 0.084,
  },
  {
    name: 'Greenhouse',
    src: '/logo-cloud/greenhouse.png',
    canvasWidth: 800,
    canvasHeight: 180,
    contentBox: { x: 0, y: 0, width: 800, height: 180 },
    // The lowercase "g" descender tail (with its ball terminal) extends
    // well below the baseline of the rest of "reenhouse" — measured from
    // the actual pixel data, the shared letter baseline sits at roughly
    // 64% of the canvas height, not at the box's geometric bottom.
    baselineInset: 0.361,
  },
  {
    name: 'Himalayas',
    src: '/logo-cloud/himalayas.svg',
    canvasWidth: 213,
    canvasHeight: 32,
    contentBox: { x: 0, y: 0, width: 213, height: 32 },
    visualScale: 0.92,
    // The mountain icon's base sits below the "Himalayas" wordmark
    // baseline; align to the lettering, not the icon+text bounding box.
    baselineInset: 0.219,
  },
  {
    name: 'LinkedIn',
    src: '/logo-cloud/linkedin.png',
    canvasWidth: 2212,
    canvasHeight: 540,
    contentBox: { x: 0, y: 0, width: 2212, height: 540 },
    visualScale: 0.85,
    // The "in" icon square extends below the "Linked" wordmark's own
    // baseline (measured on the wordmark region alone, excluding the
    // icon) — treat that the same way as a descender.
    baselineInset: 0.156,
  },
  {
    name: 'Djinni',
    src: '/logo-cloud/djinni.png',
    canvasWidth: 596,
    canvasHeight: 335,
    contentBox: { x: 198, y: 124, width: 199, height: 85 },
    visualScale: 1.25,
    // The lowercase "j" descender extends below the baseline of the rest
    // of "djinni".
    baselineInset: 0.259,
  },
]

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'grid grid-cols-3 items-end justify-items-center gap-x-6 gap-y-8 sm:grid-cols-5 sm:gap-x-8',
        'grid-auto-rows-[2.25rem] sm:grid-auto-rows-[2.75rem]',
        '[--logo-row-h:1.5rem] sm:[--logo-row-h:1.75rem]',
      )}
    >
      {jobSources.map((source) => {
        const { canvasWidth, canvasHeight, contentBox } = source
        const scale = source.visualScale ?? 1
        // All ratios are relative to the content box's own height, so a
        // single --logo-row-h variable (times each logo's visual scale)
        // drives width, background scale, and background position together
        // at every breakpoint.
        const widthRatio = contentBox.width / contentBox.height
        const bgWidthRatio = canvasWidth / contentBox.height
        const bgHeightRatio = canvasHeight / contentBox.height
        const posXRatio = -(contentBox.x / contentBox.height)
        const posYRatio = -(contentBox.y / contentBox.height)

        // The grid aligns each cell's content to its bottom edge
        // (items-end). Pushing the box down by its own baselineInset moves
        // the true baseline — not the raw box bottom — onto that shared
        // line, so every logo's lettering lands on one optical baseline
        // and only genuine descenders/icons hang below it.
        const baselineInset = source.baselineInset ?? 0
        const fineTuneY = source.fineTuneY ?? 0
        const translateExpr = `calc((var(--logo-row-h) * ${scale} * ${baselineInset}) + ${fineTuneY}px)`

        return (
          <span
            key={source.name}
            role="img"
            aria-label={source.name}
            className="bg-no-repeat"
            style={{
              height: `calc(var(--logo-row-h) * ${scale})`,
              width: `calc(var(--logo-row-h) * ${scale} * ${widthRatio})`,
              backgroundImage: `url(${source.src})`,
              backgroundSize: `calc(var(--logo-row-h) * ${scale} * ${bgWidthRatio}) calc(var(--logo-row-h) * ${scale} * ${bgHeightRatio})`,
              backgroundPosition: `calc(var(--logo-row-h) * ${scale} * ${posXRatio}) calc(var(--logo-row-h) * ${scale} * ${posYRatio})`,
              transform: `translateY(${translateExpr})`,
            }}
          />
        )
      })}
    </div>
  )
}
