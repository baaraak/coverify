import React from 'react'

import { ThemeProvider, Layout } from 'common/UI'

const Core: React.FC = ({ children, ...props }) => {
  return (
    <ThemeProvider {...props}>
      <Layout>{children}</Layout>
    </ThemeProvider>
  )
}

export { Core }
