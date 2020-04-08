import { motion } from 'framer-motion'
import React, { FormEvent } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled, { css } from 'styled-components'

import alignCenter from './assets/align-center.svg'
import alignLeft from './assets/align-left.svg'
import alignRight from './assets/align-right.svg'
import decreaseFont from './assets/decrease-font.svg'
import increaseFont from './assets/increase-font.svg'
import { COLORS_SCHEMA } from './constants'
import { types, State, selectors } from './store'
import { WHILE_HOVER, WHILE_TAP } from 'common/constants'

// Components
export const Wrapper = styled(motion.div)`
  align-self: center;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-white--light);

  padding-bottom: 1.2em;
  margin-bottom: 1.2em;

  > *:last-child {
    margin-right: 0;
  }
`

export const VerticalDivisor = styled.div`
  height: 2em;
  margin-right: 1em;
  border-left: 1px solid var(--color-white--light);
`

export const Caption = styled.p`
  font-size: var(--size-normal);
  color: var(--color-white);
`

export const Select = styled.select`
  padding: 0 1.4em;
  color: var(--color-white);
`

export const Button = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})`
  opacity: 0.6;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-right: 1em;
  padding: 0.2em;
  border-radius: 3px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      background: var(--color-grey);
      opacity: 1;
    `}

  img {
    width: 1.6em;
  }
`

export const ColorsCol = styled.div`
  width: 18em;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin-top: 0.6em;
`

export const ColorButton = styled(motion.button).attrs({
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

// Constants
const TEXT_SIZE = {
  RATE: 4,
  MAX: 80,
  MIN: 20,
}

const TextControl: React.FC = (props) => {
  // States
  const dispatch = useDispatch()
  const { textAlign, fontSize, fontFamily } = useSelector(
    selectors.getEditor,
    shallowEqual
  )

  // Handles
  const handleFontFamily = (event: FormEvent<HTMLSelectElement>) =>
    dispatch({
      type: types.UPDATE_EDITOR,
      meta: 'fontFamily',
      // TODO: fix type checking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: (event.target as any).value,
    })

  const handleTextAlign = (value: 'left' | 'center' | 'right') =>
    dispatch({ type: types.UPDATE_EDITOR, meta: 'textAlign', payload: value })

  const handleFontSize = (shouldIncrease: boolean) => {
    const newValue = shouldIncrease
      ? fontSize + TEXT_SIZE.RATE
      : fontSize - TEXT_SIZE.RATE

    dispatch({
      type: types.UPDATE_EDITOR,
      meta: 'fontSize',
      payload: Math.max(TEXT_SIZE.MIN, Math.min(newValue, TEXT_SIZE.MAX)),
    })
  }

  const handleColor = (value: State['colors']) =>
    dispatch({ type: types.UPDATE_EDITOR, meta: 'colors', payload: value })

  return (
    <Wrapper {...props}>
      <Caption>Text style</Caption>
      <Row>
        <Button
          active={textAlign === 'left'}
          onClick={() => handleTextAlign('left')}
        >
          <img src={alignLeft} alt="Align text to left" />
        </Button>
        <Button
          active={textAlign === 'center'}
          onClick={() => handleTextAlign('center')}
        >
          <img src={alignCenter} alt="Align text to Center" />
        </Button>
        <Button
          active={textAlign === 'right'}
          onClick={() => handleTextAlign('right')}
        >
          <img src={alignRight} alt="Align text to Right" />
        </Button>

        <VerticalDivisor />

        <Button onClick={() => handleFontSize(false)}>
          <img src={decreaseFont} alt="Decrease font" />
        </Button>
        <Button onClick={() => handleFontSize(true)}>
          <img src={increaseFont} alt="Increase font" />
        </Button>
      </Row>

      <Row>
        <Caption>Typeface</Caption>

        <Select defaultValue={fontFamily} onChange={handleFontFamily}>
          <option disabled>Sans serif ———</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Noto Sans">Noto Sans</option>
          <option value="Oswald">Oswald</option>
          <option value="Space Mono">Space Mono</option>
          <option disabled>Handwriting ——</option>
          <option value="Caveat">Caveat</option>
          <option value="Indie Flower">Indie Flower</option>
          <option disabled>Serif —————–</option>
          <option value="Abril Fatface">Abril Fatface</option>
          <option value="Cormorant">Cormorant</option>
          <option value="Merriweather">Merriweather</option>
          <option value="Playfair Display">Playfair Display</option>
          <option value="Slabo">Slabo</option>
          <option disabled>Display —––—––</option>
          <option value="Bangers">Bangers</option>
          <option value="Concert One">Concert One</option>
          <option value="IBM Plex Mono">IBM Plex Mono</option>
          <option value="Monoton">Monoton</option>
        </Select>
      </Row>

      <Caption>Color</Caption>
      <ColorsCol>
        {COLORS_SCHEMA.map((color, index) => {
          return (
            <ColorButton key={index} onClick={() => handleColor(color)}>
              <div style={{ backgroundColor: color.foreground }} />
              <div style={{ backgroundColor: color.main }} />
            </ColorButton>
          )
        })}
      </ColorsCol>
    </Wrapper>
  )
}

export { TextControl }
