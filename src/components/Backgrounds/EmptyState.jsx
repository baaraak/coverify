import React from 'react'
import styled from 'styled-components'

import emptyStateSrc from '../../assets/not-found.svg'

const Wrapper = styled.div`
  padding: 1em 0 7em 0;
  text-align: center;

  img {
    display: inline-block;
    width: 30%;
    margin-bottom: 3em;
  }

  p {
    font-size: 18px;
    line-height: 2;
    margin-top: 1em;
  }

  span {
    opacity: 0.6;
  }

  button {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`

const EmptyState = ({ randomWord }) => {
  return (
    <Wrapper>
      <img src={emptyStateSrc} alt="NotFound" />
      <br />
      <p>
        <span>
          Oh crap, you've got nothing. <br />
        </span>
        <button onClick={randomWord}>Would you like any suggestions?</button>
      </p>
    </Wrapper>
  )
}

export default EmptyState
