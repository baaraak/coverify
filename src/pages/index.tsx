import React from 'react'

import { COVER_ID } from 'common/constants'
import Core from 'modules/Core'
import { TextControl, Cover, Handle } from 'modules/Editor'
import Header from 'modules/Header'
import Navigation from 'modules/Navigation'
import SEO from 'modules/SEO'
import Stage from 'modules/Stage'

const Index: React.FC = () => {
  return (
    <Core>
      {/* Dammit Window. */}
      <Cover
        id={COVER_ID}
        style={{ position: 'absolute', left: -1000, top: -1000 }}
      />

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
