import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import {
  INITIAL_POSITION_INVERTED,
  ANIMATE_POSITION,
  createTransition,
} from 'common/animations'

const Tab = styled.div`
  border-top: 1px solid var(--color-white-lighter);
  display: flex;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(33, 33, 33, 1) 100%
  );
  background: linear-gradient(#141414, rgba(26, 27, 28, 0));
  padding: 2em 0;
  justify-content: center;
`

const TabItem = styled(motion.button)<{ current: boolean }>`
  font-size: var(--size-medium);
  color: var(--color-white);
  font-weight: 900;
  margin: 0 2em;
  opacity: 0.8;
  text-shadow: 0 1px 2px var(--color-white-lighter);
  transition: all 0.2s ease;

  ${({ current }) =>
    current &&
    css`
      opacity: 1;
      color: var(--color-primary);
    `}
`

const WrapperContent = styled(motion.div)`
  width: 100%;
  padding-top: 1em;
  padding-bottom: 4em;
  position: relative;
`

const HandleContent = styled(motion.div)<{ current: boolean }>`
  position: relative;
  z-index: 3;

  ${({ current }) =>
    !current &&
    css`
      overflow: hidden;
      pointer-events: none;
      position: absolute;
      top: 1em;
      width: 100%;
      z-index: 1;
    `}}
`

interface TabsProps {
  className?: string
  data: Array<{ title: string; content: React.ReactNode }>
}

const Tabs: React.FC<TabsProps> = ({ data, className }) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <>
      <Tab className={className}>
        {data.map(({ title }, index) => {
          return (
            <TabItem
              key={title}
              initial={INITIAL_POSITION_INVERTED}
              animate={ANIMATE_POSITION}
              transition={createTransition(1.4)}
              onClick={() => setCurrentTab(index)}
              current={currentTab === index}
            >
              {title}
            </TabItem>
          )
        })}
      </Tab>

      <WrapperContent
        initial={INITIAL_POSITION_INVERTED}
        animate={ANIMATE_POSITION}
        transition={createTransition(2)}
      >
        {data.map(({ content, title }, index) => {
          return (
            <HandleContent
              key={title}
              current={currentTab === index}
              animate={{
                opacity: currentTab === index ? 1 : 0,
                top: currentTab === index ? '0em' : '3em',
              }}
            >
              {content}
            </HandleContent>
          )
        })}
      </WrapperContent>
    </>
  )
}

export { Tabs }
