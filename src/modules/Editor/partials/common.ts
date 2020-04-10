import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { WHILE_HOVER, WHILE_TAP } from 'common/animations'

export const Button = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})`
  opacity: 0.6;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-right: 1em;
  padding: 0.2em;
  border-radius: 3px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      background: var(--color-grey);
      opacity: 1;
    `}

  img {
    width: 1.6em;
  }
`

export const Caption = styled.p`
  font-size: var(--size-normal);
  color: var(--color-white);
`

export const Select = styled.select`
  padding: 0 1.4em;
  color: var(--color-white);
`
