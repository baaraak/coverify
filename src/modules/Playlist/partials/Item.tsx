import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import emptyArtwork from '../assets/empty-artwork.jpeg'
import penSrc from '../assets/pen.svg'
import { PlaylistItem } from '../config/reducer'
import { WHILE_HOVER, WHILE_TAP } from 'common/animations'
import i18n from 'common/i18n'
import { MAIN_BREAKPOINT } from 'common/sizes'
import { Text } from 'common/UI'

export const Button = styled(motion.button)`
  width: 100%;
`

export const Name = styled(Text)`
  font-weight: 600;
  margin-top: 1em;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Image = styled.div`
  border-radius: 2px;
  width: 100%;
  padding-top: 100%;

  background-size: cover;
  background-position: center;
`

export const Handle = styled.div`
  position: relative;
  width: 100%;
`

export const EditLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  text-align: center;

  div {
    margin: auto;
    width: 60%;
    line-height: 1.5;
  }

  img {
    display: inline-block;
    width: 2.5em;

    @media (min-width: ${MAIN_BREAKPOINT}) {
      margin-bottom: 1em;
    }
  }

  ${Text} {
    display: none;

    @media (min-width: ${MAIN_BREAKPOINT}) {
      display: block;
    }
  }
`

const Item: React.FC<{
  data: PlaylistItem
  onSelect: () => void
  isSelected: boolean
}> = ({ onSelect, data, isSelected }) => {
  return (
    <Button onClick={onSelect} whileHover={WHILE_HOVER} whileTap={WHILE_TAP}>
      <Handle>
        {isSelected && (
          <EditLayer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                src={penSrc}
                alt="edit"
              />
              <Text color="white" size="medium">
                {i18n.t('editingPlaylist')}
              </Text>
            </div>
          </EditLayer>
        )}

        <Image
          style={{ backgroundImage: `url("${data.image ?? emptyArtwork}"` }}
          title={data.name}
        />
      </Handle>
      <Name color="white">{data.name}</Name>
    </Button>
  )
}

export { Item }
