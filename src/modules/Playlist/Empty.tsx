import React from 'react'
import styled from 'styled-components'

import emptySrc from './assets/Empty.svg'
import { Text } from 'common/UI'

const Wrapper = styled.div`
  padding: 5em 0 7em 0;
  text-align: center;
  width: 100%;

  img {
    display: inline-block;
    width: 30%;
    margin-bottom: 3em;
  }

  ${Text} {
    margin-top: 1em;
  }
`

const Empty = () => {
  return (
    <Wrapper>
      <img src={emptySrc} alt="Empty" />
      <Text as="h2" size="heading" color="white-light">
        Nothing to see here.
      </Text>
    </Wrapper>
  )
}

export { Empty }
