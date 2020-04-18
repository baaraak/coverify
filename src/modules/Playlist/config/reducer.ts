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

const reducer = (state = INITIAL_STATE, { type, payload }: Actions) => {
  switch (type) {
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

const selectors = {
  getPlaylists: (state: DefaultRootState) => state.playlist.data,
  getLoading: (state: DefaultRootState) => state.playlist.loading,
  getPlaylistsError: (state: DefaultRootState) => state.playlist.errorMessage,
}

export { reducer, selectors }
