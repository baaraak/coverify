import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 60px;
  position: relative;
`

export const Tab = styled.div`
  border-top: 1px solid #ffffff10;
  display: flex;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(33, 33, 33, 1) 100%
  );

  position: sticky;
  top: 139px;
  z-index: 9;
  background: linear-gradient(#141414, rgba(26, 27, 28, 0));
  padding: 30px 0 45px 432px;
`

export const TabItem = styled(motion.button)`
  font-size: 18px;
  margin: 0 30px;
  opacity: 0.8;
  font-weight: 900;
  text-shadow: 0 1px 2px #00000059;
  transition: all 0.2s ease;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      color: #15d458;
    `}
`
