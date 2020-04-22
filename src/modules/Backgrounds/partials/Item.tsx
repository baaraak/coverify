import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { BackgroundItem } from '../config/reducer'
import { WHILE_HOVER, WHILE_TAP } from 'common/animations'
import { APP_NAME } from 'common/constants'
import i18n from 'common/i18n'
import { Text } from 'common/UI'

const Image = styled.img`
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  border-radius: 2px;
  width: 100%;
  height: auto;
`

const Copyright = styled(Text)`
  text-align: left;
  margin-top: 10px;

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`

interface ItemProps {
  element: BackgroundItem
  pickImage: (element: BackgroundItem) => void
}

const Item: React.FC<ItemProps> = ({ element, pickImage }) => {
  return (
    <motion.button
      key={element.id}
      onClick={() => pickImage(element)}
      whileHover={WHILE_HOVER}
      whileTap={WHILE_TAP}
    >
      <Image
        src={element?.urls?.small}
        alt={element?.alt_description}
        width={element.width}
        height={element.height}
      />

      <Copyright color="white-light" size="small">
        {i18n.t('navigation.photoBy')}{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${element?.user?.links?.html}?utm_source=${APP_NAME}&utm_medium=referral`}
        >
          {element?.user?.name}
        </a>{' '}
        {i18n.t('navigation.photoByOn')}{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`}
        >
          Unsplash
        </a>
      </Copyright>
    </motion.button>
  )
}

export { Item }
