import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import DefaultButton from 'react-spotify-login'

import { SPOTIFY_CLIENT_ID, SPOTIFY_URL, SPOTIFY_SCOPE } from './constants'
import { types } from './store'
import { createServicesContext, context } from 'common/context'

const UserLoginButton: React.FC = (props) => {
  const dispatch = useDispatch()

  // User data
  const getInformationOfUser = useCallback(async () => {
    const { spotifyService } = context

    dispatch({ type: types.USER_INFO_REQUEST })

    try {
      const userData = await spotifyService?.getUserInformation()

      dispatch({ type: types.USER_INFO_RECEIVE, payload: userData })
    } catch (err) {
      dispatch({ type: types.USER_INFO_ERROR, payload: err.message })
    }
  }, [dispatch])

  // User Login
  const onRequest = () => {
    return dispatch({
      type: types.USER_SIGN_REQUEST,
    })
  }

  const onSuccess = (response: { access_token: string }) => {
    const spotifyToken = response.access_token

    // Creating context of services
    createServicesContext(spotifyToken)
    getInformationOfUser()

    return dispatch({ type: types.USER_SIGN_RECEIVE, payload: spotifyToken })
  }

  const onFailure = (response: Error) => {
    return dispatch({ type: types.USER_SIGN_ERROR, payload: response.message })
  }

  return (
    <DefaultButton
      {...props}
      onRequest={onRequest}
      clientId={SPOTIFY_CLIENT_ID}
      redirectUri={SPOTIFY_URL}
      onSuccess={onSuccess}
      onFailure={onFailure}
      scope={SPOTIFY_SCOPE}
    />
  )
}

export { UserLoginButton }
