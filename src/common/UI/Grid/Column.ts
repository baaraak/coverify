import styled from 'styled-components'

const Column = styled.div<{ from?: number; to?: number }>`
  grid-column: ${({ from = 0, to = 12 }) => `${from} / ${to}`};
`

export { Column }
