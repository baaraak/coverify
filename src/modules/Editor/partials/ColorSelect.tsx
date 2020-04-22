import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { dispatchColorSchema } from '../config/actions'
import { COLORS_SCHEMA } from '../config/constants'
import { State } from '../config/reducer'
import { Caption } from './common'
import { WHILE_HOVER, WHILE_TAP } from 'common/animations'
import i18n from 'common/i18n'
import { MAIN_BREAKPOINT } from 'common/sizes'

export const ColorsCol = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    width: 18em;
  }
`

const ColorButton = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})`
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5em;

  width: calc((100vw - 2em) / 6 - 0.5em);
  height: calc((100vw - 2em) / 6 - 0.5em);

  @media (min-width: ${MAIN_BREAKPOINT}) {
    width: calc(12.5em / 4.6);
    height: 2.5em;
  }

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
      <Caption gutter>{i18n.t('editor.color')}</Caption>
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
