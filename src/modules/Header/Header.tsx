import React from 'react'
import styled from 'styled-components'

import logoSrc from './logo.svg'
import { MENU, APP_NAME } from 'common/constants'
import { Container as BaseContainer, Text, Button } from 'common/UI'

const Wrapper = styled.div`
  height: 4.8em;
`

const Background = styled.header`
  background: var(--color-black);
  padding-top: 1em;
  padding-bottom: 1em;

  position: fixed;
  top: 0;
  left: 0%;
  right: 0;
`

const Container = styled(BaseContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Menu = styled.nav`
  display: flex;
  border-left: 1px solid var(--color-white--light);
  padding: 0.85em;
  margin-left: 2em;
  padding-left: 2em;
  flex: 1;
`

export const MenuItem = styled(Text)`
  opacity: 0.6;
  transition: all 0.2s ease;
  margin-right: 2em;

  &:hover {
    opacity: 1;
  }
`

export const LogoImage = styled.img`
  height: 1.8em;
  display: block;
`

const Header = () => {
  return (
    <Wrapper>
      <Background>
        <Container>
          <LogoImage src={logoSrc} alt={APP_NAME} />
          <Menu>
            {MENU.map((item) => {
              return (
                <MenuItem
                  key={item.href}
                  as="a"
                  rel="noopener noreferrer"
                  size="medium"
                  target="_blank"
                  href={item.href}
                >
                  {item.text}
                </MenuItem>
              )
            })}
          </Menu>

          <Button variant="outline">Log in with Spotify</Button>
        </Container>
      </Background>
    </Wrapper>
  )
}

export { Header }
