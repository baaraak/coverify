import React from 'react'
import { useDispatch } from 'react-redux'
import DefaultButton from 'react-spotify-login'

import { SPOTIFY_CLIENT_ID, SPOTIFY_URL, SPOTIFY_SCOPE } from './constants'
import { types } from './store'
import { createServicesContext } from 'common/context'

const UserLoginButton: React.FC = (props) => {
  const dispatch = useDispatch()

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
