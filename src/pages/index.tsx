import React from 'react'

import Stage from '../modules/Stage'
import Core from 'modules/Core'
import { TextControl, Cover, Handle } from 'modules/Editor'
import Header, { BlurContainer } from 'modules/Header'

const Index: React.FC = () => {
  return (
    <Core>
      <Header />

      <BlurContainer>
        <Stage>
          <Cover />
          <Handle />
          <TextControl />
        </Stage>
      </BlurContainer>

      {/* <div style={{ height: '200vh' }} /> */}
    </Core>
  )
}

export default Index
