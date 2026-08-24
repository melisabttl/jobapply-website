'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Mark } from './logo'

function Circle({
  size,
  delay,
  opacity,
}: {
  size: number
  delay: number
  opacity: string
}) {
  return (
    <motion.div
      variants={{
        idle: { width: `${size}px`, height: `${size}px` },
        active: {
          width: [`${size}px`, `${size + 10}px`, `${size}px`],
          height: [`${size}px`, `${size + 10}px`, `${size}px`],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: 'easeInOut',
            delay,
          },
        },
      }}
      style={{ '--opacity': opacity } as React.CSSProperties}
      className={clsx(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
        'bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,var(--color-blue-500)_var(--opacity),transparent)_100%)]',
        'ring-1 ring-blue-500/8 ring-inset',
      )}
    />
  )
}

function Circles() {
  return (
    <div className="absolute inset-0">
      <Circle size={528} opacity="3%" delay={0.45} />
      <Circle size={400} opacity="5%" delay={0.3} />
      <Circle size={272} opacity="5%" delay={0.15} />
      <Circle size={144} opacity="10%" delay={0} />
      <div className="absolute inset-0 bg-linear-to-t from-white to-35%" />
    </div>
  )
}

function MainLogo() {
  return (
    <div className="absolute top-32 left-44 flex size-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
      <Mark className="h-9 fill-black" />
    </div>
  )
}

// Radiant's original Logo rendered the raw <img> at the full node size
// (size-16 = 64px), rounded-full, relying entirely on padding baked into
// the source SVG for breathing room — no extra sizing logic at all. That
// works as-is for well-composed square icon assets. Assets that lack that
// baked-in padding (cropped tight, or padded asymmetrically) instead use
// `crop`, which reproduces the same ~50–56% ink-to-node visual weight the
// original Radiant assets read at, via a CSS background-image crop rather
// than editing the master file.
type ConnectedSource = {
  name: string
  src: string
  crop?: {
    // Full pixel size of the source file.
    canvasWidth: number
    canvasHeight: number
    // Bounding box of the visible mark within the canvas, used to crop out
    // surrounding whitespace via CSS so the mark reads at full strength
    // instead of shrunk inside its own padding. Full-canvas box (no
    // padding to crop) is fine too — see Greenhouse/Remote OK below.
    contentBox: { x: number; y: number; width: number; height: number }
    // Height of the cropped mark as a fraction of the 64px node diameter.
    // Radiant's own assets read at roughly 50–56% of the node; that's the
    // default. Override only to correct for a specific asset's shape —
    // e.g. a narrow mark needs a taller box to match perceived weight, and
    // Remote OK (baked-in black square) needs to shrink deliberately for
    // white breathing room.
    scale?: number
  }
}

const DEFAULT_CROP_SCALE = 0.56

function Logo({
  source,
  left,
  top,
  hover,
}: {
  source: ConnectedSource
  left: number
  top: number
  hover: { x: number; y: number; rotate: number; delay: number }
}) {
  return (
    <motion.div
      variants={{
        idle: { x: 0, y: 0, rotate: 0 },
        active: {
          x: [0, hover.x, 0],
          y: [0, hover.y, 0],
          rotate: [0, hover.rotate, 0],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: 'easeInOut',
            delay: hover.delay,
          },
        },
      }}
      style={{ left, top } as React.CSSProperties}
      className="absolute flex size-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5"
    >
      {source.crop ? (
        <CroppedMark src={source.src} crop={source.crop} />
      ) : (
        <img alt="" src={source.src} className="size-16" />
      )}
    </motion.div>
  )
}

function CroppedMark({
  src,
  crop,
}: {
  src: string
  crop: NonNullable<ConnectedSource['crop']>
}) {
  const { canvasWidth, canvasHeight, contentBox, scale = DEFAULT_CROP_SCALE } =
    crop
  const targetHeight = 64 * scale
  const widthRatio = contentBox.width / contentBox.height
  const bgWidthRatio = canvasWidth / contentBox.height
  const bgHeightRatio = canvasHeight / contentBox.height
  const posXRatio = -(contentBox.x / contentBox.height)
  const posYRatio = -(contentBox.y / contentBox.height)

  return (
    <span
      style={{
        height: `${targetHeight}px`,
        width: `${targetHeight * widthRatio}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: `${targetHeight * bgWidthRatio}px ${targetHeight * bgHeightRatio}px`,
        backgroundPosition: `${targetHeight * posXRatio}px ${targetHeight * posYRatio}px`,
      }}
      className="bg-no-repeat"
    />
  )
}

// Fixed set of 6 orbital slots around the center mark — position and hover
// physics only, unchanged from the original animation. Sources are matched
// to slots by array index below, so swapping a platform is a one-line
// change here; the animation itself never needs to be touched.
const positions = [
  { left: 360, top: 144, hover: { x: 6, y: 1, rotate: 5, delay: 0.38 } },
  { left: 285, top: 20, hover: { x: 4, y: -5, rotate: 6, delay: 0.3 } },
  { left: 255, top: 210, hover: { x: 3, y: 5, rotate: 7, delay: 0.2 } },
  { left: 144, top: 40, hover: { x: -2, y: -5, rotate: -6, delay: 0.15 } },
  { left: 36, top: 56, hover: { x: -4, y: -5, rotate: -6, delay: 0.35 } },
  { left: 96, top: 176, hover: { x: -3, y: 5, rotate: 3, delay: 0.15 } },
]

// The 6 job platforms JobApply is connected to.
const connectedSources: ConnectedSource[] = [
  {
    name: 'Indeed',
    src: '/logo-cluster/Indeed-logo.png',
    // The mark sits well left-of-center in a mostly transparent canvas —
    // crop to its actual bounding box (measured from the pixel data) at
    // the default scale so it reads at the same weight as the others.
    crop: {
      canvasWidth: 3840,
      canvasHeight: 2160,
      contentBox: { x: 1211, y: 25, width: 1418, height: 2110 },
    },
  },
  {
    name: 'Greenhouse',
    src: '/logo-cluster/greenhouse.png',
    // Mark already fills its canvas edge-to-edge (no padding to crop), but
    // its native aspect is tall and narrow — bump the scale so its area
    // reads at a comparable weight to the squarer marks instead of
    // looking thin.
    crop: {
      canvasWidth: 688,
      canvasHeight: 1438,
      contentBox: { x: 0, y: 0, width: 688, height: 1438 },
      scale: 0.75,
    },
  },
  {
    name: 'Remote OK',
    src: '/logo-cluster/remote-ok.png',
    // Baked-in black square background — deliberately smaller than the
    // default scale so it sits inside the white node with clear breathing
    // room instead of filling the circle edge-to-edge.
    crop: {
      canvasWidth: 1416,
      canvasHeight: 1416,
      contentBox: { x: 0, y: 0, width: 1416, height: 1416 },
      scale: 0.45,
    },
  },
  {
    // No `crop` — renders exactly like Radiant's original Logo: the raw
    // asset fills the 64px node, using its own baked-in padding.
    name: 'LinkedIn',
    src: '/logo-cluster/linkedin.svg',
  },
  {
    name: 'Upwork',
    src: '/logo-cluster/upwork.svg',
  },
  {
    name: 'We Work Remotely',
    src: '/logo-cluster/we-work-remotely.svg',
  },
]

export function LogoCluster() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      <Circles />
      <div className="absolute left-1/2 h-full w-104 -translate-x-1/2">
        <MainLogo />
        {positions.map((position, i) => {
          const source = connectedSources[i]
          return (
            <Logo
              key={source.name}
              source={source}
              left={position.left}
              top={position.top}
              hover={position.hover}
            />
          )
        })}
      </div>
    </div>
  )
}
