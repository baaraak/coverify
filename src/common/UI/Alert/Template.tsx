import React from 'react'
import { AlertComponentPropsWithStyle, AlertType } from 'react-alert'
import styled from 'styled-components'

type TypeProp = { type?: AlertType }

const setBackground = ({ type }: TypeProp) => {
  if (type === 'error') {
    return '--color-error'
  }

  return '--color-primary'
}

const Wrapper = styled.div<TypeProp>`
  background-color: var(${setBackground});
  padding: 1em 1.5em;
  border-radius: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.03);
  box-sizing: border-bo;
`

const Template: React.FC<AlertComponentPropsWithStyle> = ({
  message,
  options,
  style,
}) => {
  return (
    <Wrapper type={options.type} style={style}>
      {message}
    </Wrapper>
  )
}

export { Template }
