import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import DefaultButton from 'react-spotify-login'

import {
  dispatchLoading,
  dispatchError,
  dispatchUserToken,
} from './config/actions'
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_URL,
  SPOTIFY_SCOPE,
} from './config/constants'
import { DependenciesContext } from 'common/service/context'

const UserLoginButton: React.FC = (props) => {
  const dispatch = useDispatch()
  const dependencies = useContext(DependenciesContext)
  const analyticsService = dependencies.get('analytics')

  // User Login
  const onRequest = () => dispatch(dispatchLoading())

  const onSuccess = (response: { access_token: string }) => {
    const spotifyToken = response.access_token

    // Creating context of services
    if (dependencies) {
      dependencies.create('spotify', { token: spotifyToken })
    }

    // Full field reducer
    dispatch(dispatchUserToken(spotifyToken))

    // Analytics
    if (analyticsService) {
      analyticsService.logEvent('user', 'login')
    }
  }

  const onFailure = (response: Error) => {
    dependencies.destroy('spotify')
    dispatch(dispatchError(response.message))
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
