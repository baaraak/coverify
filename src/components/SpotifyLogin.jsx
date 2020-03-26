import React from 'react'
import Button from 'react-spotify-login'
import { useSelector, useDispatch } from 'react-redux'

import { SPOTIFY_CLIENT_ID, SPOTIFY_URL } from './constants'

const SpotifyLogin = props => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)

  const onSuccess = response => {
    dispatch({
      type: 'ADD_TOKEN',
      payload: { token: response.access_token },
    })
  }

  const onFailure = response => console.error(response)

  if (token) {
    return null
  }

  return (
    <Button
      {...props}
      clientId={SPOTIFY_CLIENT_ID}
      redirectUri={SPOTIFY_URL}
      onSuccess={onSuccess}
      onFailure={onFailure}
      scope="ugc-image-upload playlist-modify-public playlist-modify-private playlist-read-private"
    />
  )
}

export default SpotifyLogin
