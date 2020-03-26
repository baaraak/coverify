import ReactGA from 'react-ga'
import { createStore as reduxCreateStore } from 'redux'

import { STORAGE_TOKEN } from './constants'
import { appName, colorsScheme } from './content'
import imagePlaceholderSrc from '../assets/image-placeholder.jpg'

export const initialState = {
  token: null,
  user: null,
  playlist: [],
  images: {},
  stage: {
    colors: colorsScheme[0],
    fontFamily: 'Montserrat',
    fontSize: 60,
    imageStage: imagePlaceholderSrc,
    foreText: 'This is',
    mainText: 'Your best cover ever',
    name: `Welcome to ${appName}`,
    playlistId: null,
    textAlgin: 'left',
  },
  errors: {
    needSign: false,
  },
  loadings: { gallery: false, stage: false },
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        loadings: { ...state.loadings, [action.meta.key]: action.payload },
      }
    }
    case 'ADD_TOKEN': {
      window.localStorage.setItem(STORAGE_TOKEN, action.payload.token)

      return { ...state, token: action.payload.token }
    }
    case 'FETCH_USER': {
      return { ...state, user: action.payload }
    }
    case 'FETCH_PLAYLIST': {
      return { ...state, playlist: action.payload }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        errors: { ...state.errors, [action.meta.key]: action.payload },
      }
    }
    case 'FETCH_IMAGES': {
      ReactGA.event({
        category: 'Images',
        action: `query`,
        label: action.meta.query,
      })

      return {
        ...state,
        images: { ...state.images, [action.meta.query]: action.payload },
        loadings: { ...state.loading, gallery: false },
      }
    }
    case 'UPDATE_STAGE': {
      const key = action.meta
      const value = action.payload

      ReactGA.event({
        category: 'Stage',
        action: key,
        label: JSON.stringify(value),
      })

      return { ...state, stage: { ...state.stage, [key]: value } }
    }
    case 'LOG_OUT': {
      return { ...initialState, token: null }
    }
    default:
      return state
  }
}

const createStore = () => reduxCreateStore(rootReducer, initialState)

export default createStore
