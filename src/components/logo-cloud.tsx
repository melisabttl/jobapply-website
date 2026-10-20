import { clsx } from 'clsx'

const boards = [
  { alt: 'LinkedIn', src: '/logo-cluster/linkedin.svg' },
  { alt: 'Glassdoor', src: '/logo-cluster/glassdoor.svg' },
  { alt: 'CareerBuilder', src: '/logo-cluster/career-builder.svg' },
  { alt: 'We Work Remotely', src: '/logo-cluster/we-work-remotely.svg' },
  { alt: 'Upwork', src: '/logo-cluster/upwork.svg' },
]

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      {boards.map(({ alt, src }) => (
        <img
          key={alt}
          alt={alt}
          src={src}
          className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
        />
      ))}
    </div>
  )
}
