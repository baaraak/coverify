import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    body,
    html {
      background-color: ${theme.colors.black};
      font-size: ${theme.settings.fontSizeBase};
      font-family: ${theme.settings.fontFamilyBase};
    }
  `}
`

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}

export { Layout }
