import { DefaultRootState } from 'react-redux'

import { types } from './actionTypes'
import { persistor } from './persistor'

/**
 * Types
 */
export interface Actions {
  type: types
  payload?: string | { userName: string; userImage: string }
  meta?: { [key: string]: unknown }
}

export interface State {
  data?: { userName?: string; userImage?: string }
  token?: string
  loading: boolean
  errorMessage?: string
}

/**
 * Reducer
 */
const getInitialState = (): State => ({
  data: undefined,
  token: persistor.get(),
  loading: false,
  errorMessage: undefined,
})

const reducer = (state = getInitialState(), { type, payload }: Actions) => {
  switch (type) {
    case types.USER_LOADING:
      return { ...state, errorMessage: undefined, loading: true }

    case types.USER_ERROR:
      persistor.remove()

      return { ...getInitialState(), errorMessage: payload }

    // Sign in
    case types.USER_SIGN_SUCCESS:
      persistor.set(payload as string)

      return {
        ...state,
        data: { ...state.data },
        token: payload,
        loading: false,
      }

    // Fetch user data
    case types.USER_INFO_SUCCESS:
      if (typeof payload === 'object') {
        return {
          ...state,
          data: { ...state.data, ...payload },
          loading: false,
        }
      }

      return state

    // End session
    case types.LOG_OUT:
      persistor.remove()

      return getInitialState()

    default:
      return state
  }
}

/**
 * Selector
 */
const selectors = {
  getToken: (state: DefaultRootState) => state.user.token,
  getUserData: (data: DefaultRootState) => {
    return {
      userName: data.user.data?.userName,
      userImage: data.user.data?.userImage,
    }
  },
  getLoading: (state: DefaultRootState) => state.user.loading,
  getErrorMessage: (state: DefaultRootState) => state.user.errorMessage,
  isConnected: (state: DefaultRootState) => {
    const payloadOfReducer = state.user.data

    if (!payloadOfReducer) {
      return false
    }

    return Object.values(payloadOfReducer).some((e) => !!e)
  },
}

export { reducer, selectors }
