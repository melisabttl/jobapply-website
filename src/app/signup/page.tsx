import { EASLI_APP_REGISTER_URL } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Authentication is owned by app.easli.co, not this marketing site — any
// visit to this route (bookmarks, old links, direct navigation) forwards
// straight to the real sign-up page instead of showing a local auth form.
export default function Signup() {
  redirect(EASLI_APP_REGISTER_URL)
}
