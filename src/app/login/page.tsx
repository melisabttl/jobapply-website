import { EASLI_APP_LOGIN_URL } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Authentication is owned by app.easli.co, not this marketing site — any
// visit to this route (bookmarks, old links, direct navigation) forwards
// straight to the real sign-in page instead of showing a local auth form.
export default function Login() {
  redirect(EASLI_APP_LOGIN_URL)
}
