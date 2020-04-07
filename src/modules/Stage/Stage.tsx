import { motion, useViewportScroll, useTransform } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { Container } from 'common/UI'

const Wrapper = styled.div`
  height: 32em;
  width: 100%;
  z-index: 9;
`

const WrapperFixed = styled(motion.div)`
  overflow: hidden;
  background: linear-gradient(
    0deg,
    var(--color-dark) 0%,
    var(--color-grey) 100%
  );
  height: 32em;

  position: fixed;
  top: 4.9em;
  left: 0;
  right: 0;
  z-index: 9;
`

const Stage: React.FC = ({ children }) => {
  const { scrollY } = useViewportScroll()
  const top = useTransform(scrollY, [0, 78], [78, 0])
  const borderRadius = useTransform(scrollY, [0, 78], [30, 0])

  return (
    <Wrapper>
      <WrapperFixed style={{ top, borderRadius }}>
        <Container>{children}</Container>
      </WrapperFixed>
    </Wrapper>
  )
}

export { Stage }
