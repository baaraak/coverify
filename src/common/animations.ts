// Appears on staging
export const INITIAL = { opacity: 0, y: -50 }
export const INITIAL_INVERTED = { opacity: 0, y: 50 }
export const ANIMATE = { opacity: 1, y: 0 }
export const createTransition = (delay: number) => ({
  delay: 0.3 * delay,
  duration: 0.6 * (delay * 0.9),
  type: 'tween',
  ease: 'backInOut',
})

// Interactions
export const WHILE_HOVER = { scale: 1.02 }
export const WHILE_TAP = { scale: 0.95 }
export const TRANSITION = { type: 'spring', damping: 18, stiffness: 130 }
