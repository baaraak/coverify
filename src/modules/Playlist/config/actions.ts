import { types } from './actionsTypes'
import { context } from 'common/context'
import type { ThunkResult } from 'config/redux'

const dispatchLoading = () => ({ type: types.PLAYLIST_LOADING })

const dispatchError = (message: string) => ({
  type: types.PLAYLIST_ERROR,
  payload: message,
})

const dispatchPlaylist = (): ThunkResult<void> => async (
  dispatch,
  getState
) => {
  const { user } = getState()
  const { spotifyService } = context

  dispatch(dispatchLoading())

  try {
    console.log(spotifyService)
    const playlistData = await spotifyService?.getUserPlaylist()

    const filteredData = playlistData
      ?.filter((item) => item.owner?.display_name === user.data?.userName)
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

export { dispatchPlaylist }
