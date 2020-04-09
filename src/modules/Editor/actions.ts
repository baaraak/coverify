import type { State } from './reducer'
import type { ThunkResult } from 'config/redux'

// Config
enum types {
  UPDATE_EDITOR = 'UPDATE_EDITOR',
}

export interface Actions {
  type: types
  payload: string | number | State['colors']
  meta: keyof State
}

// Actions
const dispatchTextAlign = (value: string) => ({
  type: types.UPDATE_EDITOR,
  meta: 'textAlign',
  payload: value,
})

const dispatchFontSize = (shouldIncrease: boolean): ThunkResult<void> => (
  dispatch,
  getState
) => {
  const {
    editor: { fontSize },
  } = getState()

  const TEXT_SIZE = {
    RATE: 4,
    MAX: 80,
    MIN: 20,
  }

  const newValue = shouldIncrease
    ? fontSize + TEXT_SIZE.RATE
    : fontSize - TEXT_SIZE.RATE

  dispatch({
    type: types.UPDATE_EDITOR,
    meta: 'fontSize',
    payload: Math.max(TEXT_SIZE.MIN, Math.min(newValue, TEXT_SIZE.MAX)),
  })
}

const dispatchFontFamily = (fontFamily: string) => ({
  type: types.UPDATE_EDITOR,
  meta: 'fontFamily',
  payload: fontFamily,
})

export { types, dispatchTextAlign, dispatchFontSize, dispatchFontFamily }
