import React, { useContext, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from 'react-spotify-login'

import {
  dispatchLoading,
  dispatchError,
  dispatchUserToken,
} from './config/actions'
import { useDispatchInformationOfUser } from './config/actions'
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_URL,
  SPOTIFY_SCOPE,
} from './config/constants'
import { selectors } from './config/reducer'
import { DependenciesContext } from 'common/service/context'

const UserLoginButton: React.FC = (props) => {
  const dispatch = useDispatch()
  const dependencies = useContext(DependenciesContext)
  const dispatchInformationOfUser = useDispatchInformationOfUser()
  const token = useSelector(selectors.getToken)

  // User Login
  const onRequest = () => dispatch(dispatchLoading())

  const onSuccess = (response: { access_token: string }) => {
    const spotifyToken = response.access_token

    // Creating context of services
    dependencies.create('spotify', { token: spotifyToken })

    // Full field reducer
    dispatch(dispatchUserToken(spotifyToken))
  }

  const onFailure = (response: Error) =>
    dispatch(dispatchError(response.message))

  const getInfoOfUser = useCallback(async () => {
    if (token) {
      await dispatchInformationOfUser()
    }
  }, [token])

  useEffect(() => {
    getInfoOfUser()
  }, [getInfoOfUser])

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
