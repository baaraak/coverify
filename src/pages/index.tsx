import React from 'react'

import Core from 'modules/Core'
import { TextControl, Cover, Handle } from 'modules/Editor'
import Header from 'modules/Header'
import Navigation from 'modules/Navigation'
import SEO from 'modules/SEO'
import Stage from 'modules/Stage'

const Index: React.FC = () => {
  return (
    <Core>
      <SEO />
      <Header />

      <Stage>
        <Cover />
        <Handle />
        <TextControl />
      </Stage>

      <Navigation />
    </Core>
  )
}

export default Index
