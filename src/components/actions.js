import axios from 'axios'

export const getUser = async (token, dispatch) => {
  try {
    const result = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })

    dispatch({
      type: 'FETCH_USER',
      payload: {
        name: result.data.display_name,
        image: result.data.images[0].url,
      },
    })
  } catch (err) {
    dispatch({ type: 'LOG_OUT' })
  }
}

export const postCover = async (token, playlistId, imgData, dispatch) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true, meta: { key: 'stage' } })

    await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      imgData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'image/jpeg',
        },
      }
    )

    dispatch({ type: 'SET_LOADING', payload: false, meta: { key: 'stage' } })
  } catch (err) {
    throw Error(err)
  }
}

export const handleSelectPlaylist = (value, dispatch) => {
  dispatch({ type: 'UPDATE_STAGE', meta: 'playlistId', payload: value.id })
  dispatch({
    type: 'UPDATE_STAGE',
    meta: 'name',
    payload: value.name,
  })
}

export const getPlaylist = async (token, dispatch) => {
  try {
    const results = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50 },
    })

    dispatch({
      type: 'FETCH_PLAYLIST',
      payload: results.data.items,
    })
  } catch (err) {
    dispatch({ type: 'LOG_OUT' })
  }
}

export const getDataFromSplash = async (query, dispatch) => {
  if (!query) {
    return
  }

  dispatch({ type: 'SET_LOADING', payload: true, meta: { key: 'gallery' } })

  const data = await axios.get(`.netlify/functions/images`, {
    params: { query },
  })

  dispatch({
    type: 'FETCH_IMAGES',
    payload: data.data,
    meta: { query },
  })
}
