import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { WHILE_HOVER, WHILE_TAP } from 'common/constants'

type Variant = 'normal' | 'outline'

type ColorSchema = {
  [key in Variant]: { [key in 'backgroundColor' | 'borderColor']: string }
}

const colorSchema: ColorSchema = {
  normal: {
    backgroundColor: '--color-primary',
    borderColor: '--color-primary',
  },
  outline: {
    backgroundColor: '--color-dark',
    borderColor: '--color-white',
  },
}

const Button = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})<{ variant?: Variant }>`
  color: var(--color-white);
  font-size: ${({ theme }) => theme.fontSizes.normal};
  letter-spacing: 1px;
  text-transform: uppercase;

  border-radius: 1.25em;
  cursor: pointer;
  padding: 0.625em 1.875em;
  border-width: 1px;
  border-style: solid;

  &:active {
    color: var(--color-white);
  }

  ${({ variant = 'normal' }) => {
    const backgroundColorKey = colorSchema[variant].backgroundColor
    const borderColorKey = colorSchema[variant].borderColor

    return css`
      background-color: ${backgroundColorKey};
      border-color: ${borderColorKey};
    `
  }}
`

export { Button }
