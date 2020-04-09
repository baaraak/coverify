import { context } from 'common/context'
import type { ThunkResult } from 'config/redux'

// Config
enum types {
  USER_REQUEST = 'USER_REQUEST',
  USER_ERROR = 'USER_ERROR',

  USER_INFO_RECEIVE = 'USER_INFO_RECEIVE',
  USER_SIGN_RECEIVE = 'USER_SIGN_RECEIVE',

  LOG_OUT = 'LOG_OUT',
}

export interface Actions {
  type: types
  payload?: string | { userName: string; userImage: string }
  meta?: { [key: string]: unknown }
}

// Actions
const dispatchLoading = () => ({
  type: types.USER_REQUEST,
})

const dispatchUserToken = (token: string) => ({
  type: types.USER_SIGN_RECEIVE,
  payload: token,
})

const dispatchError = (message: string) => ({
  type: types.USER_ERROR,
  payload: message,
})

const getInformationOfUser = (): ThunkResult<void> => async (dispatch) => {
  const { spotifyService } = context
  dispatch(dispatchLoading())

  try {
    const userData = await spotifyService?.getUserInformation()

    dispatch({ type: types.USER_INFO_RECEIVE, payload: userData })
  } catch (err) {
    dispatch(dispatchError(err.message))
  }
}

export {
  types,
  dispatchLoading,
  dispatchError,
  dispatchUserToken,
  getInformationOfUser,
}
