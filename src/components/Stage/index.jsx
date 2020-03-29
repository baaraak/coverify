import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useViewportScroll, useTransform, motion } from 'framer-motion'
import ReactGA from 'react-ga'

import { INITIAL, ANIMATE, createTransition } from '../initialTransition'
import {
  Caption,
  CoverWrapper,
  EmptySpace,
  Handlers,
  Info,
  LoadingHandle,
  Title,
  Wrapper,
} from './style'
import { Button, RoundedButton } from '../Button'
import { Description } from './style'
import downloadSrc from '../../assets/download.svg'
import Cover from './Cover'
import TextControl from './TextControl'
import { postCover, getPlaylist } from '../actions'
import Loading from '../Loading'
import { scrollToAsync, truncate } from '../utils'

const INITIAL_TARGET = 78
const TARGET = 420

const TARGET_DELAY = 140
const TARGET_LATER = 200

const Stage = () => {
  const stage = useSelector(state => state.stage)
  const token = useSelector(state => state.token)
  const loading = useSelector(state => state.loadings.stage)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const stageRef = useRef()

  const { scrollY } = useViewportScroll()

  const widthEmptySpace = useTransform(
    scrollY,
    [TARGET_DELAY, TARGET],
    [490, 0]
  )
  const scale = useTransform(scrollY, [TARGET_DELAY, TARGET], [1, 0.5])
  const marginBottom = useTransform(scrollY, [INITIAL_TARGET, TARGET], [40, 6])
  const marginLeft = useTransform(scrollY, [INITIAL_TARGET, TARGET], [40, 20])
  const variationPadding = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    [40, 20]
  )
  const variationSize = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    [420, 100]
  )
  const variationScale = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    [1, 0.24]
  )
  const opacity = useTransform(scrollY, [TARGET_DELAY, TARGET_LATER], [1, 0])
  const variationFadeIn = useTransform(
    scrollY,
    [TARGET_DELAY, TARGET],
    [0, -50]
  )

  const downloadCover = async () => {
    const html2canvas = require('html2canvas')

    ReactGA.event({
      category: 'Stage',
      action: 'take print',
      label: 'download',
    })

    await scrollToAsync(0, 0)

    const canvas = await html2canvas(stageRef.current, {
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
    })

    var a = document.createElement('a')
    a.href = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream')
    a.download = `${stage.name}.jpg`
    a.click()
  }

  const takePrint = async () => {
    const html2canvas = require('html2canvas')

    if (token) {
      ReactGA.event({
        category: 'Stage',
        action: 'take print',
        label: 'upload',
      })

      await scrollToAsync(0, 0)

      const canvas = await html2canvas(stageRef.current, {
        letterRendering: 1,
        allowTaint: true,
        useCORS: true,
      })

      const imgData = canvas
        .toDataURL('image/jpeg', 0.8)
        .replace(/^data:image\/jpeg;base64,/, '')

      await postCover(token, stage.playlistId, imgData, dispatch)
      await getPlaylist(token, dispatch)
    } else {
      dispatch({ type: 'SET_ERROR', payload: true, meta: { key: 'needSign' } })

      const timer = setTimeout(
        () =>
          dispatch({
            type: 'SET_ERROR',
            payload: false,
            meta: { key: 'needSign' },
          }),
        3000
      )

      return () => {
        clearTimeout(timer)
      }
    }
  }

  return (
    <Wrapper
      style={{ paddingTop: variationPadding, paddingBottom: variationPadding }}
    >
      <CoverWrapper>
        <Cover
          ref={stageRef}
          variationSize={variationSize}
          variationScale={variationScale}
        />

        <Info
          style={{ marginBottom, marginLeft }}
          initial={INITIAL}
          animate={ANIMATE}
          transition={createTransition(1.4)}
        >
          <Caption style={{ opacity, marginBottom: variationFadeIn }}>
            {token ? "You're editing" : 'Playlist'}
          </Caption>
          <Title style={{ scale }}>{truncate(stage.name)}</Title>
          <Description style={{ opacity, marginTop: variationFadeIn }}>
            Create by <span>{user ? user.name : 'Danilo Woznica'}</span>
          </Description>

          <Handlers>
            <Button onClick={takePrint}>
              Update on Spotify
              <LoadingHandle
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: loading ? 16 : 0, opacity: loading ? 1 : 0 }}
              >
                <Loading />
              </LoadingHandle>
            </Button>
            <RoundedButton onClick={downloadCover}>
              <img width="15" src={downloadSrc} alt="Download img" />
            </RoundedButton>
          </Handlers>
        </Info>

        <EmptySpace style={{ width: widthEmptySpace }} />
      </CoverWrapper>

      <motion.div
        initial={INITIAL}
        animate={ANIMATE}
        transition={createTransition(1.6)}
      >
        <TextControl style={{ opacity }} />
      </motion.div>
    </Wrapper>
  )
}

export default Stage
