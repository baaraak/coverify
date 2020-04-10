import { motion, useViewportScroll, useTransform } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { HEADER_HEIGHT, STAGE_HEIGHT } from 'common/sizes'
import { Container } from 'common/UI'

const Wrapper = styled.div`
  height: ${STAGE_HEIGHT};
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
  height: ${STAGE_HEIGHT};
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  right: 0;
  z-index: 9;
`

const CustomContainer = styled(Container)`
  display: flex;
  margin-top: 2em;
`

const Stage: React.FC = ({ children }) => {
  const { scrollY } = useViewportScroll()
  const top = useTransform(scrollY, [0, 78], [78, 0])
  const borderRadius = useTransform(scrollY, [0, 78], [30, 0])

  return (
    <Wrapper>
      <WrapperFixed style={{ top, borderRadius }}>
        <CustomContainer>{children}</CustomContainer>
      </WrapperFixed>
    </Wrapper>
  )
}

export { Stage }
