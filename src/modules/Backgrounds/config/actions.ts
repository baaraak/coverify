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
  payload: message,
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

      dispatch({
        type: types.BACKGROUND_SUCCESS,
        payload: backgroundData.data,
        meta: searchQuery,
      })
    } catch (err) {
      dispatch(dispatchError(err.message))
    }

    return
  }, [dispatch, searchQuery, unSplashService])

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
