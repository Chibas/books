import '../styles/globals.css'
import MainLayout from '../layout/MainLayout'

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout title="Bookap | All books">
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
