import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { useStageAnimation } from 'common/animations'
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
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  right: 0;
  z-index: 9;
`

const CustomContainer = styled(Container)`
  display: flex;
  position: relative;
`

const Stage: React.FC = ({ children }) => {
  const { top, borderRadius, padding } = useStageAnimation()

  return (
    <Wrapper>
      <WrapperFixed style={{ top, borderRadius, paddingTop: padding }}>
        <CustomContainer>{children}</CustomContainer>
      </WrapperFixed>
    </Wrapper>
  )
}

export { Stage }
