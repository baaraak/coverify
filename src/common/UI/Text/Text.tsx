import styled, { css } from 'styled-components'

import type { FontSizeVariant, ColorVariant } from '../'

type Weight = 'normal' | 'bold'

const Text = styled.p<{
  size?: FontSizeVariant
  color?: ColorVariant
  weight?: Weight
}>`
  ${({ color = 'white', size = 'normal', weight = 'normal' }) => {
    return css`
      color: var(${`--color-${color}`});
      font-size: var(${`--size-${size}`});
      font-weight: ${weight};
    `
  }}
`

export { Text }
