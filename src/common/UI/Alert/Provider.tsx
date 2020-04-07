import React from 'react'
import { transitions, positions, Provider } from 'react-alert'

import { Template } from './Template'

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '.5em',
  transition: transitions.FADE,
}

const AlertProvider: React.FC = ({ children }) => {
  return (
    <Provider template={Template} {...options}>
      {children}
    </Provider>
  )
}

export { AlertProvider }
