import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'

import downloadSrc from './assets/download.svg'
import {
  useUpdateCoverOfPlaylist,
  useDownloadCoverOfPlaylist,
} from './config/actions'
import { selectors } from './config/reducer'
import {
  INITIAL_POSITION,
  ANIMATE_POSITION,
  createTransition,
  useHandleAnimation,
} from 'common/animations'
import { AUTHOR } from 'common/constants'
import i18n from 'common/i18n'
import { DependenciesContext } from 'common/service/context'
import { MAIN_BREAKPOINT } from 'common/sizes'
import { Text, Button, Loading } from 'common/UI'
import { truncate, scrollToAsync } from 'common/utils'
import { selectors as userSelectors } from 'modules/User'

const Wrapper = styled(motion.div)`
  order: -1;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    order: 0;
    align-self: flex-end;
    padding-right: 18em; /* width of text control */
  }
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
  // Action
  const updatePlaylistCover = useUpdateCoverOfPlaylist()
  const downloadPlaylistCover = useDownloadCoverOfPlaylist()
  const dependencies = useContext(DependenciesContext)
  const analyticsService = dependencies.get('analytics')

  // State
  const isConnected = useSelector(userSelectors.isConnected)
  const user = useSelector(userSelectors.getUserData, shallowEqual)
  const playlistName = useSelector(selectors.getPlaylistName)
  const loading = useSelector(selectors.getEditorLoading)

  // Animation
  const { opacity, offset, scale, padding } = useHandleAnimation()

  // Constants
  const playlistNameTruncate = truncate(playlistName)
  const createBy = (
    <>
      <span> {i18n.t('editor.createBy')}</span>{' '}
      {user.userName ? user.userName : AUTHOR}
    </>
  )

  // Handles
  const handleUpdateCover = async () => {
    await scrollToAsync()
    updatePlaylistCover()

    if (analyticsService) {
      analyticsService.logPageView('editor', 'update on spotify')
    }
  }

  const handleDownloadCover = async () => {
    await scrollToAsync()
    downloadPlaylistCover()

    if (analyticsService) {
      analyticsService.logPageView('editor', 'download cover')
    }
  }

  return (
    <Wrapper
      initial={INITIAL_POSITION}
      animate={ANIMATE_POSITION}
      transition={createTransition(1.4)}
      style={{ marginLeft: padding, marginBottom: padding }}
    >
      <Caption
        as={motion.p}
        size="small"
        style={{ opacity, marginBottom: offset }}
      >
        {isConnected ? i18n.t('editor.editing') : i18n.t('playlist')}
      </Caption>

      <Title as={motion.h2} size="huge" weight="bold" style={{ scale }}>
        {playlistNameTruncate}
      </Title>

      <Description as={motion.p} style={{ opacity, marginTop: offset }}>
        {createBy}
      </Description>

      <Actions>
        <Button variant="normal" onClick={handleUpdateCover}>
          {i18n.t('editor.updateOn', { where: i18n.t('spotify') })}
          <LoadingHandle
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: loading ? '1em' : 0, opacity: loading ? 1 : 0 }}
          >
            <Loading />
          </LoadingHandle>
        </Button>
        <Button variant="outline" onClick={handleDownloadCover}>
          <img width="15" src={downloadSrc} alt="Download img" />
        </Button>
      </Actions>
    </Wrapper>
  )
}

export { Handle }
