import App from 'next/app'
import React from 'react'

import 'wipe.css'

import { ThemeProvider, Layout, AlertProvider } from 'common/UI'
import { DataProvider } from 'config/redux'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <DataProvider>
        <ThemeProvider>
          <AlertProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AlertProvider>
        </ThemeProvider>
      </DataProvider>
    )
  }
}

export default MyApp
