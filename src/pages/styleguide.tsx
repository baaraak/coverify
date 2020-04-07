import React from 'react'

import { Button, Text, Container, Column, Grid, useAlert } from 'common/UI'

const StyleGuide: React.FC = () => {
  const dispatchAlert = useAlert()
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

      <Text size="heading">Alert</Text>
      <Column from={1} to={7}>
        <Button
          onClick={() =>
            dispatchAlert.error(
              'Error: Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
            )
          }
        >
          Error alert
        </Button>
        <Button
          onClick={() =>
            dispatchAlert.success(
              'success: Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
            )
          }
        >
          Success alert
        </Button>
      </Column>
    </Container>
  )
}

export default StyleGuide
