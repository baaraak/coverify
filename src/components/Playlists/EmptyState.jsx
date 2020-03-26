import React from 'react'
import styled from 'styled-components'

import { OutlineButton } from '../Button'
import SpotifyLogin from '../SpotifyLogin'

const Wrapper = styled.div`
  padding: 100px 0;
  text-align: center;
  width: 100%;

  p {
    font-size: 18px;
    line-height: 2;
    margin-bottom: 12px;
  }
`

const EmptyState = () => {
  return (
    <Wrapper>
      <p>Import all playlist and edit its artwork</p>
      <OutlineButton as={SpotifyLogin}>Log in with Spotify</OutlineButton>
    </Wrapper>
  )
}

export default EmptyState
