import React from 'react'
import { useDispatch } from 'react-redux'

import { dispatchFontSize } from '../actions'
import decreaseFont from '../assets/decrease-font.svg'
import increaseFont from '../assets/increase-font.svg'
import { Button } from './common'

const TextSize: React.FC = () => {
  const dispatch = useDispatch()

  const handle = (shouldIncrease: boolean) =>
    dispatch(dispatchFontSize(shouldIncrease))

  return (
    <>
      <Button onClick={() => handle(false)}>
        <img src={decreaseFont} alt="Decrease font" />
      </Button>
      <Button onClick={() => handle(true)}>
        <img src={increaseFont} alt="Increase font" />
      </Button>
    </>
  )
}

export { TextSize }
