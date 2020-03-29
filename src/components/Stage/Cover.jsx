import React, { forwardRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'

import { initialState } from '../store'
import { ImageHandle, Content, TextareaTop, TextareaCenter } from './style'
import { INITIAL, ANIMATE, createTransition } from '../initialTransition'

// eslint-disable-next-line react/display-name
const Cover = forwardRef(({ variationSize, variationScale }, ref) => {
  const stage = useSelector(state => state.stage)
  const dispatch = useDispatch()

  const {
    imageStage,
    textAlign,
    fontSize,
    colors,
    fontFamily,
    mainText,
    foreText,
  } = stage

  const fontFamilyImport = fontFamily.replace(/ /, '+')

  useEffect(() => {
    const initial = initialState.stage.mainText
    const dispatchText = value =>
      dispatch({ type: 'UPDATE_STAGE', meta: 'mainText', payload: value })

    // Clean
    dispatchText('')

    // Typing
    setTimeout(() => {
      initial.split('').reduce((acc, text, index) => {
        const updatedText = `${acc}${text}`

        setTimeout(() => {
          dispatchText(updatedText)
        }, 70 * index)

        return updatedText
      }, '')
    }, 1000)
  }, [dispatch])

  return (
    <>
      <Helmet>
        <link
          href={`https://fonts.googleapis.com/css?family=${fontFamilyImport}&display=swap`}
          rel="stylesheet"
        />
      </Helmet>
      <ImageHandle
        initial={INITIAL}
        animate={ANIMATE}
        transition={createTransition(1)}
        ref={ref}
        style={{
          width: variationSize,
          height: variationSize,
          backgroundImage: `url(${imageStage})`,
        }}
      >
        <Content style={{ scale: variationScale }}>
          <TextareaTop
            contentEditable="true"
            style={{ textAlign, fontFamily, color: colors.foreground }}
          >
            {foreText}
          </TextareaTop>

          <TextareaCenter
            contentEditable="true"
            style={{
              textAlign,
              fontFamily,
              fontSize,
              color: colors.main,
            }}
          >
            {mainText}
          </TextareaCenter>
          <div style={{ height: 18 }} />
        </Content>
      </ImageHandle>
    </>
  )
})

export default Cover
