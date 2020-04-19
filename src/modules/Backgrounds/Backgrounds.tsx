import React from 'react'

import { Empty } from './partials/Empty'
import { Search } from './partials/Search'

const Backgrounds: React.FC = () => {
  return (
    <>
      <Search />
      <Empty />
    </>
  )
}

export { Backgrounds }
