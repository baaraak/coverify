import App from 'next/app'
import React from 'react'

import 'wipe.css'
import Core from 'modules/Core'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Core>
        <Component {...pageProps} />
      </Core>
    )
  }
}

export default MyApp
