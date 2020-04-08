import { DefaultRootState } from 'react-redux'

import imagePlaceholderSrc from './assets/image-placeholder.jpg'
import { COLORS_SCHEMA } from './constants'
import { APP_NAME } from 'common/constants'

// Actions opts
enum types {
  UPDATE_EDITOR = 'UPDATE_EDITOR',
}

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

export type State = typeof INITIAL_STATE

export interface Actions {
  type: types
  payload: string | number | State['colors']
  meta: keyof State
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
}

export { types, reducer, selectors }
