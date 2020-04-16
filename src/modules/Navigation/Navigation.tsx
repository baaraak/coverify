import React from 'react'
import styled from 'styled-components'

import { COVER_SIZE_COMPACT } from 'common/sizes'
import { Tabs, Text, Container } from 'common/UI'
import Playlist from 'modules/Playlist'

const CustomTab = styled(Tabs)`
  position: sticky;
  top: calc(${COVER_SIZE_COMPACT} + 1.9em);
  z-index: 999;
`

const Navigation: React.FC = () => {
  return (
    <Container>
      <CustomTab
        data={[
          {
            title: 'My playlists',
            content: <Playlist />,
          },
          {
            title: 'Background image',
            content: <Text color="white">Tab 2</Text>,
          },
        ]}
      />
    </Container>
  )
}

export { Navigation }
