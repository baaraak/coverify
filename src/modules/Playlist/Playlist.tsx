import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { useDispatchPlaylist } from './config/actions'
import { selectors as playlistSelector } from './config/reducer'
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
  const getPlaylist = useDispatchPlaylist()

  // Third-states
  const isConnected = useSelector(userSelectors.isConnected)
  const playlistIdSelected = useSelector(
    editorSelectors.getPlaylistId,
    shallowEqual
  )

  // Module states
  const errorMessage = useSelector(playlistSelector.getPlaylistsError)
  const playlists = useSelector(playlistSelector.getPlaylists)
  const playlistsLoading = useSelector(playlistSelector.getLoading)

  // Effects
  const getInfoOfUser = useCallback(async () => {
    if (isConnected) {
      await getPlaylist()
    }

    if (isConnected && errorMessage) {
      alert.error(`Error encountered to load the playlist: ${errorMessage}`)
    }
  }, [alert, errorMessage, isConnected])

  useEffect(() => {
    getInfoOfUser()
  }, [getInfoOfUser])

  // Renders
  if (playlistsLoading || !isConnected) {
    return <Welcome />
  }

  if (playlists.length > 0) {
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
