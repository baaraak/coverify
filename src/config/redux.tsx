import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk'

/**
 * Modules imports
 */
import type {
  State as BackgroundsState,
  Actions as BackgroundsActions,
} from 'modules/Backgrounds'
import { reducer as backgroundsReducer } from 'modules/Backgrounds'
import type {
  State as EditorState,
  Actions as EditorActions,
} from 'modules/Editor'
import { reducer as editorReducer } from 'modules/Editor'
import { reducer as playlistReducer } from 'modules/Playlist'
import type {
  State as PlaylistState,
  Actions as PlaylistActions,
} from 'modules/Playlist'
import { reducer as userReducer } from 'modules/User'
import type { State as UserState, Actions as UserActions } from 'modules/User'

/**
 * Types definition
 */
type State = {
  user: UserState
  editor: EditorState
  playlist: PlaylistState
  backgrounds: BackgroundsState
}
type AllActions =
  | UserActions
  | EditorActions
  | PlaylistActions
  | BackgroundsActions
export type ThunkResult<R> = ThunkAction<R, State, undefined, AllActions>

/**
 * Global redux state overwrite
 */
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultRootState extends State {}
}

/**
 * Main configuration
 */
const rootReducer = combineReducers({
  backgrounds: backgroundsReducer,
  editor: editorReducer,
  playlist: playlistReducer,
  user: userReducer,
})

/**
 * Persist config
 */
const blackList = ['errorMessage', 'loading']
const filterKeys = (data: Record<string, unknown>) => {
  const keys = Object.keys(data).filter((e) => !blackList.includes(e))

  return keys.reduce((acc, curr) => {
    if (data[curr] !== undefined) {
      return { ...acc, ...{ [curr]: data[curr] } }
    }

    return acc
  }, {})
}
const transform = createTransform(
  (inboundState: Record<string, unknown>) => filterKeys(inboundState),
  (outboundState: Record<string, unknown>) => filterKeys(outboundState)
)

const persistConfig = {
  key: 'coverify',
  storage,
  transforms: [transform],
  blacklist: ['editor'],
}

/**
 * Config
 */
const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers = composeWithDevTools(
  applyMiddleware(thunk as ThunkMiddleware<State, AllActions>)
)

/**
 * Creator of store and persistor
 */
const store = createStore(persistedReducer, composeEnhancers)
const persistor = persistStore(store)

/**
 * Provider
 */
const DataProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export { DataProvider, persistor }
