import App from 'next/app'
import React from 'react'

import 'wipe.css'

import { ThemeProvider, Layout } from 'common/UI'
import { DataProvider } from 'config/redux'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <DataProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </DataProvider>
    )
  }
}

export default MyApp
