import React from 'react'
import ReactGA from 'react-ga'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import Main from '../components/Main'
import AlertTemplate from '../components/Alert'

ReactGA.initialize('UA-161512799-1')
if (global.window) {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.FADE,
}

const Homepage = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Main />{' '}
    </AlertProvider>
  )
}

export default Homepage
