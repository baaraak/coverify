import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

import logoSrc from './assets/logo.svg'
import { Navigation } from './Navigation'
import { Toggle } from './Toggle'
import { APP_NAME, TRANSITION } from 'common/constants'
import { HEADER_HEIGHT } from 'common/sizes'
import { Container as BaseContainer } from 'common/UI'

const BlurWrapper = styled.div`
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.2s ease;
  }
`
const BlurView = styled.div`
  transition: all 0.2s ease;
`

const BlurContainer: React.FC = ({ children }) => {
  return (
    <BlurWrapper>
      <BlurView className="blur">{children}</BlurView>
    </BlurWrapper>
  )
}

const GlobalBlurStyle = createGlobalStyle<{ active: boolean }>`
  ${BlurWrapper}:after {
    background: rgba(0, 0, 0, ${({ active }) => (active ? 0.6 : 0)});
  }

  ${BlurView} {
    ${({ active }) =>
      active &&
      css`
        filter: blur(10px);
      `}
  }
`

const Wrapper = styled.div`
  height: 4em;
  position: relative;
  z-index: 9;

  @media (min-width: 60em) {
    height: ${HEADER_HEIGHT};
  }
`

const Background = styled.header`
  background: var(--color-black);
  padding-top: 1.5em;
  padding-bottom: 2.6em;

  /* Desktop */
  @media (min-width: 60em) {
    padding-top: 1em;
  }

  position: fixed;
  top: 0;
  left: 0%;
  right: 0;
`

const Container = styled(BaseContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;

  /* Override inline style */
  /* Desktop */
  @media (min-width: 60em) {
    transform: none !important;
  }

  /* Mobile */
  @media (max-width: 60em) {
    position: fixed;
    top: 3.8em;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    flex-direction: column;
    justify-content: center;
  }
`

const LogoImage = styled.img`
  height: 1.8em;
  display: block;
`

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleMenu = async () => {
    setShowMenu((prevState) => !prevState)
  }

  return (
    <Wrapper>
      <GlobalBlurStyle active={showMenu} />
      <Background>
        <Container>
          <LogoImage src={logoSrc} alt={APP_NAME} />

          <Toggle onClick={handleMenu} open={showMenu} />

          <MenuWrapper
            as={motion.div}
            initial={{ y: '100%' }}
            animate={{ y: showMenu ? 0 : '100%' }}
            transition={TRANSITION}
          >
            <Navigation />
          </MenuWrapper>
        </Container>
      </Background>
    </Wrapper>
  )
}

export { Header, BlurContainer }
