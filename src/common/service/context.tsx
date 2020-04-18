import React, { createContext, useState } from 'react'

import { Spotify } from './spotify'

/**
 * Dependencies
 */
const dependencies = {
  spotify: Spotify,
}

interface DependenciesOptions {
  spotify: { token: string }
}

/**
 * Types
 */
type DependenciesProps = typeof dependencies

interface ContextMethods {
  create: <N extends keyof DependenciesProps>(
    service: N & string,
    options: DependenciesOptions[N]
  ) => DependenciesProps[N] | false
  get: <N extends keyof DependenciesProps>(
    service: N & string
  ) => InstanceType<DependenciesProps[N]> | false
  destroy: (service: keyof DependenciesProps) => boolean

  // inject: (service: DependenciesNames) => void | false
}

type State = Partial<DependenciesProps>

// Methods
const DependenciesContext = createContext<ContextMethods>({
  create: () => false,
  destroy: () => false,
  get: () => false,
  // inject: () => undefined,
})

// Provider
const DependenciesProvider: React.FC = ({ children }) => {
  const [initialized, setInitialized] = useState<State>({})

  /**
   * Create a new service
   */
  const create: ContextMethods['create'] = (name, options) => {
    const dependencyConstructor = dependencies[name]

    // It doesn't exist
    if (!dependencyConstructor) {
      return false
    }

    // It already exist
    if (initialized[name]) {
      return initialized[name]
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
    // It doesn't exist
    if (!initialized[name]) {
      return false
    }

    // return
    return initialized[name]
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
