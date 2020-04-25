import { DefaultRootState } from 'react-redux'

import { types } from './actionTypes'

/**
 * Types
 */
export interface Actions {
  type: types
  payload?: string | PlaylistItem[]
}

export interface PlaylistItem {
  id: string
  image?: string
  name: string
}

export type State = {
  loading: boolean
  data: PlaylistItem[]
  errorMessage?: string
}

/**
 * Reducer
 */
const INITIAL_STATE: State = {
  loading: false,
  data: [],
  errorMessage: undefined,
}

const reducer = (state = INITIAL_STATE, { type, payload }: Actions) => {
  switch (type) {
    case types.PLAYLIST_RESET:
      return INITIAL_STATE

    case types.PLAYLIST_LOADING:
      return { ...INITIAL_STATE, loading: true }

    case types.PLAYLIST_SUCCESS:
      return { ...state, loading: false, data: payload }

    case types.PLAYLIST_ERROR:
      return { ...INITIAL_STATE, errorMessage: payload }

    default:
      return state
  }
}

/**
 * Selector
 */
const selectors = {
  getData: (state: DefaultRootState) => state.playlist.data,
  getLoading: (state: DefaultRootState) => state.playlist.loading,
  getErrorMessage: (state: DefaultRootState) => state.playlist.errorMessage,
}

export { reducer, selectors }
