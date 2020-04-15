import React from 'react'
import styled from 'styled-components'

import { COVER_SIZE_COMPACT } from 'common/sizes'
import { Tabs, Text, Container } from 'common/UI'
import Playlist from 'modules/Playlist'

const CustomContainer = styled(Container)`
  position: sticky;
  top: calc(${COVER_SIZE_COMPACT} + 2.2em);
`

const Navigation: React.FC = () => {
  return (
    <CustomContainer>
      <Tabs
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
    </CustomContainer>
  )
}

export { Navigation }
