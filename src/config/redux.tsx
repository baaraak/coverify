import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk'

/**
 * Modules imports
 */
import type {
  State as EditorState,
  Actions as EditorActions,
} from 'modules/Editor'
import { reducer as editorReducer } from 'modules/Editor'
import { reducer as userReducer } from 'modules/Playlist'
import type {
  State as PlaylistState,
  Actions as PlaylistActions,
} from 'modules/Playlist'
import { reducer as playlistReducer } from 'modules/User'
import type { State as UserState, Actions as UserActions } from 'modules/User'

/**
 * Types definition
 */
type State = { user: UserState; editor: EditorState; playlist: PlaylistState }
type AllActions = UserActions | EditorActions | PlaylistActions
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
  user: userReducer,
  editor: editorReducer,
  playlist: playlistReducer,
})

const persistConfig = { key: 'root', storage }
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

export { DataProvider }
