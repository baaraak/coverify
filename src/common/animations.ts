import { useViewportScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

import { emToPxInNumber, useWindowSize } from './utils'
import {
  HEADER_HEIGHT,
  COVER_SIZE,
  COVER_SIZE_COMPACT,
  MAIN_BREAKPOINT,
} from 'common/sizes'

/**
 * Appears on staging
 */
export const INITIAL_POSITION = { opacity: 0, y: 50 }
export const INITIAL_POSITION_INVERTED = { opacity: 0, y: -50 }
export const ANIMATE_POSITION = { opacity: 1, y: 0 }
export const createTransition = (delay: number) => ({
  delay: 0.3 * delay,
  duration: 0.6 * (delay * 0.9),
  type: 'tween',
  ease: 'backInOut',
})

/**
 * Interactions
 */
export const WHILE_HOVER = { scale: 1.02 }
export const WHILE_TAP = { scale: 0.95 }
export const TRANSITION = { type: 'spring', damping: 18, stiffness: 130 }

/**
 * Scroll transition
 */
const INITIAL_TARGET = emToPxInNumber(HEADER_HEIGHT)
const INITIAL_TARGET_DELAY = INITIAL_TARGET * 2
const TARGET = emToPxInNumber(COVER_SIZE)

/**
 * Stage animation
 */
export const useStageAnimation = () => {
  const { scrollY } = useViewportScroll()
  const { width } = useWindowSize()

  // Default value
  const topDefault = [HEADER_HEIGHT, '0em']
  const headerHeightInPx = emToPxInNumber(HEADER_HEIGHT)

  // States
  const [outputTop, setOutputTop] = useState<string[]>(topDefault)

  // Transforms
  const top = useTransform(scrollY, [0, headerHeightInPx], outputTop)
  const borderRadius = useTransform(scrollY, [0, headerHeightInPx], [30, 0])
  const padding = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    ['2em', '1em']
  )

  useEffect(() => {
    if (width < emToPxInNumber(MAIN_BREAKPOINT)) {
      setOutputTop(['0em', '0em'])
    } else {
      setOutputTop(topDefault)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return { top, borderRadius, padding }
}

/**
 * Cover animation
 */
export const useCoverAnimation = () => {
  const { scrollY } = useViewportScroll()
  const { width } = useWindowSize()

  // Default value
  const scaleDefault = [1, 0.24]

  // States
  const [outputSize, setOutputSize] = useState<string[]>([
    COVER_SIZE,
    COVER_SIZE_COMPACT,
  ])
  const [outputScale, setOutputScale] = useState<number[]>(scaleDefault)

  // Transforms
  const coverSize = useTransform(scrollY, [INITIAL_TARGET, TARGET], outputSize)
  const coverContentScale = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    outputScale
  )

  useEffect(() => {
    if (width < emToPxInNumber(MAIN_BREAKPOINT)) {
      const size = 'calc(100vw - 2em)'
      setOutputSize([size, size])
      setOutputScale([1, 1])
    } else {
      setOutputSize([COVER_SIZE, COVER_SIZE_COMPACT])
      setOutputScale(scaleDefault)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return { coverSize, coverContentScale }
}

/**
 * Handle animation
 */
export const useHandleAnimation = () => {
  const { scrollY } = useViewportScroll()
  const { width } = useWindowSize()

  // Defaults
  const opacityDefault = [1, 0]
  const scaleDefault = [1, 0.5]
  const paddingDefault = ['3em', '0.8em']

  // States
  const [opacityOutput, setOpacityOutput] = useState<number[]>(opacityDefault)
  const [scaleOutput, setScaleOutput] = useState<number[]>(scaleDefault)
  const [paddingOutput, setPaddingOutput] = useState<string[]>(paddingDefault)

  // Transforms
  const opacity = useTransform(
    scrollY,
    [INITIAL_TARGET_DELAY, TARGET / 2],
    opacityOutput
  )
  const scale = useTransform(
    scrollY,
    [INITIAL_TARGET_DELAY, TARGET],
    scaleOutput
  )
  const offset = useTransform(
    scrollY,
    [INITIAL_TARGET_DELAY, TARGET],
    ['0em', '-4em']
  )
  const padding = useTransform(
    scrollY,
    [INITIAL_TARGET_DELAY, TARGET],
    paddingOutput
  )

  useEffect(() => {
    if (width < emToPxInNumber(MAIN_BREAKPOINT)) {
      setOpacityOutput([1, 1])
      setScaleOutput([1, 1])
      setPaddingOutput(['0em', '0em'])
    } else {
      setOpacityOutput(opacityDefault)
      setScaleOutput(scaleDefault)
      setPaddingOutput(paddingDefault)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return { opacity, offset, scale, padding }
}

/**
 * Text control animation
 */
export const useTextControlAnimation = () => {
  const { scrollY } = useViewportScroll()
  const { width } = useWindowSize()

  // Defaults
  const scaleDefault = [1, 0.5]
  const opacityDefault = [1, 0]

  // States
  const [outputScale, setOutputScale] = useState(scaleDefault)
  const [outputOpacity, setOutputOpacity] = useState(opacityDefault)

  const scale = useTransform(scrollY, [INITIAL_TARGET, TARGET], outputScale)
  const opacity = useTransform(
    scrollY,
    [INITIAL_TARGET_DELAY, TARGET / 2],
    outputOpacity
  )

  useEffect(() => {
    if (width < emToPxInNumber(MAIN_BREAKPOINT)) {
      setOutputScale([1, 1])
      setOutputOpacity([1, 1])
    } else {
      setOutputScale(scaleDefault)
      setOutputOpacity(opacityDefault)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return { opacity, scale }
}
