import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { UserAvatar } from './UserAvatar'
import { MENU } from 'common/constants'
import { Text, Button } from 'common/UI'
import {
  UserLoginButton,
  selectors as userSelectors,
  types as userTypes,
} from 'modules/User'

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
  const isConnected = useSelector(userSelectors.isConnected)
  const userData = useSelector(userSelectors.getUserData, shallowEqual)
  const dispatch = useDispatch()

  const endSession = () => {
    dispatch({ type: userTypes.LOG_OUT })
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
      </Menu>
      {isConnected && userData ? (
        <UserAvatar
          name={userData.userName}
          image={userData.userImage}
          logOut={endSession}
        />
      ) : (
        <Button as={UserLoginButton} variant="outline">
          Log in with Spotify
        </Button>
      )}
    </>
  )
}

export { Navigation }
