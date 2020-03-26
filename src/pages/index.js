import React from 'react'
import ReactGA from 'react-ga'

import Main from '../components/Main'

ReactGA.initialize('UA-161512799-1')
if (global.window) {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const Homepage = () => {
  return <Main />
}

export default Homepage
