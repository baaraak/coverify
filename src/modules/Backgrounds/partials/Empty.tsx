import React from 'react'
import styled from 'styled-components'

import emptySrc from '../assets/not-found.svg'
import { Text } from 'common/UI'

const Wrapper = styled.div`
  padding: 1em 0 7em 0;
  text-align: center;

  img {
    display: inline-block;
    width: 30%;
    margin-bottom: 3em;
  }

  button {
    margin-top: 1em;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`

const Empty: React.FC<{ onClickRandomWord: () => void }> = ({
  onClickRandomWord,
}) => {
  return (
    <Wrapper>
      <img src={emptySrc} alt="NotFound" />
      <Text as="h2" size="heading" color="white-light">
        Oh crap, you&apos;ve got nothing. <br />
      </Text>

      <Text size="heading" color="white">
        <button onClick={onClickRandomWord}>
          Would you like any suggestions?
        </button>
      </Text>
    </Wrapper>
  )
}

export { Empty }
