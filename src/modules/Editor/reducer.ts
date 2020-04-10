import { DefaultRootState } from 'react-redux'
import { CSSProperties } from 'styled-components'

import type { Actions } from './actions'
import { types } from './actions'
import imagePlaceholderSrc from './assets/image-placeholder.jpg'
import { COLORS_SCHEMA } from './constants'
import { APP_NAME } from 'common/constants'

const INITIAL_STATE = {
  colors: COLORS_SCHEMA[0],
  fontFamily: 'Montserrat',
  fontSize: 60,
  foreText: 'This is',
  imageStage: imagePlaceholderSrc,
  mainText: 'Your best cover ever',
  name: `Welcome to ${APP_NAME}`,
  playlistId: null,
  textAlign: 'left',
}

export type State = typeof INITIAL_STATE & {
  textAlign: CSSProperties['textAlign']
}

const reducer = (state = INITIAL_STATE, { type, payload, meta }: Actions) => {
  switch (type) {
    case types.UPDATE_EDITOR:
      return { ...state, [meta]: payload }

    default:
      return state
  }
}

// Selectors
const selectors = {
  getEditor: (state: DefaultRootState) => state.editor,
  getTextAlign: (state: DefaultRootState) => state.editor.textAlign,
  getFontFamily: (state: DefaultRootState) => state.editor.fontFamily,
}

export { types, reducer, selectors, INITIAL_STATE }
