// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWindow = (global as any).window

const KEY_NAME = '__coverify-persist__'

const persistor = {
  get: () => {
    if (!globalWindow) {
      return undefined
    }

    const data = globalWindow.localStorage.getItem(KEY_NAME)

    if (data) {
      return data
    }

    return undefined
  },
  set: (token: string) => {
    if (!globalWindow) {
      return undefined
    }

    return globalWindow.localStorage.setItem(KEY_NAME, token)
  },

  remove: () => {
    if (!globalWindow) {
      return undefined
    }

    return globalWindow.localStorage.remove(KEY_NAME)
  },
}

export { persistor }
