import type { State } from './reducer'
import { INITIAL_STATE } from './reducer'
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

/**
 * Update text align of cover
 */
const dispatchTextAlign = (value: string) => ({
  type: types.UPDATE_EDITOR,
  meta: 'textAlign',
  payload: value,
})

/**
 * Update font size of cover with min and max value
 */
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

/**
 * Update font family of cover
 */
const dispatchFontFamily = (fontFamily: string) => ({
  type: types.UPDATE_EDITOR,
  meta: 'fontFamily',
  payload: fontFamily,
})

/**
 * Update color schema of cover
 */
const dispatchColorSchema = (color: State['colors']) => ({
  type: types.UPDATE_EDITOR,
  meta: 'colors',
  payload: color,
})

const dispatchInitialAnimationOfMainText = (): ThunkResult<void> => (
  dispatch
) => {
  const { mainText } = INITIAL_STATE

  const boilerplateOfDispatch = (value: string) =>
    dispatch({ type: types.UPDATE_EDITOR, meta: 'mainText', payload: value })

  // Clean
  boilerplateOfDispatch('')

  // Typing
  setTimeout(() => {
    mainText.split('').reduce((acc, text, index) => {
      const updatedText = `${acc}${text}`

      setTimeout(() => {
        boilerplateOfDispatch(updatedText)
      }, 100 * index)

      return updatedText
    }, '')
  }, 1000)
}

export {
  types,
  dispatchTextAlign,
  dispatchFontSize,
  dispatchFontFamily,
  dispatchColorSchema,
  dispatchInitialAnimationOfMainText,
}
