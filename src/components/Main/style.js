import styled, { createGlobalStyle } from 'styled-components'
import { motion } from 'framer-motion'

export const Global = createGlobalStyle`
  body { 
    background: #141414; 
    color: white; 
    font-family: 'Montserrat', sans-serif;
  }
`

export const WrapperGradient = styled.div`
  height: 510px;
  width: 100%;
  z-index: 9;
`

export const Gradient = styled(motion.div)`
  overflow: hidden;
  background: linear-gradient(0deg, #141414 0%, #363535 100%);
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
`
