import { AppProps } from 'next/dist/next-server/lib/router/router'
import '@app/styles/theme.less'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
