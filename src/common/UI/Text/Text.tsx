import styled, { css } from 'styled-components'

import type { FontSizeVariant, ColorVariant } from '../'

type Weight = 'normal' | 'bold'

const Text = styled.p<{
  size?: FontSizeVariant
  color?: ColorVariant
  weight?: Weight
}>`
  ${({ theme, color = 'white', size = 'normal', weight = 'normal' }) => {
    return css`
      color: ${theme.colors[color]};
      font-size: ${theme.fontSizes[size]};
      font-weight: ${weight};
    `
  }}
`

export { Text }
