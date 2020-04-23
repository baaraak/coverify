import React, { createContext, useState } from 'react'

import { Analytics } from './analytics'
import { ScreenShot } from './screenshot'
import { Spotify } from './spotify'
import { UnSplash } from './unsplash'

/**
 * Dependencies
 */
const dependencies = {
  analytics: Analytics,
  spotify: Spotify,
  unsplash: UnSplash,
  screenshot: ScreenShot,
}

/**
 * Types
 */
type DependenciesProps = typeof dependencies
type DependenciesOptions = {
  [N in keyof DependenciesProps]: ConstructorParameters<DependenciesProps[N]>
}

/**
 * Methods
 */
interface ContextMethods {
  create: <N extends keyof DependenciesProps>(
    service: N,
    options: DependenciesOptions[N]
  ) => InstanceType<DependenciesProps[N]> | false
  get: <N extends keyof DependenciesProps>(
    service: N
  ) => InstanceType<DependenciesProps[N]> | false
  destroy: (service: keyof DependenciesProps) => boolean
}

const DependenciesContext = createContext<ContextMethods>({
  create: () => false,
  destroy: () => false,
  get: () => false,
})

type State = {
  [N in keyof DependenciesProps]?: InstanceType<DependenciesProps[N]>
}

// Provider
const DependenciesProvider: React.FC = ({ children }) => {
  const [initialized, setInitialized] = useState<State>({})

  /**
   * Create a new service
   */
  const create: ContextMethods['create'] = <N extends keyof DependenciesProps>(
    name: N,
    options: DependenciesOptions[N]
  ) => {
    const dependencyConstructor = dependencies[name]

    // It doesn't exist
    if (!dependencyConstructor) {
      return false
    }

    // It already exist
    if (initialized[name]) {
      // TODO: I'm sure that it is not undefined
      // But why typescript not?
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return initialized[name]!
    }

    // init
    const instanceOfDependency = new dependencyConstructor(options)

    // Update
    setInitialized((prev) => ({
      ...prev,
      [name]: instanceOfDependency,
    }))

    // Return
    return instanceOfDependency
  }

  /**
   * Destroy a service
   */
  const destroy: ContextMethods['destroy'] = (name) => {
    // It doesn't exist
    if (!initialized[name]) {
      return false
    }

    // Update
    setInitialized((prev) => {
      const newObj = prev
      delete newObj[name]

      return newObj
    })

    // return
    return true
  }

  /**
   * Get a dependency
   */
  const get: ContextMethods['get'] = (name) => {
    if (initialized[name]) {
      return initialized[name]
    }

    return false
  }

  /**
   * Context
   */
  return (
    <DependenciesContext.Provider value={{ create, destroy, get }}>
      {children}
    </DependenciesContext.Provider>
  )
}

export { DependenciesContext, DependenciesProvider }
