import { useState, useEffect, useCallback } from 'react'

import { FONT_SIZE_BASE } from './UI/ThemeProvider/theme'

export const scrollToAsync = (x: number, y: number) =>
  new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).window.scrollTo(x, y)

    setTimeout(() => {
      resolve()
    }, 100)
  })

export const truncate = (str = '', num = 32) => {
  if (str.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}

export const emToPxInNumber = (rem: string) => {
  const remOnNumber = Number(rem.replace(/em/gm, ''))

  return remOnNumber * FONT_SIZE_BASE
}

// Stolen from https://usehooks.com/useDebounce/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends any>(value: T, delay = 300): T => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}

export const useWindowSize = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalWindow = (global as any).window

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const debounceWidth = useDebounce<number>(width)
  const debounceHeight = useDebounce<number>(height)

  const handleWidth = useCallback(() => {
    setWidth(globalWindow.innerWidth)
    setHeight(globalWindow.innerHeight)
  }, [globalWindow.innerWidth, globalWindow.innerHeight])

  useEffect(() => {
    if (globalWindow) {
      handleWidth()

      globalWindow.addEventListener('resize', handleWidth)

      return () => {
        globalWindow.removeEventListener('resize', handleWidth)
      }
    }

    return
  }, [globalWindow, handleWidth])

  return { width: debounceWidth, height: debounceHeight }
}
