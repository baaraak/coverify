import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { useGetPlaylist } from './config/actions'
import { selectors as playlistSelector } from './config/reducer'
import { Empty } from './partials/Empty'
import { Item } from './partials/Item'
import { Welcome } from './Welcome'
import { MAIN_BREAKPOINT } from 'common/sizes'
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
    width: calc(100% / 2 - 0.5em);
    margin-bottom: 1em;

    @media (min-width: ${MAIN_BREAKPOINT}) {
      width: calc(100% / 4 - 1em);
      margin-bottom: 2em;
    }
  }
`

const Playlist = () => {
  // Handles
  const dispatch = useDispatch()

  // Third-states
  const isConnected = useSelector(userSelectors.isConnected)
  const playlistIdSelected = useSelector(
    editorSelectors.getPlaylistId,
    shallowEqual
  )

  // Module states
  const playlists = useSelector(playlistSelector.getData, shallowEqual)
  const playlistsLoading = useSelector(playlistSelector.getLoading)

  // Get data of playlist
  useGetPlaylist()

  // If there is no playlist picked, then selected the first one
  useEffect(() => {
    if (playlists.length > 0 && !playlistIdSelected) {
      dispatch(editorActions.dispatchPlaylistId(playlists[0].id))
      dispatch(editorActions.dispatchPlaylistName(playlists[0].name))
    }
  }, [playlists, dispatch, playlistIdSelected])

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
