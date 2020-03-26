import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled.div`
  background: #000;
  padding-bottom: 40px;
  position: fixed;
  top: 0;
  left: 0%;
  right: 0;
`

export const Container = styled.header`
  padding: 20px 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const WrapperLogo = styled.div`
  display: flex;
  align-items: center;
`

export const LogoImage = styled(motion.img)`
  height: 34px;
  padding-right: 2em;
  margin-right: 2em;
  border-right: 1px solid #ffffff10;
`

export const MenuItem = styled.a`
  opacity: 0.6;
  transition: all 0.2s ease;
  margin-right: 2em;

  &:hover {
    opacity: 1;
  }
`

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 10px;
`

export const AvatarInfo = styled.p`
  font-size: 14px;
  padding: 8px 0;
`

export const WrapperSignIn = styled.div`
  display: flex;
  align-items: center;
`

export const ErrorMessage = styled(motion.p)`
  margin-right: 20px;
  color: rgb(255, 73, 73);

  &:after {
    content: '';
    width: 5px;
    height: 5px;
    display: inline-block;
    border-top: 1px solid rgb(255, 73, 73);
    border-right: 1px solid rgb(255, 73, 73);
    transform: rotate(45deg) translateY(-2px);
    position: relative;
    margin-left: 6px;
  }
`

export const ButtonLogOut = styled.button`
  margin-left: 14px;
  padding-left: 14px;
  border-left: 1px solid #ffffff10;
  height: 16px;

  img {
    width: 16px;
    opacity: 0.6;
    transition: all 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`
