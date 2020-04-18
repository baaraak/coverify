import React, { useCallback, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  context,
  createServicesContext,
  eraseServicesContext,
} from 'common/context'
import { DependenciesContext } from 'common/service/context'
import { actions as playlistActions } from 'modules/Playlist'
import {
  actions as userActions,
  selectors as userSelectors,
} from 'modules/User'

/**
 * Main entry component of application
 * The purpose here is to handle all kinds of effects
 */
const Core: React.FC = ({ children }) => {
  // const dispatch = useDispatch()
  // const token = useSelector(userSelectors.getToken)
  const context = useContext(DependenciesContext)

  // /**
  //  * Services
  //  */
  // // const { spotifyService } = context

  // /**
  //  *  Get user data
  //  */
  // const getInformationOfUser = useCallback(async () => {
  //   dispatch(userActions.dispatchInformationOfUser())
  //   // dispatch(playlistActions.dispatchPlaylist())
  // }, [dispatch])

  // /**
  //  * Services effect
  //  */
  // const initializeServices = useCallback(async () => {
  //   if (!spotifyService && token) {
  //     createServicesContext(token)
  //     await getInformationOfUser()
  //     return
  //   }

  //   if (token) {
  //     await getInformationOfUser()
  //     return
  //   }

  //   return eraseServicesContext()
  // }, [getInformationOfUser, spotifyService, token])

  // useEffect(() => {
  //   initializeServices()
  // }, [initializeServices, token])

  useEffect(() => {
    const got = context.get('spotify')

    const crated = context.create('spotify', { token: 'false' })

    console.log(got, crated)
  }, [context])

  return <>{children}</>
}

export { Core }
