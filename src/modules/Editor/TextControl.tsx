import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { ColorSelect } from './partials/ColorSelect'
import { Caption } from './partials/common'
import { FontFamily } from './partials/FontFamily'
import { TextAlign } from './partials/TextAlign'
import { TextSize } from './partials/TextSize'
import {
  INITIAL_POSITION,
  ANIMATE_POSITION,
  createTransition,
  useTextControlAnimation,
} from 'common/animations'
import i18n from 'common/i18n'
import { MAIN_BREAKPOINT } from 'common/sizes'

// Components
const Wrapper = styled(motion.div)`
  @media (min-width: ${MAIN_BREAKPOINT}) {
    align-self: center;
    position: absolute;
    right: 1em;
  }
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
      initial={INITIAL_POSITION}
      animate={ANIMATE_POSITION}
      transition={createTransition(1.6)}
      {...props}
    >
      <motion.div style={style}>
        <Caption gutter>{i18n.t('editor.textStyle')}</Caption>
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
