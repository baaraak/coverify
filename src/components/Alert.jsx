import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ type }) => (type === 'error' ? '#d24444' : '#1db954')};
  padding: 1.5em;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.03);
  box-sizing: border-bo;
`

const AlertTemplate = ({ message, options, style }) => {
  return (
    <Wrapper type={options.type} style={style}>
      {message}
    </Wrapper>
  )
}

export default AlertTemplate
