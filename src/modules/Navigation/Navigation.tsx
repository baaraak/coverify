import React from 'react'
import styled from 'styled-components'

import { COVER_SIZE_COMPACT, MAIN_BREAKPOINT } from 'common/sizes'
import { Tabs, Container } from 'common/UI'
import Backgrounds from 'modules/Backgrounds'
import Playlist from 'modules/Playlist'

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
            title: 'Background image',
            content: <Backgrounds />,
          },
          {
            title: 'My playlists',
            content: <Playlist />,
          },
        ]}
      />
    </Container>
  )
}

export { Navigation }
