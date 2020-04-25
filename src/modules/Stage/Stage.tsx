import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { useStageAnimation } from 'common/animations'
import { HEADER_HEIGHT, STAGE_HEIGHT, MAIN_BREAKPOINT } from 'common/sizes'
import { Container } from 'common/UI'

const Wrapper = styled.div`
  width: 100%;
  z-index: 9;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    height: ${STAGE_HEIGHT};
  }

  /* body offset background  */
  &:after {
    background: var(--color-black);
    content: '';
    height: 6em;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
`

const WrapperFixed = styled(motion.div)`
  background: linear-gradient(
    0deg,
    var(--color-dark) 0%,
    var(--color-grey) 100%
  );
  z-index: 9;
  position: relative;
  border-top: 2px solid #ffffff20;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    overflow: hidden;
    position: fixed;
    top: ${HEADER_HEIGHT};
    left: 0;
    right: 0;
  }
`

const CustomContainer = styled(Container)`
  display: flex;
  position: relative;
  flex-direction: column;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    flex-direction: row;
  }
`

const Stage: React.FC = ({ children }) => {
  const { top, borderRadius, padding } = useStageAnimation()

  return (
    <Wrapper>
      <WrapperFixed
        style={{
          top,
          borderRadius,
          paddingTop: padding,
          paddingBottom: padding,
        }}
      >
        <CustomContainer>{children}</CustomContainer>
      </WrapperFixed>
    </Wrapper>
  )
}

export { Stage }
