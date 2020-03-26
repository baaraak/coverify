import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import Snuggle from 'react-snuggle'

import { getPlaylist } from '../actions'
import penSrc from '../../assets/pen.svg'
import emptyCoverSrc from '../../assets/empty-cover.jpeg'
import { Name, Image, EditLayer, Handle, Button } from './style'
import { handleSelectPlaylist } from '../actions'
import EmptyState from './EmptyState'

const Playlists = () => {
  const dispatch = useDispatch()
  const playlist = useSelector(state => state.playlist)
  const playListIdSelected = useSelector(state => state.stage.playlistId)

  const token = useSelector(state => state.token)

  useEffect(() => {
    if (token) {
      getPlaylist(token, dispatch)
    }
  }, [dispatch, token])

  if (playlist.length === 0) {
    return <EmptyState />
  }

  return (
    <Snuggle>
      {playlist.map(element => {
        const isActive = playListIdSelected === element.id

        const image =
          element.images.length > 0 ? element.images[0].url : emptyCoverSrc

        return (
          <Button
            key={element.id}
            onClick={() => handleSelectPlaylist(element, dispatch)}
          >
            <Handle>
              {isActive && (
                <EditLayer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    src={penSrc}
                    alt="edit"
                  />
                </EditLayer>
              )}

              <Image
                style={{ backgroundImage: `url("${image}"` }}
                title={element.name}
              />
            </Handle>
            <Name>{element.name}</Name>
          </Button>
        )
      })}
    </Snuggle>
  )
}

export default Playlists
