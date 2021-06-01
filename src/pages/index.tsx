import { Dashboard, GettingStart } from '../components/templates'
import { useSession } from 'next-auth/client'

export default function HomePage() {
  const [session, loading] = useSession()

  if (loading) return <div></div>
  if (session) return <Dashboard />

  return <GettingStart />
}
