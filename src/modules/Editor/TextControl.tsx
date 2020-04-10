import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { ColorSelect } from './partials/ColorSelect'
import { Caption } from './partials/common'
import { FontFamily } from './partials/FontFamily'
import { TextAlign } from './partials/TextAlign'
import { TextSize } from './partials/TextSize'
import {
  INITIAL,
  ANIMATE,
  createTransition,
  useTextControlAnimation,
} from 'common/animations'

// Components
const Wrapper = styled(motion.div)`
  align-self: center;
  position: absolute;
  right: 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-white-lighter);

  padding-bottom: 1.2em;
  margin-bottom: 1.2em;

  > *:last-child {
    margin-right: 0;
  }
`

const VerticalDivisor = styled.div`
  height: 1.4em;
  margin-right: 1.2em;
  border-left: 1px solid var(--color-white-lighter);
`

const TextControl: React.FC = (props) => {
  const style = useTextControlAnimation()

  return (
    <Wrapper
      initial={INITIAL}
      animate={ANIMATE}
      transition={createTransition(1.6)}
      {...props}
    >
      <motion.div style={style}>
        <Caption gutter>Text style</Caption>
        <Row>
          <TextAlign />
          <VerticalDivisor />
          <TextSize />
        </Row>

        <Row>
          <FontFamily />
        </Row>

        <ColorSelect />
      </motion.div>
    </Wrapper>
  )
}

export { TextControl }
