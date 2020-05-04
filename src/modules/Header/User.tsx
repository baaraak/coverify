import React, { useContext, useEffect } from 'react'
import ContentLoader from 'react-content-loader'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { UserAvatar } from './UserAvatar'
import i18n from 'common/i18n'
import { DependenciesContext } from 'common/service/context'
import { Button, useAlert } from 'common/UI'
import { useSuspense } from 'common/utils'
import { actions as editorActions } from 'modules/Editor'
import { actions as playlistActions } from 'modules/Playlist'
import {
  UserLoginButton,
  selectors as userSelectors,
  actions as userActions,
} from 'modules/User'
import { useGetInformationOfUser } from 'modules/User/config/actions'
import { persistor } from 'modules/User/config/persistor'

const CustomContentLoader = styled(ContentLoader)`
  height: 2.6em;
  width: 14em;
`

const User: React.FC = () => {
  // Hooks
  const dispatch = useDispatch()
  const isConnected = useSelector(userSelectors.isConnected, shallowEqual)
  const dependencies = useContext(DependenciesContext)
  const alert = useAlert()
  const analyticsService = dependencies.get('analytics')

  // State
  const userData = useSelector(userSelectors.getUserData, shallowEqual)
  const loading = useSelector(userSelectors.getLoading)
  const errorMessage = useSelector(userSelectors.getErrorMessage, shallowEqual)
  const suspenseLoading = useSuspense(loading)

  // Handler
  const endSession = () => {
    // Actions
    dispatch(userActions.dispatchLogOut())
    dispatch(editorActions.dispatchReset())
    dispatch(playlistActions.dispatchReset())

    // Remove dependencies and data
    dependencies.destroy('spotify')
    persistor.remove()

    // Analytics

    if (analyticsService) {
      analyticsService.logEvent('user', 'login')
    }
  }

  // Effect
  useEffect(() => {
    if (errorMessage) {
      alert.error(i18n.t(`alert.${errorMessage}`))

      if (analyticsService) {
        analyticsService.logEvent('error', errorMessage)
      }
    }
  }, [alert, analyticsService, errorMessage])

  /**
   * Listener of service to get the data of user
   */
  useGetInformationOfUser()

  if (suspenseLoading) {
    return (
      <CustomContentLoader
        speed={2}
        width={430}
        height={80}
        viewBox="0 0 430 80"
        backgroundColor="#232323"
        foregroundColor="#333233"
      >
        <circle cx="37" cy="43" r="29" />
        <rect x="100" y="31" rx="5" ry="5" width="217" height="26" />
        <rect x="382" y="31" rx="5" ry="5" width="22" height="26" />
      </CustomContentLoader>
    )
  }

  if (isConnected && userData) {
    return (
      <UserAvatar
        name={userData.userName}
        image={userData.userImage}
        logOut={endSession}
      />
    )
  }

  return (
    <Button as={UserLoginButton} variant="outline">
      {i18n.t('logIn', { where: i18n.t('spotify') })}
    </Button>
  )
}

export { User }
