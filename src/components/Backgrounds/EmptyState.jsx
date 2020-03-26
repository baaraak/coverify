import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 140px 0;
  text-align: center;

  p {
    font-size: 18px;
    line-height: 2;
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
      <p>
        <span>
          Oh crap, you've got nothing. <br />
        </span>
        <button onClick={randomWord}>Would like some suggestion?</button>
      </p>
    </Wrapper>
  )
}

export default EmptyState
