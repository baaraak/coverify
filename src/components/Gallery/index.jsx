import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { Tab, TabItem, Container } from './style'
import Images from '../Backgrounds'
import Playlists from '../Playlists'
import {
  INITIAL_INVERTED,
  ANIMATE,
  createTransition,
} from '../initialTransition'

const Gallery = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const activeStyle = item => {
    if (currentTab === item) {
      return {
        position: 'relative',
        zIndex: 3,
      }
    }

    return {
      height: 200,
      overflow: 'hidden',
      pointerEvent: 'none',
      position: 'absolute',
      top: 20,
      width: '100%',
      zIndex: 1,
    }
  }

  const playlistActive = currentTab === 0
  const imagesActive = currentTab === 1

  return (
    <motion.div>
      <Tab>
        <TabItem
          initial={INITIAL_INVERTED}
          animate={ANIMATE}
          transition={createTransition(1.4)}
          onClick={() => setCurrentTab(0)}
          active={playlistActive}
        >
          My playlists
        </TabItem>
        <TabItem
          initial={INITIAL_INVERTED}
          animate={ANIMATE}
          transition={createTransition(1.5)}
          onClick={() => setCurrentTab(1)}
          active={imagesActive}
        >
          Background image
        </TabItem>
      </Tab>

      <Container
        initial={INITIAL_INVERTED}
        animate={ANIMATE}
        transition={createTransition(2)}
      >
        <motion.div
          animate={{
            opacity: playlistActive ? 1 : 0,
            y: playlistActive ? 0 : 50,
          }}
          style={activeStyle(0)}
        >
          <Playlists />
        </motion.div>

        <motion.div
          animate={{
            opacity: imagesActive ? 1 : 0,
            y: imagesActive ? 0 : 50,
          }}
          style={activeStyle(1)}
        >
          <Images />
        </motion.div>
      </Container>
    </motion.div>
  )
}

export default Gallery
