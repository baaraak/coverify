import React from 'react'

import { Button, Text } from 'common/UI'

const Index: React.FC = () => {
  return (
    <div>
      <Text size="heading">Buttons</Text>

      <Button variant="normal">Hello world</Button>
      <Button variant="outline">Outline button</Button>

      <Text size="heading">Typography</Text>
      <Text>Hello world</Text>
      <Text as="h1" size="huge" color="primary" weight="bold">
        Custom text
      </Text>
    </div>
  )
}

export default Index
