import dayjs from 'dayjs'
import { DefaultRootState } from 'react-redux'

import { types } from './actionTypes'

/**
 * Types
 */
export interface BackgroundItem {
  id?: string
  alt_description?: string
  urls?: Record<'raw' | 'regular' | 'full' | 'small' | 'thumb', string>
  color?: string
  width?: number
  height?: number
  user?: {
    name: string
    links: { html: string }
  }
}

export interface Actions {
  type: types
  payload?: string | Array<BackgroundItem>
  meta?: string
}

export type State = {
  search: string
  loading: boolean
  data: { [key: string]: { timestamp: number; data: BackgroundItem[] } }
  errorMessage?: string
}

/**
 * Reducer
 */
const INITIAL_STATE: State = {
  data: {},
  errorMessage: undefined,
  loading: false,
  search: '',
}

const reducer = (
  state = INITIAL_STATE,
  { type, payload, meta = '' }: Actions
) => {
  // Make sure do not overload the reducer, removing the oldest
  const sizeOfData = Object.keys(state.data).length
  const oldestValueOfData = Object.keys(state.data).sort((a, b) => {
    return state.data[a].timestamp - state.data[b].timestamp
  })[0]

  switch (type) {
    case types.BACKGROUND_SUCCESS:
      if (sizeOfData > 10) {
        delete state.data[oldestValueOfData]

        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            [meta]: {
              timestamp: new Date().getTime(),
              data: payload,
            },
          },
        }
      }

      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [meta]: {
            timestamp: new Date().getTime(),
            data: payload,
          },
        },
      }

    case types.BACKGROUND_SEARCH:
      return { ...state, search: payload }

    case types.BACKGROUND_LOADING:
      return { ...state, errorMessage: undefined, loading: true }

    case types.BACKGROUND_ERROR:
      return { ...INITIAL_STATE, errorMessage: payload }

    default:
      return state
  }
}

/**
 * Selector
 */
const getSearchQuery = (state: DefaultRootState) => state.backgrounds.search
const getData = (state: DefaultRootState) => {
  const data = state.backgrounds.data
  const query = getSearchQuery(state)

  if (data[query]) {
    return data[query].data
  }

  return []
}

const selectors = {
  getSearchQuery,
  getData,
  getLoading: (state: DefaultRootState) => state.backgrounds.loading,
  getErrorMessage: (state: DefaultRootState) => state.backgrounds.errorMessage,
  hasValidData: (state: DefaultRootState): boolean => {
    const data = state.backgrounds.data
    const query = getSearchQuery(state)

    // has no data
    if (!data[query]) {
      return false
    }

    // stale date
    const now = dayjs()
    const timestamp = data[query].timestamp

    // Greater than 30 minutes
    if (now.diff(timestamp, 'minute') > 30) {
      return false
    }

    return true
  },
}

export { reducer, selectors }
