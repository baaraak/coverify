import React from 'react'

import Core from 'modules/Core'
import { TextControl, Cover, Handle } from 'modules/Editor'
import Header from 'modules/Header'
import Navigation from 'modules/Navigation'
import Stage from 'modules/Stage'

const Index: React.FC = () => {
  return (
    <Core>
      <Header />

      <Stage>
        <Cover />
        <Handle />
        <TextControl />
      </Stage>

      <Navigation />
      <div style={{ height: '200vh' }} />
    </Core>
  )
}

export default Index
