import { useContext, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { types } from './actionTypes'
import { DependenciesContext } from 'common/service/context'

/**
 * Log out
 */
const dispatchLogOut = () => ({ type: types.LOG_OUT })

/**
 * Loading
 */
const dispatchLoading = () => ({
  type: types.USER_LOADING,
})

/**
 * User token
 */
const dispatchUserToken = (token: string) => ({
  type: types.USER_SIGN_SUCCESS,
  payload: token,
})

/**
 * Error
 */
const dispatchError = (message: string) => ({
  type: types.USER_ERROR,
  payload: message,
})

/**
 * Listener of event
 */
const useGetInformationOfUser = () => {
  const dispatch = useDispatch()
  const dependencies = useContext(DependenciesContext)
  const spotifyService = dependencies.get('spotify')

  /**
   * Handle
   */
  const submit = useCallback(async () => {
    // get service

    if (!spotifyService) {
      dispatch(dispatchError('Spotify services has not been created'))

      return
    }

    dispatch(dispatchLoading())

    try {
      const userData = await spotifyService.getUserInformation()
      dispatch({ type: types.USER_INFO_SUCCESS, payload: userData })
    } catch (err) {
      dispatch(dispatchError(err.message))
    }

    return
  }, [dispatch, spotifyService])

  /**
   * Effect with dependencies
   */
  useEffect(() => {
    if (spotifyService) {
      submit()
    }
  }, [submit, spotifyService])
}

export {
  dispatchError,
  dispatchLoading,
  dispatchLogOut,
  dispatchUserToken,
  useGetInformationOfUser,
}
