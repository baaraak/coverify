import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  z-index: 9;
`

export const CoverWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
`

export const Info = styled(motion.div)`
  margin-left: 50px;
  margin-bottom: 50px;
`

export const ImageHandle = styled(motion.div)`
  width: 420px;
  height: 100%;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;
  flex-shrink: 0;

  grammarly-extension {
    display: none !important;
  }
`

export const Content = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 420px;
  height: 420px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transform-origin: left top;
`

export const EmptySpace = styled(motion.div)`
  width: 490px;
  height: 100%;
`

export const TextareaTop = styled.div`
  font-size: 16px;
  font-weight: 900;
  width: 100%;
`

export const TextareaCenter = styled.div`
  font-weight: 900;
  width: 100%;
  margin: auto;
  line-height: 1;
  outline: none;
`

export const Caption = styled(motion.p)`
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
`

export const Title = styled(motion.h2)`
  font-size: 48px;
  font-weight: 900;
  transform-origin: left;
  letter-spacing: -1px;
`

export const Description = styled(motion.p)`
  font-size: 13px;
  color: #aaa;
  padding: 8px 0;

  span {
    color: #fff;
  }
`

export const Handlers = styled.div`
  margin-top: 20px;

  > * {
    margin-right: 20px;
  }
`

export const LoadingHandle = styled(motion.div)`
  display: inline-block;
  margin-left: 16px;
  margin-right: -16px;
  overflow: hidden;

  svg {
    width: 16px;
    height: auto;
  }
`
