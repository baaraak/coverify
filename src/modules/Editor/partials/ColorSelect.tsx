import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { dispatchColorSchema } from '../actions'
import { COLORS_SCHEMA } from '../constants'
import { State } from '../reducer'
import { Caption } from './common'
import { WHILE_HOVER, WHILE_TAP } from 'common/constants'

export const ColorsCol = styled.div`
  width: 18em;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin-top: 0.6em;
`

const ColorButton = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})`
  width: calc(12.5em / 4.6);
  height: 2.5em;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5em;

  div {
    width: 100%;

    &:first-child {
      height: 30%;
    }
    &:last-child {
      height: 70%;
    }
  }
`

const ColorSelect: React.FC = () => {
  const dispatch = useDispatch()

  const handle = (value: State['colors']) =>
    dispatch(dispatchColorSchema(value))

  return (
    <>
      <Caption>Color</Caption>
      <ColorsCol>
        {COLORS_SCHEMA.map((color, index) => {
          return (
            <ColorButton key={index} onClick={() => handle(color)}>
              <div style={{ backgroundColor: color.foreground }} />
              <div style={{ backgroundColor: color.main }} />
            </ColorButton>
          )
        })}
      </ColorsCol>
    </>
  )
}

export { ColorSelect }
