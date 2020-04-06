import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  context,
  createServicesContext,
  eraseServicesContext,
} from 'common/context'
import {
  types as userTypes,
  selectors as userSelectors,
} from 'modules/User/store'

/**
 * Main entry component of application
 * The purpose here is to handle all kinds of effects
 */
const Core: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const token = useSelector(userSelectors.getToken)

  /**
   * Services
   */
  const { spotifyService } = context

  /**
   *  Get user data
   */
  const getInformationOfUser = useCallback(async () => {
    dispatch({ type: userTypes.USER_INFO_REQUEST })

    try {
      const userData = await spotifyService?.getUserInformation()

      dispatch({ type: userTypes.USER_INFO_RECEIVE, payload: userData })
    } catch (err) {
      dispatch({ type: userTypes.USER_INFO_ERROR, payload: err.message })
    }
  }, [dispatch, spotifyService])

  /**
   * Services effect
   */
  const initializeServices = useCallback(async () => {
    if (!spotifyService && token) {
      createServicesContext(token)
      return await getInformationOfUser()
    }

    if (token) {
      return await getInformationOfUser()
    }

    return eraseServicesContext()
  }, [getInformationOfUser, spotifyService, token])

  useEffect(() => {
    initializeServices()
  }, [initializeServices, token])

  return <>{children}</>
}

export { Core }
