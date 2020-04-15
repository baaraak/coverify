import { DefaultRootState } from 'react-redux'

import { types } from './actionsTypes'

export interface Actions {
  type: types
  payload?: string | { userName: string; userImage: string }
  meta?: { [key: string]: unknown }
}

// Reducer stuff
export interface State {
  data?: { token?: string; userName?: string; userImage?: string }
  loading: boolean
  errorMessage?: string
}

const INITIAL_STATE: State = {
  data: undefined,
  loading: false,
  errorMessage: undefined,
}

const reducer = (state = INITIAL_STATE, { type, payload }: Actions) => {
  switch (type) {
    case types.USER_LOADING:
      return { ...state, loading: true }

    case types.USER_ERROR:
      return { ...INITIAL_STATE, errorMessage: payload }

    // Sign in
    case types.USER_SIGN_SUCCESS:
      return {
        ...state,
        data: { ...state.data, token: payload },
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
      return INITIAL_STATE

    default:
      return state
  }
}

// Selectors
const selectors = {
  getToken: (state: DefaultRootState) => state.user.data?.token,
  getUserData: (data: DefaultRootState) => {
    return {
      userName: data.user.data?.userName,
      userImage: data.user.data?.userImage,
    }
  },
  isConnected: (state: DefaultRootState) => {
    const payloadOfReducer = state.user.data

    if (!payloadOfReducer) {
      return false
    }

    return Object.values(payloadOfReducer).some((e) => !!e)
  },
}

export { reducer, selectors }
