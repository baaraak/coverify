import { DefaultRootState } from 'react-redux'

import { types } from './actionsTypes'

export interface Actions {
  type: types
  payload?: string | Array<unknown>
}

const INITIAL_STATE = {
  loading: false,
  data: [],
  errorMessage: undefined,
}

export type State = typeof INITIAL_STATE & {
  data: Array<unknown>
}

const reducer = (state = INITIAL_STATE, { type, payload }: Actions) => {
  switch (type) {
    case types.PLAYLIST_LOADING:
      return { ...state, loading: true }

    case types.PLAYLIST_SUCCESS:
      return { ...state, loading: false, data: payload }

    case types.PLAYLIST_ERROR:
      return { ...INITIAL_STATE, errorMessage: payload }

    default:
      return state
  }
}

const selectors = {
  getPlaylists: (state: DefaultRootState) => state.playlist.data,
}

export { reducer, selectors }
