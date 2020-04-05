import { DefaultRootState } from 'react-redux'

// Actions opts
enum types {
  USER_SIGN_REQUEST = 'USER_SIGN_REQUEST',
  USER_SIGN_RECEIVE = 'USER_SIGN_RECEIVE',
  USER_SIGN_ERROR = 'USER_SIGN_ERROR',

  USER_INFO_REQUEST = 'USER_INFO_REQUEST',
  USER_INFO_RECEIVE = 'USER_INFO_RECEIVE',
  USER_INFO_ERROR = 'USER_INFO_ERROR',

  LOG_OUT = 'LOG_OUT',
}

// Reducer stuff
export interface State {
  data?: { token?: string; userName?: string; userImage?: string }
  loading: boolean
  errorMessage?: string
}

export interface Actions {
  type: types
  payload?: string | { userName: string; userImage: string }
  meta?: { [key: string]: unknown }
}

const INITIAL_STATE: State = {
  data: undefined,
  loading: false,
  errorMessage: undefined,
}

const reducer = (state = INITIAL_STATE, { type, payload }: Actions) => {
  switch (type) {
    case types.USER_SIGN_REQUEST:
    case types.USER_INFO_REQUEST:
      return { ...state, loading: true }

    case types.USER_SIGN_ERROR:
    case types.USER_INFO_ERROR:
      return { ...INITIAL_STATE, errorMessage: payload }

    // Sign in
    case types.USER_SIGN_RECEIVE:
      return {
        ...state,
        data: { ...state.data, token: payload },
        loading: false,
      }

    // Fetch user data
    case types.USER_INFO_RECEIVE:
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

export { types, reducer, selectors }
