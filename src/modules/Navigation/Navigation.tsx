import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import i18n from 'common/i18n'
import { COVER_SIZE_COMPACT, MAIN_BREAKPOINT } from 'common/sizes'
import { Tabs, Container } from 'common/UI'

const Backgrounds = dynamic(() => import('modules/Backgrounds'), { ssr: false })
const Playlist = dynamic(() => import('modules/Playlist'), { ssr: false })

const CustomTab = styled(Tabs)`
  position: sticky;
  top: 4.8em;
  z-index: 5;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    top: calc(${COVER_SIZE_COMPACT} + 1.9em);
  }
`

const Navigation: React.FC = () => {
  return (
    <Container>
      <CustomTab
        data={[
          {
            title: i18n.t('navigation.backgroundImage'),
            content: <Backgrounds />,
          },
          {
            title: i18n.t('navigation.myPlaylists'),
            content: <Playlist />,
          },
        ]}
      />
    </Container>
  )
}

export { Navigation }
