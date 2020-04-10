import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import alignCenter from '../assets/align-center.svg'
import alignLeft from '../assets/align-left.svg'
import alignRight from '../assets/align-right.svg'
import { dispatchTextAlign } from '../config/actions'
import { selectors } from '../config/reducer'
import { Button } from './common'

const TextAlign: React.FC = () => {
  const dispatch = useDispatch()
  const value = useSelector(selectors.getTextAlign)

  const handle = (value: string) => dispatch(dispatchTextAlign(value))

  return (
    <>
      <Button active={value === 'left'} onClick={() => handle('left')}>
        <img src={alignLeft} alt="Align text to left" />
      </Button>
      <Button active={value === 'center'} onClick={() => handle('center')}>
        <img src={alignCenter} alt="Align text to Center" />
      </Button>
      <Button active={value === 'right'} onClick={() => handle('right')}>
        <img src={alignRight} alt="Align text to Right" />
      </Button>
    </>
  )
}

export { TextAlign }
