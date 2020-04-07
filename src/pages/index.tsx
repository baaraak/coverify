import React from 'react'

import Stage from '../modules/Stage'
import Core from 'modules/Core'
import Header, { BlurContainer } from 'modules/Header'

const Index: React.FC = () => {
  return (
    <Core>
      <Header />

      <BlurContainer>
        <Stage>Stage</Stage>
      </BlurContainer>

      <div style={{ height: '200vh' }} />
    </Core>
  )
}

export default Index
