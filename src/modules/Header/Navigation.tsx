import React, { useContext } from 'react'
import styled from 'styled-components'

import { User } from './User'
import { MENU } from 'common/constants'
import i18n from 'common/i18n'
import { DependenciesContext } from 'common/service/context'
import { Text } from 'common/UI'

const Menu = styled.nav`
  flex: none;
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid var(--color-white-lighter);
  padding-bottom: 2em;
  margin-bottom: 2em;

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
    margin: 0.7em 0;
  }
`

const LanguageSelector = styled(MenuItem)`
  opacity: 0.4;
  font-size: var(--size-small);
  text-transform: uppercase;
`

const Navigation: React.FC = () => {
  const dependencies = useContext(DependenciesContext)
  const analyticsService = dependencies.get('analytics')

  // Analytics
  const event = (value: string) => {
    if (analyticsService) {
      analyticsService.logEvent('navigation', value)
    }
  }

  // Language
  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    window.location.reload()

    event(lang)
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
              onClick={() => event(item.href)}
            >
              {item.text}
            </MenuItem>
          )
        })}

        <LanguageSelector as="button" onClick={() => handleLanguage('en-US')}>
          EN
        </LanguageSelector>
        <LanguageSelector as="button" onClick={() => handleLanguage('pt-BR')}>
          PT
        </LanguageSelector>
      </Menu>

      <User />
    </>
  )
}

export { Navigation }
