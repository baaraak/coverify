import React, { useContext, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dispatchFontFamily } from '../config/actions'
import { selectors } from '../config/reducer'
import { Caption, Select } from './common'
import i18n from 'common/i18n'
import { DependenciesContext } from 'common/service/context'

const FontFamily = () => {
  const dispatch = useDispatch()
  const value = useSelector(selectors.getFontFamily)
  const dependencies = useContext(DependenciesContext)
  const analyticsService = dependencies.get('analytics')

  const handle = (event: FormEvent<HTMLSelectElement>) => {
    // TODO: Why events are so hard to handle?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (event.target as any).value
    dispatch(dispatchFontFamily(value))

    if (analyticsService) {
      analyticsService.logEvent('editor', `pick ${value})`)
    }
  }

  return (
    <>
      <Caption>{i18n.t('editor.typeface')}</Caption>

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
