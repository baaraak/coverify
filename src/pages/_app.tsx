import App from 'next/app'
import React from 'react'

import 'wipe.css'

import { DependenciesProvider } from 'common/service/context'
import { ThemeProvider, Layout, AlertProvider } from 'common/UI'
import { DataProvider } from 'config/redux'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <DependenciesProvider>
        <DataProvider>
          <ThemeProvider>
            <AlertProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AlertProvider>
          </ThemeProvider>
        </DataProvider>
      </DependenciesProvider>
    )
  }
}

export default MyApp
