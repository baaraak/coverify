import { motion } from 'framer-motion'
import React from 'react'
import styled, { css } from 'styled-components'

import { WHILE_HOVER, WHILE_TAP } from 'common/animations'
import { Text } from 'common/UI'

export const Button = styled(motion.button).attrs({
  whileHover: WHILE_HOVER,
  whileTap: WHILE_TAP,
})`
  opacity: 0.6;
  margin-right: 1.2em;
  border-radius: 3px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      opacity: 1;
    `}

  img {
    width: 1.6em;
  }
`

const CustomText = styled(Text)<{ gutter?: boolean }>`
  padding-bottom: ${({ gutter }) => (gutter ? '1em' : '0em')};
`

export const Caption: React.FC<{ gutter?: boolean }> = ({
  children,
  ...props
}) => (
  <CustomText color="white-light" {...props}>
    {children}
  </CustomText>
)

export const Select = styled.select`
  padding: 0 1.4em;
  color: var(--color-white);

  option {
    color: #000;
  }
`
