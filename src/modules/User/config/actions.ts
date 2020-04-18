import { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { types } from './actionsTypes'
import { DependenciesContext } from 'common/service/context'

// Actions
const dispatchLogOut = () => ({ type: types.LOG_OUT })

const dispatchLoading = () => ({
  type: types.USER_LOADING,
})

const dispatchUserToken = (token: string) => ({
  type: types.USER_SIGN_SUCCESS,
  payload: token,
})

const dispatchError = (message: string) => ({
  type: types.USER_ERROR,
  payload: message,
})

const useDispatchInformationOfUser = () => {
  const dispatch = useDispatch()
  const dependencies = useContext(DependenciesContext)

  const submit = async () => {
    console.log('useDispatchInformationOfUser')
    // get service
    const spotifyService = dependencies.get('spotify')
    if (!spotifyService) return

    dispatch(dispatchLoading())

    try {
      const userData = await spotifyService.getUserInformation()
      dispatch({ type: types.USER_INFO_SUCCESS, payload: userData })
    } catch (err) {
      dispatch(dispatchError(err.message))
    }
  }

  return submit
}

export {
  dispatchError,
  dispatchLoading,
  dispatchLogOut,
  dispatchUserToken,
  useDispatchInformationOfUser,
}
