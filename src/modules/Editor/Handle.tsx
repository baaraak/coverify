import { motion } from 'framer-motion'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'

import downloadSrc from './assets/download.svg'
import { selectors } from './config/reducer'
import { INITIAL, ANIMATE, createTransition } from 'common/animations'
import { AUTHOR } from 'common/constants'
import { Text, Button, Loading } from 'common/UI'
import { truncate } from 'common/utils'
import { selectors as userSelectors } from 'modules/User'

const Wrapper = styled(motion.div)`
  margin-left: 3em;
  margin-bottom: 3em;
  align-self: flex-end;
`

const Caption = styled(Text)`
  text-transform: uppercase;
`

export const Title = styled(Text)`
  transform-origin: left;
`

export const Description = styled(Text)`
  padding: 0.5em 0;

  span {
    opacity: 0.5;
  }
`

export const Actions = styled.div`
  margin-top: 1.2em;

  > * {
    margin-right: 1.2em;
  }
`

export const LoadingHandle = styled(motion.div)`
  display: inline-block;
  margin-left: 1em;
  margin-right: -1em;
  overflow: hidden;

  svg {
    width: 1em;
    height: auto;
  }
`

const Handle: React.FC = () => {
  // const dispatch = useDispatch()

  // State
  const isConnected = useSelector(userSelectors.isConnected)
  const user = useSelector(userSelectors.getUserData, shallowEqual)
  const playlistName = useSelector(selectors.getPlaylistName)
  const loading = useSelector(selectors.getEditorLoading)

  // Constants
  const playlistNameTruncate = truncate(playlistName)
  const createBy = (
    <>
      <span> Create by</span> {user.userName ? user.userName : AUTHOR}
    </>
  )

  return (
    <Wrapper
      initial={INITIAL}
      animate={ANIMATE}
      transition={createTransition(1.4)}
    >
      <Caption
        as={motion.p}
        size="small"
        // style={{ opacity, marginBottom: variationFadeIn }}
      >
        {isConnected ? "You're editing" : 'Playlist'}
      </Caption>

      <Title
        as={motion.h2}
        size="huge"
        weight="bold"
        // style={{ scale }}
      >
        {playlistNameTruncate}
      </Title>

      <Description
        as={motion.p}
        // style={{ opacity, marginTop: variationFadeIn }}
      >
        {createBy}
      </Description>

      <Actions>
        <Button
          variant="normal"
          // onClick={takePrint}
        >
          Update on Spotify
          <LoadingHandle
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: loading ? '1em' : 0, opacity: loading ? 1 : 0 }}
          >
            <Loading />
          </LoadingHandle>
        </Button>
        <Button
          variant="outline"
          // onClick={downloadCover}
        >
          <img width="15" src={downloadSrc} alt="Download img" />
        </Button>
      </Actions>
    </Wrapper>
  )
}

export { Handle }
