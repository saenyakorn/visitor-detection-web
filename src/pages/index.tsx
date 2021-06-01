import { Dashboard, GettingStart } from '../components/templates'
import { useSession } from 'next-auth/client'
import { DataProvider } from 'context'

export default function HomePage() {
  const [session, loading] = useSession()

  if (loading) return <div></div>
  if (session) {
    return (
      <DataProvider>
        <Dashboard />
      </DataProvider>
    )
  }

  return <GettingStart />
}
