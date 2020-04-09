import React from 'react'
import { useDispatch } from 'react-redux'
import DefaultButton from 'react-spotify-login'

import { dispatchLoading, dispatchError, dispatchUserToken } from './actions'
import { SPOTIFY_CLIENT_ID, SPOTIFY_URL, SPOTIFY_SCOPE } from './constants'
import { createServicesContext } from 'common/context'

const UserLoginButton: React.FC = (props) => {
  const dispatch = useDispatch()

  // User Login
  const onRequest = () => dispatch(dispatchLoading())

  const onSuccess = (response: { access_token: string }) => {
    const spotifyToken = response.access_token

    // Creating context of services
    createServicesContext(spotifyToken)

    // Full field reducer
    dispatch(dispatchUserToken(spotifyToken))
  }

  const onFailure = (response: Error) =>
    dispatch(dispatchError(response.message))

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
