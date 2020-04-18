import React, { useContext, useEffect } from 'react'
import ContentLoader from 'react-content-loader'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { UserAvatar } from './UserAvatar'
import { DependenciesContext } from 'common/service/context'
import { Button, useAlert } from 'common/UI'
import { useSuspense } from 'common/utils'
import {
  UserLoginButton,
  selectors as userSelectors,
  actions as userActions,
} from 'modules/User'

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

  // State
  const userData = useSelector(userSelectors.getUserData, shallowEqual)
  const loading = useSelector(userSelectors.getLoading)
  const errorMessage = useSelector(userSelectors.getErrorMessage, shallowEqual)

  const suspenseLoading = useSuspense(loading)

  // Handler
  const endSession = () => {
    dependencies.destroy('spotify')
    dispatch(userActions.dispatchLogOut())
  }

  // Effect
  useEffect(() => {
    if (errorMessage) {
      alert.error(errorMessage)
    }
  }, [alert, errorMessage])

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
      Log in with Spotify
    </Button>
  )
}

export { User }
