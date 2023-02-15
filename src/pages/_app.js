import Footer from '@/layout/footer'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import Header from '@/layout/header'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


export default function App({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </>
  )

}
