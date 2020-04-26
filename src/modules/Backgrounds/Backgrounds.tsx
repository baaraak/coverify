import React, { useEffect, useContext, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Snuggle from 'react-snuggle'

import { dispatchRandomWord } from './config/actions'
import { selectors, BackgroundItem } from './config/reducer'
import { Empty } from './partials/Empty'
import { Item } from './partials/Item'
import { Loading } from './partials/Loading'
import { Search } from './partials/Search'
import i18n from 'common/i18n'
import { DependenciesContext } from 'common/service/context'
import { useAlert } from 'common/UI'
import { actions } from 'modules/Editor'

const Backgrounds: React.FC = () => {
  // Manager
  const alert = useAlert()
  const dispatch = useDispatch()

  // States
  const errorMessage = useSelector(selectors.getErrorMessage)
  const data = useSelector(selectors.getData)
  const loading = useSelector(selectors.getLoading)

  const dependencies = useContext(DependenciesContext)
  const unSplashService = dependencies.get('unsplash')
  const analyticsService = dependencies.get('analytics')

  // Effects
  useEffect(() => {
    if (errorMessage) {
      alert.error(i18n.t(`alert.${errorMessage}`))

      if (analyticsService) {
        analyticsService.logEvent('error', errorMessage)
      }
    }
  }, [alert, analyticsService, errorMessage])

  // Very first render
  const setRandomWordOnSearch = useCallback(
    () => dispatch(dispatchRandomWord()),
    [dispatch]
  )

  useEffect(() => {
    setRandomWordOnSearch()
  }, [setRandomWordOnSearch])

  // Render
  const conditionalRender = () => {
    if (loading) {
      return <Loading />
    }

    if (data.length > 0) {
      const pickImage = async (element: BackgroundItem) => {
        if (element?.urls?.full && element?.id) {
          dispatch(actions.dispatchBackground(element?.urls?.full))

          if (unSplashService) {
            await unSplashService.downloadImage(element?.id)
          }

          if (analyticsService) {
            analyticsService.logEvent('editor', 'pick background')
          }
        }
      }

      return (
        <Snuggle>
          {data.map((element) => {
            return (
              <Item key={element.id} element={element} pickImage={pickImage} />
            )
          })}
        </Snuggle>
      )
    }

    return <Empty onClickRandomWord={setRandomWordOnSearch} />
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
