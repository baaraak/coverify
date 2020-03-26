import React from 'react'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage'

import createStoreSrr, { rootReducer } from './components/store'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loadings', 'errors'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

export const providerBrowser = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  )
}

// eslint-disable-next-line react/display-name
export const providerSSR = ({ element }) => {
  const store = createStoreSrr()
  return <Provider store={store}>{element}</Provider>
}
