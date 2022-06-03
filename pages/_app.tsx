/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'
import Layout from '../components/Layout'
import { DEFAULT_THEME } from '../components/ThemeSelect'

function MyApp({ Component, pageProps }: AppProps) {
  const [themeType, setThemeType] = useState(DEFAULT_THEME)
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Layout currentTheme={themeType} onSwitchTheme={setThemeType}>
        <Component {...pageProps} />
      </Layout>
    </GeistProvider>
  )
}

export default MyApp
