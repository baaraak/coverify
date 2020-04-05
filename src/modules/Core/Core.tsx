import React from 'react'

import { ThemeProvider, Layout } from 'common/UI'
import { DataProvider } from 'config/redux'

const Core: React.FC = ({ children, ...props }) => {
  return (
    <DataProvider>
      <ThemeProvider {...props}>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </DataProvider>
  )
}

export { Core }
