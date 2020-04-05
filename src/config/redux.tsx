import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

// User module
import { reducer as userReducer } from 'modules/User/store'
import type {
  State as UserState,
  Actions as UserActions,
} from 'modules/User/store'

declare module 'react-redux' {
  type AllActions = UserActions

  export function useDispatch(): (actions: AllActions) => AllActions

  // Types from reducers
  type Reducers = { user: UserState }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultRootState extends Reducers {}
}

const rootReducer = combineReducers({ user: userReducer })

const persistConfig = { key: 'root', storage }
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = composeWithDevTools()

const store = createStore(persistedReducer, composeEnhancers)
const persistor = persistStore(store)

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
