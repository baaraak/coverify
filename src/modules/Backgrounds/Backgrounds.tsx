import React, { useEffect, useRef, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Snuggle from 'react-snuggle'

import { dispatchRandomWord } from './config/actions'
import { selectors, BackgroundItem } from './config/reducer'
import { Empty } from './partials/Empty'
import { Item } from './partials/Item'
import { Loading } from './partials/Loading'
import { Search } from './partials/Search'
import { DependenciesContext } from 'common/service/context'
import { useAlert } from 'common/UI'
import { useSuspense } from 'common/utils'
import { actions } from 'modules/Editor'

const Backgrounds: React.FC = () => {
  // Manager
  const alert = useAlert()
  const gridRef = useRef()
  const dispatch = useDispatch()

  // States
  const errorMessage = useSelector(selectors.getErrorMessage)
  const data = useSelector(selectors.getData)
  const loading = useSelector(selectors.getLoading)
  const suspenseLoading = useSuspense(loading)

  const dependencies = useContext(DependenciesContext)
  const unSplashService = dependencies.get('unsplash')

  // Effects
  useEffect(() => {
    if (errorMessage) {
      alert.error(errorMessage)
    }
  }, [alert, errorMessage])

  // Very first render
  useEffect(() => {
    dispatch(dispatchRandomWord())
  }, [dispatch])

  // Render
  const conditionalRender = () => {
    if (suspenseLoading) {
      return <Loading />
    }

    if (data.length > 0) {
      const onLoad = () => {
        if (gridRef.current) {
          gridRef.current?.resize()
        }
      }

      const pickImage = async (element: BackgroundItem) => {
        if (element?.urls?.full && element?.id) {
          dispatch(actions.dispatchBackground(element?.urls?.full))
          await unSplashService.downloadImage(element?.id)
        }
      }

      return (
        <Snuggle ref={gridRef}>
          {data.map((element) => {
            return (
              <Item
                key={element.id}
                element={element}
                onLoadItem={onLoad}
                pickImage={pickImage}
              />
            )
          })}
        </Snuggle>
      )
    }

    return <Empty />
  }

  const renderResults = conditionalRender()

  return (
    <>
      <Search />
      {renderResults}
    </>
  )
}

export { Backgrounds }
