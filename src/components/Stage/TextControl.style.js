import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled(motion.div)`
  align-self: center;
  position: absolute;
  right: 0;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ffffff10;

  > *:last-child {
    margin-right: 0;
  }
`

export const VerticalDivisor = styled.div`
  height: 32px;
  margin-right: 14px;
  border-left: 1px solid #ffffff10;
`

export const Caption = styled.p`
  font-size: 14px;
  opacity: 0.4;
`

export const Select = styled.select`
  padding: 20px;
`

export const Button = styled(motion.button).attrs({
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.95 },
})`
  opacity: 0.6;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 14px;
  padding: 4px;
  border-radius: 3px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }

  ${({ active }) =>
    active &&
    css`
      background: #1a1b1c;
      opacity: 1;
    `}

  img {
    width: 26px;
  }
`

export const Colors = styled.div`
  width: 300px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

export const ColorButton = styled(motion.button).attrs({
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.95 },
})`
  width: calc(200px / 4.6);
  height: 39px;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;

  div {
    width: 100%;

    &:first-child {
      height: 30%;
    }
    &:last-child {
      height: 70%;
    }
  }
`
