import styled from 'styled-components'

type Variant = 'normal' | 'outline'

const Button = styled.button<{ variant?: any }>`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  letter-spacing: 1px;
  text-transform: uppercase;

  border-radius: 1.25em;
  cursor: pointer;
  padding: 0.625em 1.875em;
`

export { Button }
