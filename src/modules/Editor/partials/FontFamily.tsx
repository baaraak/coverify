import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dispatchFontFamily } from '../actions'
import { selectors } from '../reducer'
import { Caption, Select } from './common'

const FontFamily = () => {
  const dispatch = useDispatch()
  const value = useSelector(selectors.getFontFamily)

  const handle = (event: FormEvent<HTMLSelectElement>) => {
    // TODO: fix type checking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(dispatchFontFamily((event.target as any).value))
  }

  return (
    <>
      <Caption>Typeface</Caption>

      <Select defaultValue={value} onChange={handle}>
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
    </>
  )
}

export { FontFamily }
