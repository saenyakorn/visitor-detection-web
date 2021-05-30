import React from 'react'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function withAuthGuard<T extends {}>(Component: React.ComponentType<T>) {
  return function EnhancedComponent(props: T) {
    const [session] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!session) router.replace('/api/auth/signin')
    }, [session, router])

    if (!session) return <></>
    return <Component {...props} />
  }
}
export { withAuthGuard }
