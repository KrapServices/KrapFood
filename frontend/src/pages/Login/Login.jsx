import React, { Component } from "react";
import {
  Grid,
  Container,
  Form,
  Segment,
  Header,
  Image,
  Button,
  Message,
  Icon

} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" to ="/" >
                      <Icon name="road" size="large"></Icon>
                      KrapFood
                    </Header>
            <Header as="h2" color="teal" textAlign="center">
              Log-in
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              <Message.Header>new to us?</Message.Header>
              <Message.Content>
                  <br></br>
                  <Button as={Link} color="red" to="/">Back to Home</Button>
                <Button primary size="small" as={Link} to="/sign-up">
                  Sign up!
                </Button>
                
              </Message.Content>
              </Message>
           
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
