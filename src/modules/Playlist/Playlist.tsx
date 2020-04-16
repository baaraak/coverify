import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { dispatchPlaylist } from './config/actions'
import { selectors } from './config/reducer'
import { Empty } from './Empty'
import { Item } from './Item'
import { Welcome } from './Welcome'
import { useAlert } from 'common/UI'
import {
  selectors as editorSelectors,
  actions as editorActions,
} from 'modules/Editor'
import { selectors as userSelectors } from 'modules/User'

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    width: calc(100% / 4 - 1em);
    margin-bottom: 2em;
  }
`

const Playlist = () => {
  // Handles
  const alert = useAlert()
  const dispatch = useDispatch()

  // States
  const isConnected = useSelector(userSelectors.isConnected)
  const errorMessage = useSelector(selectors.getPlaylistsError)
  const playlists = useSelector(selectors.getPlaylists)
  const playlistIdSelected = useSelector(editorSelectors.getPlaylistId)

  // Effects
  useEffect(() => {
    if (isConnected) {
      dispatch(dispatchPlaylist())
    }

    if (isConnected && errorMessage) {
      alert.error(`Error encountered to load the playlist: ${errorMessage}`)
    }
  }, [alert, dispatch, errorMessage, isConnected])

  // Renders
  if (!isConnected) {
    return <Welcome />
  }

  if (Array.isArray(playlists) && playlists.length > 0) {
    return (
      <Grid>
        {playlists.map((item) => {
          const isSelected = playlistIdSelected === item.id
          const onSelect = () => {
            dispatch(editorActions.dispatchPlaylistId(item.id))
            dispatch(editorActions.dispatchPlaylistName(item.name))
          }

          return (
            <Item
              onSelect={onSelect}
              key={item.id}
              isSelected={isSelected}
              data={item}
            />
          )
        })}
      </Grid>
    )
  }

  return <Empty />
}

export { Playlist }
