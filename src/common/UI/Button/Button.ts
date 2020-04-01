import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { WHILE_HOVER, WHILE_TAP } from 'common/constants'
import type { ColorVariant } from 'common/UI'

type Variant = 'normal' | 'outline'

type ColorSchema = {
  [key in Variant]: { [key in 'backgroundColor' | 'borderColor']: ColorVariant }
}

const colorSchema: ColorSchema = {
  normal: {
    backgroundColor: 'primary',
    borderColor: 'primary',
  },
  outline: {
    backgroundColor: 'dark',
    borderColor: 'white',
  },
}

const Button = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})<{ variant?: Variant }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  letter-spacing: 1px;
  text-transform: uppercase;

  border-radius: 1.25em;
  cursor: pointer;
  padding: 0.625em 1.875em;
  border-width: 1px;
  border-style: solid;

  &:active {
    color: ${({ theme }) => theme.colors.white};
  }

  ${({ theme, variant = 'normal' }) => {
    const backgroundColorKey = colorSchema[variant].backgroundColor
    const borderColorKey = colorSchema[variant].borderColor

    return css`
      background-color: ${theme.colors[backgroundColorKey]};
      border-color: ${theme.colors[borderColorKey]};
    `
  }}
`

export { Button }
