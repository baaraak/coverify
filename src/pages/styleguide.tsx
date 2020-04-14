import React from 'react'

import {
  Button,
  Text,
  Container,
  Column,
  Grid,
  useAlert,
  Tabs,
} from 'common/UI'

const StyleGuide: React.FC = () => {
  const dispatchAlert = useAlert()
  return (
    <Container>
      <div style={{ marginTop: '4em', marginBottom: '1em' }}>
        <Text size="heading">Buttons</Text>
      </div>

      <Grid>
        <Column from={1} to={7}>
          <Button variant="normal">Hello world</Button>
        </Column>
        <Column from={7} to={13}>
          <Button variant="outline">Outline button</Button>
        </Column>
      </Grid>

      <div style={{ marginTop: '4em', marginBottom: '1em' }}>
        <Text size="heading">Typography</Text>
      </div>
      <Text>Hello world</Text>
      <Text as="h1" size="huge" color="primary" weight="bold">
        Custom text
      </Text>

      <div style={{ marginTop: '4em', marginBottom: '1em' }}>
        <Text size="heading">Alert</Text>
      </div>
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

      <div style={{ marginTop: '4em', marginBottom: '1em' }}>
        <Text size="heading">Tabs</Text>
      </div>
      <Tabs
        data={[
          { title: 'Tab 1', content: <Text color="white">Tab 1</Text> },
          { title: 'Tab 2', content: <Text color="white">Tab 2</Text> },
        ]}
      />
    </Container>
  )
}

export default StyleGuide
