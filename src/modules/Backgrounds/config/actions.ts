import { useContext, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { selectors } from '../config/reducer'
import { types } from './actionTypes'
import { getRandomWordList } from './constants'
import { DependenciesContext } from 'common/service/context'

/**
 * Loading
 */
const dispatchLoading = () => ({ type: types.BACKGROUND_LOADING })

/**
 * Error
 */
const dispatchError = (message: string) => ({
  type: types.BACKGROUND_ERROR,
  payload: `UnSplash: ${message}`,
})

/**
 * Search
 */
const dispatchSearch = (query: string) => ({
  type: types.BACKGROUND_SEARCH,
  payload: query,
})

/**
 * Set random word
 */
const dispatchRandomWord = () => ({
  type: types.BACKGROUND_SEARCH,
  payload: getRandomWordList(),
})

/**
 * Listener of event
 */
const useGetBackgroundSearch = () => {
  const dispatch = useDispatch()
  const hasValidData = useSelector(selectors.hasValidData, shallowEqual)
  const searchQuery = useSelector(selectors.getSearchQuery)

  const dependencies = useContext(DependenciesContext)
  const unSplashService = dependencies.get('unsplash')
  const analyticsService = dependencies.get('analytics')

  /**
   * Handle
   */
  const submit = useCallback(async () => {
    if (!unSplashService) {
      return dispatch(
        dispatchError('Something went wrong on the backgrounds load.')
      )
    }

    try {
      dispatch(dispatchLoading())

      const backgroundData = await unSplashService.queryImage(searchQuery)
      const filterByOnlyKnownData = backgroundData.data.map((e) => ({
        id: e.id,
        // eslint-disable-next-line @typescript-eslint/camelcase
        alt_description: e.alt_description,
        urls: e.urls,
        color: e.color,
        width: e.width,
        height: e.height,
        user: e.user,
      }))

      dispatch({
        type: types.BACKGROUND_SUCCESS,
        payload: filterByOnlyKnownData,
        meta: searchQuery,
      })

      // Analytics
      if (analyticsService) {
        analyticsService.logEvent('background search', searchQuery)
      }
    } catch (err) {
      dispatch(dispatchError(err?.status ?? 'general'))
    }

    return
  }, [analyticsService, dispatch, searchQuery, unSplashService])

  /**
   * Effect with dependencies
   */
  useEffect(() => {
    // No query
    if (searchQuery.length === 0) {
      return
    }

    // Has valid data to show
    if (hasValidData) {
      return
    }

    // Service not create yet
    if (!unSplashService) {
      return
    }

    submit()
  }, [submit, searchQuery, unSplashService, hasValidData])
}

export { useGetBackgroundSearch, dispatchSearch, dispatchRandomWord }
