import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/plus-grid'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Mark } from './logo'
import { Subheading } from './text'

function CallToAction() {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <hgroup>
        <Subheading>Get started</Subheading>
        <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          Ready to put your applications on autopilot?
        </p>
      </hgroup>
      <p className="mx-auto mt-6 max-w-md text-sm/6 text-gray-500">
        Set up your career profile once. JobApply finds relevant roles,
        tailors each application, and applies for you.
      </p>
      <div className="mt-6">
        <Button className="w-full sm:w-auto" href="#">
          Start applying
        </Button>
      </div>
    </div>
  )
}

function SitemapHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm/6 font-medium text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 space-y-4 text-sm/6">{children}</ul>
}

function SitemapLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className="font-medium text-gray-950 data-hover:text-gray-950/75"
      />
    </li>
  )
}

// TODO: replace placeholder footer links when routes are implemented.
function Sitemap() {
  return (
    <>
      <div>
        <SitemapHeading>Product</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">How it works</SitemapLink>
          <SitemapLink href="#">Auto Apply</SitemapLink>
          <SitemapLink href="#">Tailored applications</SitemapLink>
          <SitemapLink href="/pricing">Pricing</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Resources</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Help center</SitemapLink>
          <SitemapLink href="#">Contact</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Company</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/company">About</SitemapLink>
          <SitemapLink href="/blog">Blog</SitemapLink>
          <SitemapLink href="#">Careers</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Legal</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Privacy policy</SitemapLink>
          <SitemapLink href="#">Terms of service</SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

function Copyright() {
  return (
    <div className="text-sm/6 text-gray-950">
      &copy; {new Date().getFullYear()} JobApply
    </div>
  )
}

export function Footer() {
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
        <Container>
          <CallToAction />
          <PlusGrid className="pb-16">
            <PlusGridRow>
              <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex">
                  <PlusGridItem className="pt-6 lg:pb-6">
                    <Link
                      href="/"
                      title="Home"
                      className="flex items-center gap-2"
                    >
                      <Mark className="h-9 fill-black" />
                      <span className="text-lg font-semibold tracking-tight text-gray-950">
                        JobApply
                      </span>
                    </Link>
                    <p className="mt-4 text-sm/6 text-gray-500">
                      Your job search, on autopilot.
                    </p>
                  </PlusGridItem>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                  <Sitemap />
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow>
              <PlusGridItem className="py-3">
                <Copyright />
              </PlusGridItem>
            </PlusGridRow>
          </PlusGrid>
        </Container>
      </Gradient>
    </footer>
  )
}
