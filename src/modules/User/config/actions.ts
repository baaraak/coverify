import { types } from './actionsTypes'
import { context } from 'common/context'
import type { ThunkResult } from 'config/redux'

// Actions
const dispatchLogOut = () => ({ type: types.LOG_OUT })

const dispatchLoading = () => ({
  type: types.USER_LOADING,
})

const dispatchUserToken = (token: string) => ({
  type: types.USER_SIGN_SUCCESS,
  payload: token,
})

const dispatchError = (message: string) => ({
  type: types.USER_ERROR,
  payload: message,
})

const dispatchInformationOfUser = (): ThunkResult<void> => async (dispatch) => {
  const { spotifyService } = context
  dispatch(dispatchLoading())

  try {
    const userData = await spotifyService?.getUserInformation()

    dispatch({ type: types.USER_INFO_SUCCESS, payload: userData })
  } catch (err) {
    dispatch(dispatchError(err.message))
  }
}

export {
  dispatchError,
  dispatchLoading,
  dispatchLogOut,
  dispatchUserToken,
  dispatchInformationOfUser,
}
