import * as Headless from '@headlessui/react'
import NextLink, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  // A same-page homepage anchor (e.g. "/#how-it-works") never needs the
  // Next.js router: on "/" the browser scrolls in place with no request at
  // all, and from any other page it's a normal full navigation to "/"
  // followed by the browser's native scroll-to-fragment. Routing it through
  // next/link instead makes Next treat "/#how-it-works" as a distinct page
  // to prefetch/fetch an RSC payload for, which is unnecessary and — with a
  // dev server that hasn't seen the route since it started — can fail.
  if (typeof props.href === 'string' && props.href.startsWith('/#')) {
    let { href, scroll, replace, prefetch, shallow, locale, ...rest } = props
    return (
      <Headless.DataInteractive>
        <a ref={ref} href={href} {...rest} />
      </Headless.DataInteractive>
    )
  }

  return (
    <Headless.DataInteractive>
      <NextLink ref={ref} {...props} />
    </Headless.DataInteractive>
  )
})
