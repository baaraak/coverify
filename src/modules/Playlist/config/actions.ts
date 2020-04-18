import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { types } from './actionsTypes'
import { DependenciesContext } from 'common/service/context'
import { selectors as userSelector } from 'modules/User'

const dispatchLoading = () => ({ type: types.PLAYLIST_LOADING })

const dispatchError = (message: string) => ({
  type: types.PLAYLIST_ERROR,
  payload: message,
})

const useDispatchPlaylist = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector.getUserData)
  const dependencies = useContext(DependenciesContext)

  const submit = async () => {
    console.log('useDispatchPlaylist')

    try {
      // get service
      const spotifyService = dependencies.get('spotify')
      if (!spotifyService) return

      dispatch(dispatchLoading())
      const playlistData = await spotifyService.getUserPlaylist()

      const filteredData = playlistData
        ?.filter((item) => item.owner?.display_name === user?.userName)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: item.images?.[0]?.url,
          }
        })

      dispatch({ type: types.PLAYLIST_SUCCESS, payload: filteredData })
    } catch (err) {
      dispatch(dispatchError(err.message))
    }
  }

  return submit
}

export { useDispatchPlaylist }
