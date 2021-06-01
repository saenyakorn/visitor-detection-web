import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { NavBar } from '../components/molecules/NavBar'
import NProgress from 'nprogress'
import Head from 'next/head'
import { Provider } from 'next-auth/client'

require('../styles/theme.less')

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const routeChangeStart = () => NProgress.start()
    const routeChangeComplete = () => NProgress.done()
    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)
    router.events.on('routeChangeError', routeChangeComplete)
    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
      router.events.off('routeChangeError', routeChangeComplete)
    }
  })

  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Visitor Detection</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar href={router.pathname} />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
