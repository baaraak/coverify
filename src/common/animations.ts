import { useViewportScroll, useTransform } from 'framer-motion'

import { emToPxInNumber } from './utils'
import { HEADER_HEIGHT, COVER_SIZE, COVER_SIZE_COMPACT } from 'common/sizes'

/**
 * Appears on staging
 */
export const INITIAL = { opacity: 0, y: -50 }
export const INITIAL_INVERTED = { opacity: 0, y: 50 }
export const ANIMATE = { opacity: 1, y: 0 }
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
const TARGET = emToPxInNumber(COVER_SIZE)

// Hooks
export const useCoverAnimation = () => {
  const { scrollY } = useViewportScroll()

  const coverSize = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    [COVER_SIZE, COVER_SIZE_COMPACT]
  )

  const coverContentScale = useTransform(
    scrollY,
    [INITIAL_TARGET, TARGET],
    [1, 0.24]
  )

  return { coverSize, coverContentScale }
}

export const useStageAnimation = () => {
  const headerHeightInPx = emToPxInNumber(HEADER_HEIGHT)
  const { scrollY } = useViewportScroll()

  const top = useTransform(
    scrollY,
    [0, headerHeightInPx],
    [HEADER_HEIGHT, '0em']
  )
  const borderRadius = useTransform(scrollY, [0, headerHeightInPx], [30, 0])

  return { top, borderRadius }
}
