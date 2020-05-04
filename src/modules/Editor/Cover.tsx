import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled, { CSSProperties } from 'styled-components'

import { dispatchInitialAnimationOfMainText } from './config/actions'
import * as actions from './config/actions'
import { selectors } from './config/reducer'
import {
  INITIAL_POSITION,
  ANIMATE_POSITION,
  createTransition,
  useCoverAnimation,
} from 'common/animations'
import { COVER_SIZE, MAIN_BREAKPOINT } from 'common/sizes'

const ImageHandle = styled(motion.div)`
  width: ${COVER_SIZE};
  height: ${COVER_SIZE};

  background-size: cover;
  background-position: center;

  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  /* Remove plugins */
  grammarly-extension {
    display: none !important;
  }

  margin: 2em 0;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    margin: 0;
  }
`

const Content = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  padding: 2em;
  display: flex;

  flex-direction: column;
  transform-origin: left top;

  @media (min-width: ${MAIN_BREAKPOINT}) {
    width: ${COVER_SIZE};
    height: ${COVER_SIZE};
  }
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

const Cover: React.FC<{ id?: string; style?: CSSProperties }> = ({
  id,
  style,
}) => {
  const {
    colors,
    fontFamily,
    foreText,
    fontSize,
    backgroundUrl,
    mainText,
    textAlign,
  } = useSelector(selectors.getEditor, shallowEqual)
  const dispatch = useDispatch()
  const { coverSize, coverContentScale } = useCoverAnimation()

  const refEditorTop = useRef<HTMLDivElement>(null)
  const refEditorMiddle = useRef<HTMLDivElement>(null)

  const fontFamilyImport = fontFamily.replace(/ /, '+')

  const handleChange = () => {
    const regexToRemoveAttrs = /<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi
    const contentTop = refEditorTop?.current?.innerHTML.replace(
      regexToRemoveAttrs,
      '<$1>'
    )
    const contentMiddle = refEditorMiddle?.current?.innerHTML.replace(
      regexToRemoveAttrs,
      '<$1>'
    )

    dispatch(actions.dispatchForeText(contentTop ?? ''))
    dispatch(actions.dispatchMainText(contentMiddle ?? ''))
  }

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
        id={id}
        initial={INITIAL_POSITION}
        animate={ANIMATE_POSITION}
        transition={createTransition(1)}
        style={{
          ...style,
          width: coverSize,
          height: coverSize,
          backgroundImage: `url(${backgroundUrl})`,
        }}
      >
        <Content style={{ scale: coverContentScale }}>
          <TextareaTop
            ref={refEditorTop}
            onBlur={handleChange}
            contentEditable="true"
            suppressContentEditableWarning
            style={{ textAlign, fontFamily, color: colors.foreground }}
            dangerouslySetInnerHTML={{ __html: foreText }}
          />

          <TextareaCenter
            ref={refEditorMiddle}
            onBlur={handleChange}
            contentEditable="true"
            suppressContentEditableWarning
            style={{
              textAlign,
              fontFamily,
              fontSize,
              color: colors.main,
            }}
            dangerouslySetInnerHTML={{ __html: mainText }}
          />

          {/* Space necessary to align vertically */}
          <EmptySpace />
        </Content>
      </ImageHandle>
    </>
  )
}

export { Cover }
