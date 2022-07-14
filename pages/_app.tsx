/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import Layout from '../components/Layout'
import { DEFAULT_THEME, myDarkTheme, myLightTheme } from '../components/ThemeSelect'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider themes={[myLightTheme, myDarkTheme]} themeType={DEFAULT_THEME}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GeistProvider>
  )
}

export default MyApp
