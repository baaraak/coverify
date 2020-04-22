import React from 'react'
import styled from 'styled-components'

import { User } from './User'
import { MENU } from 'common/constants'
import i18n from 'common/i18n'
import { Text } from 'common/UI'

const Menu = styled.nav`
  flex: 0;
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid var(--color-white-lighter);
  padding-bottom: 4em;
  margin-bottom: 4em;

  @media (min-width: 60em) {
    flex-direction: row;
    flex: 1;
    padding: 0.85em;
    margin-left: 2em;
    padding-left: 2em;
    margin-bottom: 0;

    border-bottom: 0;
    border-left: 1px solid var(--color-white-lighter);
  }
`

const MenuItem = styled(Text)`
  opacity: 0.6;
  transition: all 0.2s ease;
  margin-right: 2em;

  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 60em) {
    opacity: 1;
    text-align: center;
    width: 100%;
    margin: 1em 0;
  }
`

const Navigation: React.FC = () => {
  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    window.location.reload()
  }

  return (
    <>
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

        <MenuItem>
          <button onClick={() => handleLanguage('en-US')}>EN</button>
        </MenuItem>
        <MenuItem>
          <button onClick={() => handleLanguage('pt-BR')}>PT</button>
        </MenuItem>
      </Menu>

      <User />
    </>
  )
}

export { Navigation }
