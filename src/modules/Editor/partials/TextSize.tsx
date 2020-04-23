import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

import decreaseFont from '../assets/decrease-font.svg'
import increaseFont from '../assets/increase-font.svg'
import { dispatchFontSize } from '../config/actions'
import { Button } from './common'
import { DependenciesContext } from 'common/service/context'

const TextSize: React.FC = () => {
  const dispatch = useDispatch()
  const dependencies = useContext(DependenciesContext)
  const analyticsService = dependencies.get('analytics')

  const handle = (shouldIncrease: boolean) => {
    dispatch(dispatchFontSize(shouldIncrease))

    if (analyticsService) {
      analyticsService.logEvent(
        'editor',
        shouldIncrease ? 'increased text' : 'decreased text'
      )
    }
  }

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
