import React from 'react'
import styled from 'styled-components'

import logOutSrc from './assets/logout.svg'

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  width: 1.8em;
  height: 1.8em;
  border-radius: 1.8em;
  margin-right: 1em;
`

export const AvatarInfo = styled.p`
  font-size: var(--size-normal);
  color: var(--color-white);
  padding: 0.5em 0;
`

export const ButtonLogOut = styled.button`
  margin-left: 1em;
  padding-left: 1em;
  border-left: 1px solid var(--color-white-lighter);
  height: 1em;

  img {
    width: 1em;
    opacity: 0.6;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`

interface UserAvatarProps {
  name?: string
  image?: string
  logOut: () => void
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, image, logOut }) => {
  return (
    <AvatarWrapper>
      <Avatar alt={name} src={image} />
      <AvatarInfo>{name}</AvatarInfo>

      <ButtonLogOut onClick={logOut}>
        <img src={logOutSrc} alt="Log out" />
      </ButtonLogOut>
    </AvatarWrapper>
  )
}

export { UserAvatar }
