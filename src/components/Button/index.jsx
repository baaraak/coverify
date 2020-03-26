import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const common = css`
  color: #fff;
  border-radius: 20px;
  padding: 10px 30px;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const OutlineButton = styled(motion.button).attrs({
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.95 },
})`
  ${common};
  border: 1px solid #fff;
`

export const Button = styled(motion.button).attrs({
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.95 },
})`
  ${common};
  display: inline-flex;
  background: #1db954;
`

export const RoundedButton = styled(motion.button).attrs({
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.95 },
})`
  ${common}
  padding: 0;
  border: 1px solid #fff;
  width: 36px;
  height: 36px;
  text-align: center;

  * {
    display: inline-block;
    position: relative;
    top: 2px;
  }
`
