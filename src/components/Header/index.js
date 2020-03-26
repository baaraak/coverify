import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import { getUser } from '../actions'
import {
  Container,
  Wrapper,
  AvatarWrapper,
  Avatar,
  AvatarInfo,
  ButtonLogOut,
  WrapperSignIn,
  ErrorMessage,
  LogoImage,
  MenuItem,
  WrapperLogo,
} from './style'
import { Column } from '../Grid'
import { OutlineButton } from '../Button'
import SpotifyLogin from '../SpotifyLogin'
import { appName, description, url } from '../content'
import logOutSrc from '../../assets/logout.svg'
import logoSrc from '../../assets/logo.svg'
import githubSrc from '../../assets/github.svg'

const Header = () => {
  const token = useSelector(state => state.token)
  const user = useSelector(state => state.user)
  const needSign = useSelector(state => state.errors.needSign)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      getUser(token, dispatch)
    }
  }, [dispatch, token])

  return (
    <div style={{ height: 72 }}>
      <Wrapper>
        <Column>
          <Container>
            <WrapperLogo>
              <LogoImage src={logoSrc} alt={appName} />
              <MenuItem
                href="http://github.com/danilowoz/coverify/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Codebase
              </MenuItem>
              <MenuItem
                href="https://github.com/danilowoz/coverify/issues/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues
              </MenuItem>
              <MenuItem
                href={`https://twitter.com/intent/tweet?text=${appName} - ${description} %0A%0A${url}
                `}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share to Twitter
              </MenuItem>
            </WrapperLogo>

            {user ? (
              <AvatarWrapper>
                <Avatar alt={user.name} src={user.image} />
                <AvatarInfo>{user.name}</AvatarInfo>

                <ButtonLogOut onClick={() => dispatch({ type: 'LOG_OUT' })}>
                  <img src={logOutSrc} alt="Log out" />
                </ButtonLogOut>
              </AvatarWrapper>
            ) : (
              <WrapperSignIn>
                <ErrorMessage
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: needSign ? 1 : 0,
                    x: needSign ? 0 : 10,
                  }}
                >
                  You need to sign in
                </ErrorMessage>
                <motion.div animate={{ scale: needSign ? 1.05 : 1 }}>
                  <OutlineButton as={SpotifyLogin}>
                    Log in with Spotify
                  </OutlineButton>
                </motion.div>
              </WrapperSignIn>
            )}
          </Container>
        </Column>
      </Wrapper>
    </div>
  )
}

export default Header
