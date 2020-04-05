import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

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

const composeEnhancers = composeWithDevTools()
const rootReducer = combineReducers({ user: userReducer })
const store = createStore(rootReducer, composeEnhancers)

const DataProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export { DataProvider }
