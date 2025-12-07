import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to app directory route
    router.push('/home')
  }, [router])

  return null
}
