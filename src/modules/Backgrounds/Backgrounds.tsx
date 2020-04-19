import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectors } from './config/reducer'
import { Empty } from './partials/Empty'
import { Loading } from './partials/Loading'
import { Search } from './partials/Search'
import { useAlert } from 'common/UI'
import { useSuspense } from 'common/utils'

const Backgrounds: React.FC = () => {
  // Manager
  const alert = useAlert()

  // States
  const errorMessage = useSelector(selectors.getErrorMessage)
  const loading = useSelector(selectors.getLoading)
  const data = useSelector(selectors.getData)

  const suspenseLoading = useSuspense(loading)

  useEffect(() => {
    if (errorMessage) {
      alert.error(errorMessage)
    }
  }, [alert, errorMessage])

  const conditionalRender = () => {
    if (suspenseLoading) {
      return <Loading />
    }

    if (data.length > 0) {
      return <p>fooo</p>
    }

    return <Empty />
  }

  const render = conditionalRender()

  return (
    <>
      <Search />
      {render}
    </>
  )
}

export { Backgrounds }
