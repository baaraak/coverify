import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import DefaultButton from 'react-spotify-login'

import {
  dispatchLoading,
  dispatchError,
  dispatchUserToken,
} from './config/actions'
import { useGetInformationOfUser } from './config/actions'
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_URL,
  SPOTIFY_SCOPE,
} from './config/constants'
import { DependenciesContext } from 'common/service/context'

const UserLoginButton: React.FC = (props) => {
  const dispatch = useDispatch()
  const dependencies = useContext(DependenciesContext)

  // User Login
  const onRequest = () => dispatch(dispatchLoading())

  const onSuccess = (response: { access_token: string }) => {
    const spotifyToken = response.access_token

    // Creating context of services
    // TODO: fix any
    dependencies.create('spotify', { token: spotifyToken })

    // Full field reducer
    dispatch(dispatchUserToken(spotifyToken))
  }

  const onFailure = (response: Error) =>
    dispatch(dispatchError(response.message))

  /**
   * Listener of service to get the data of user
   */
  useGetInformationOfUser()

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
