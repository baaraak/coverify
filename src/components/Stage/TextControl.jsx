import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { colorsScheme } from '../content'
import alignLeft from '../../assets/align-left.svg'
import alignCenter from '../../assets/align-center.svg'
import alignRight from '../../assets/align-right.svg'
import increaseFont from '../../assets/increase-font.svg'
import decreaseFont from '../../assets/decrease-font.svg'
import {
  Row,
  Button,
  Wrapper,
  Caption,
  VerticalDivisor,
  ColorButton,
  Colors,
  Select,
} from './TextControl.style'

const TEXT_SIZE = {
  RATE: 4,
  MAX: 80,
  MIN: 20,
}

const TextControl = props => {
  const dispatch = useDispatch()
  const { textAlign, fontSize, fontFamily } = useSelector(state => state.stage)

  const handleFontFamily = ({ target }) => {
    dispatch({
      type: 'UPDATE_STAGE',
      meta: 'fontFamily',
      payload: target.value,
    })
  }

  const handleTextAlign = value => {
    dispatch({ type: 'UPDATE_STAGE', meta: 'textAlign', payload: value })
  }

  const handleFontSize = increase => {
    const newValue = increase
      ? fontSize + TEXT_SIZE.RATE
      : fontSize - TEXT_SIZE.RATE

    dispatch({
      type: 'UPDATE_STAGE',
      meta: 'fontSize',
      payload: Math.max(TEXT_SIZE.MIN, Math.min(newValue, TEXT_SIZE.MAX)),
    })
  }

  const handleColor = value => {
    dispatch({ type: 'UPDATE_STAGE', meta: 'colors', payload: value })
  }

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

      <Caption style={{ marginTop: 20 }}>Color</Caption>
      <Colors>
        {colorsScheme.map((color, index) => {
          return (
            <ColorButton key={index} onClick={() => handleColor(color)}>
              <div style={{ backgroundColor: color.foreground }} />
              <div style={{ backgroundColor: color.main }} />
            </ColorButton>
          )
        })}
      </Colors>
    </Wrapper>
  )
}

export default TextControl
