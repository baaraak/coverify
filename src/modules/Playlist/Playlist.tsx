import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { dispatchPlaylist } from './config/actions'
import { selectors } from './config/reducer'
import { useAlert } from 'common/UI'
import { selectors as userSelectors } from 'modules/User'

const Playlist = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const isConnected = useSelector(userSelectors.isConnected)
  const errorMessage = useSelector(selectors.getPlaylistsError)

  useEffect(() => {
    if (isConnected) {
      dispatch(dispatchPlaylist())
    }

    if (isConnected && errorMessage) {
      alert.error(`Error encountered to load the playlist: ${errorMessage}`)
    }
  }, [alert, dispatch, errorMessage, isConnected])

  return null
}

export { Playlist }
