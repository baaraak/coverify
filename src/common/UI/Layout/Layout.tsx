import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    body,
    html {
      background-color: ${theme.colors.dark};
      font-size: ${theme.settings.fontSizeBase}px;
      font-family: ${theme.settings.fontFamilyBase};
    }

    :root {
      ${({ theme: { colors, fontSizes } }) => css`
        /* Colors */
        --color-black: ${colors.black};
        --color-black-light: ${colors.black}80;
        --color-primary: ${colors.primary};
        --color-dark: ${colors.dark};
        --color-grey: ${colors.grey};
        --color-white: ${colors.white};
        --color-white--light: ${colors.white}20;

        /* Font sizes */
        --size-small: ${fontSizes.small};
        --size-normal: ${fontSizes.normal};
        --size-medium: ${fontSizes.medium};
        --size-heading: ${fontSizes.heading};
        --size-huge: ${fontSizes.huge};
      `};
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
