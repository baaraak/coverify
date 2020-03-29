import React from 'react'
import styled from 'styled-components'

import { OutlineButton } from '../Button'
import SpotifyLogin from '../SpotifyLogin'
import emptyStateSrc from '../../assets/welcome.svg'

const Wrapper = styled.div`
  padding: 5em 0 7em 0;
  text-align: center;
  width: 100%;

  img {
    display: inline-block;
    width: 30%;
    margin-bottom: 3em;
  }

  p {
    font-size: 18px;
    line-height: 2;
    margin-top: 1em;
    opacity: 0.6;
  }
`

const EmptyState = () => {
  return (
    <Wrapper>
      <img src={emptyStateSrc} alt="Welcome" />
      <br />
      <OutlineButton as={SpotifyLogin}>Log in with Spotify</OutlineButton>
      <p>Import all playlist and edit its artwork</p>
    </Wrapper>
  )
}

export default EmptyState
