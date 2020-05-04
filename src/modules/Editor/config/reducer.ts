import { DefaultRootState } from 'react-redux'
import { CSSProperties } from 'styled-components'

import imagePlaceholderSrc from '../assets/image-placeholder.jpg'
import { types } from './actionTypes'
import { COLORS_SCHEMA } from './constants'
import { APP_NAME, URL } from 'common/constants'
import i18n from 'common/i18n'

/**
 * Initial state
 */
const INITIAL_STATE = {
  loading: false,
  errorMessage: undefined,
  colors: COLORS_SCHEMA[0],
  fontFamily: 'Montserrat',
  fontSize: 60,
  foreText: i18n.t('editor.foreText'),
  backgroundUrl: `${URL}/${imagePlaceholderSrc}`,
  mainText: i18n.t('editor.mainText'),
  playlistName: i18n.t('editor.playlistName', { appName: APP_NAME }),
  playlistId: '',
  textAlign: 'left',
}

/**
 * Types
 */
export type State = typeof INITIAL_STATE & {
  textAlign: CSSProperties['textAlign']
}

export interface Actions {
  type: types
  payload: string | number | State['colors']
  meta: keyof State
}

/**
 * Reducer
 */
const reducer = (state = INITIAL_STATE, { type, payload, meta }: Actions) => {
  switch (type) {
    case types.EDITOR_RESET:
      return INITIAL_STATE

    case types.EDITOR_LOADING:
      return { ...state, loading: true }

    case types.EDITOR_ERROR:
      return { ...state, loading: false, errorMessage: payload }

    case types.COVER_UPDATE_SUCCESS:
      return { ...state, loading: false, errorMessage: undefined }

    case types.EDITOR_UPDATE:
      return { ...state, loading: false, [meta]: payload }

    default:
      return state
  }
}

/**
 * Selector
 */
const selectors = {
  getEditor: (state: DefaultRootState) => state.editor,
  getEditorLoading: (state: DefaultRootState) => state.editor.loading,
  getTextAlign: (state: DefaultRootState) => state.editor.textAlign,
  getFontFamily: (state: DefaultRootState) => state.editor.fontFamily,
  getPlaylistName: (state: DefaultRootState) => state.editor.playlistName,
  getPlaylistId: (state: DefaultRootState) => state.editor.playlistId,
}

export { reducer, selectors, INITIAL_STATE }
