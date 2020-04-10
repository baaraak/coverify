import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { dispatchInitialAnimationOfMainText } from './config/actions'
import { selectors } from './config/reducer'
import {
  INITIAL,
  ANIMATE,
  createTransition,
  useCoverAnimation,
} from 'common/animations'
import { COVER_SIZE } from 'common/sizes'

const ImageHandle = styled(motion.div)`
  width: ${COVER_SIZE};
  height: ${COVER_SIZE};

  background-size: cover;
  background-position: center;

  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);

  /* Remove plugins */
  grammarly-extension {
    display: none !important;
  }
`

const Content = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;

  width: ${COVER_SIZE};
  height: ${COVER_SIZE};

  padding: 2em;
  display: flex;

  flex-direction: column;
  transform-origin: left top;
`

const TextareaTop = styled.div`
  font-size: var(--size-heading);
  font-weight: 900;
  width: 100%;
`

const TextareaCenter = styled.div`
  font-weight: 900;
  line-height: 1;

  width: 100%;
  margin: auto;
  outline: none;
`

const EmptySpace = styled.div`
  height: var(--size-heading);
`

const Cover: React.FC = () => {
  const {
    colors,
    fontFamily,
    foreText,
    fontSize,
    imageStage,
    mainText,
    textAlign,
  } = useSelector(selectors.getEditor, shallowEqual)
  const dispatch = useDispatch()
  const { coverSize, coverContentScale } = useCoverAnimation()

  const fontFamilyImport = fontFamily.replace(/ /, '+')

  useEffect(() => {
    dispatch(dispatchInitialAnimationOfMainText())
  }, [dispatch])

  return (
    <>
      <Head>
        <link
          href={`https://fonts.googleapis.com/css?family=${fontFamilyImport}&display=swap`}
          rel="stylesheet"
        />
      </Head>

      <ImageHandle
        initial={INITIAL}
        animate={ANIMATE}
        transition={createTransition(1)}
        style={{
          width: coverSize,
          height: coverSize,
          backgroundImage: `url(${imageStage})`,
        }}
      >
        <Content style={{ scale: coverContentScale }}>
          <TextareaTop
            contentEditable="true"
            suppressContentEditableWarning
            style={{ textAlign, fontFamily, color: colors.foreground }}
          >
            {foreText}
          </TextareaTop>
          <TextareaCenter
            contentEditable="true"
            suppressContentEditableWarning
            style={{
              textAlign,
              fontFamily,
              fontSize,
              color: colors.main,
            }}
          >
            {mainText}
          </TextareaCenter>

          {/* Space necessary to align vertically */}
          <EmptySpace />
        </Content>
      </ImageHandle>
    </>
  )
}

export { Cover }
