import { motion, AnimationProps } from 'framer-motion'
import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import logoSrc from './logo.svg'
import { Navigation } from './Navigation'
import { Toggle } from './Toggle'
import { APP_NAME, TRANSITION } from 'common/constants'
import { Container as BaseContainer } from 'common/UI'

const Wrapper = styled.div`
  height: 4em;

  @media (min-width: 60em) {
    height: 4.9em;
  }
`

const Background = styled.header`
  background: var(--color-black);
  padding-top: 1em;
  padding-bottom: 1em;

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

const MenuWrapper = styled(Container)`
  overflow: hidden;
  flex: 1;

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

const BlurCanvasWrapper = styled(motion.div)`
  position: fixed;
  top: 3.9em;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
`

const BlurCanvas = styled.canvas`
  position: absolute;
  top: -3.9em;
  left: 0;
  transform: scale(1.2);
  width: 100%;
  z-index: 1;
`

const LogoImage = styled.img`
  height: 1.8em;
  display: block;
`

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  // TODO: Define the right type of HTMLCanvasElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blurCanvasRef = useRef<any>()

  const renderBlurView = async () => {
    // Typescript doesn't know what global is
    // But it is used on server-side server by Next
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalAny = global as any

    if (typeof global !== 'undefined') {
      const destCanvasContext = blurCanvasRef.current?.getContext('2d')

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const html2canvas = require('html2canvas')
      const target = globalAny.document.querySelector('body')

      const canvas = await html2canvas(target, {
        letterRendering: 1,
        allowTaint: true,
        useCORS: true,
      })

      if (blurCanvasRef.current) {
        blurCanvasRef.current.width = canvas.width
        blurCanvasRef.current.height = canvas.height
        destCanvasContext.filter = 'blur(30px) brightness(25%) saturate(70%)'

        destCanvasContext.drawImage(canvas, 0, 0)
      }
    }
  }

  const handleMenu = async () => {
    setShowMenu((prevState) => !prevState)
  }

  // Styles
  const blurCanvasWrapperStyle: AnimationProps['animate'] = {
    pointerEvents: showMenu ? 'auto' : 'none',
    opacity: showMenu ? 1 : 0,
  }

  useEffect(() => {
    renderBlurView()
  }, [])

  return (
    <Wrapper>
      <Background>
        <Container>
          <LogoImage src={logoSrc} alt={APP_NAME} />

          <Toggle onClick={handleMenu} open={showMenu} />

          <BlurCanvasWrapper
            animate={blurCanvasWrapperStyle}
            transition={TRANSITION}
          >
            <BlurCanvas ref={blurCanvasRef} />
          </BlurCanvasWrapper>

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

export { Header }
