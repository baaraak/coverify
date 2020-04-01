import React from 'react'

import { Button, Text, Container, Column, Grid } from 'common/UI'

const Index: React.FC = () => {
  return (
    <Container>
      <Text size="heading">Buttons</Text>

      <Grid>
        <Column from={1} to={7}>
          <Button variant="normal">Hello world</Button>
        </Column>
        <Column from={7} to={13}>
          <Button variant="outline">Outline button</Button>
        </Column>
      </Grid>

      <Text size="heading">Typography</Text>
      <Text>Hello world</Text>
      <Text as="h1" size="huge" color="primary" weight="bold">
        Custom text
      </Text>
    </Container>
  )
}

export default Index
