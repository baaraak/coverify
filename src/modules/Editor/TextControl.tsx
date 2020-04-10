import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { ColorSelect } from './partials/ColorSelect'
import { Caption } from './partials/common'
import { FontFamily } from './partials/FontFamily'
import { TextAlign } from './partials/TextAlign'
import { TextSize } from './partials/TextSize'
import { INITIAL, ANIMATE, createTransition } from 'common/animations'

// Components
const Wrapper = styled(motion.div)`
  align-self: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-white--light);

  padding-bottom: 1.2em;
  margin-bottom: 1.2em;

  > *:last-child {
    margin-right: 0;
  }
`

const VerticalDivisor = styled.div`
  height: 2em;
  margin-right: 1em;
  border-left: 1px solid var(--color-white--light);
`

const TextControl: React.FC = (props) => {
  return (
    <Wrapper
      initial={INITIAL}
      animate={ANIMATE}
      transition={createTransition(1.6)}
      {...props}
    >
      <Caption>Text style</Caption>
      <Row>
        <TextAlign />
        <VerticalDivisor />
        <TextSize />
      </Row>

      <Row>
        <FontFamily />
      </Row>

      <ColorSelect />
    </Wrapper>
  )
}

export { TextControl }
