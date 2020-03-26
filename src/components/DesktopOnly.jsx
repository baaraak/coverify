import styled from 'styled-components'

export const DesktopOnly = styled.div`
  @media screen and (max-width: 1280px) {
    display: none;
  }
`

export const DesktopOnlyMessage = styled.p`
  text-align: center;
  margin: 100px 0;

  @media screen and (min-width: 1280px) {
    display: none;
  }
`
