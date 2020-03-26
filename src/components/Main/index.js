import React from 'react'
import { useViewportScroll, useTransform } from 'framer-motion'
import Helmet from 'react-helmet'

import { Gradient, WrapperGradient, Global } from './style'
import { Column } from '../Grid'
import Header from '../Header'
import Stage from '../Stage'
import Gallery from '../Gallery'
import 'wipe.css'
import { DesktopOnly, DesktopOnlyMessage } from '../DesktopOnly'
import SEO from '../SEO'

const Main = () => {
  const { scrollY } = useViewportScroll()
  const top = useTransform(scrollY, [0, 78], [78, 0])
  const borderRadius = useTransform(scrollY, [0, 78], [30, 0])

  return (
    <>
      <Global />
      <SEO />

      <DesktopOnly>
        <Header />

        <WrapperGradient>
          <Gradient style={{ top, borderRadius }}>
            <Column>
              <Stage />
            </Column>
          </Gradient>
        </WrapperGradient>

        <Column>
          <Gallery />
        </Column>
      </DesktopOnly>

      <DesktopOnlyMessage>
        Sorry, but the mobile version is not ready yet :(
      </DesktopOnlyMessage>
    </>
  )
}

export default Main
