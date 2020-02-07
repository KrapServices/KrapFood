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
import { Link } from "react-router-dom";
export default class Signup extends Component {
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
              Sign-Up
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
                  Sign up
                </Button>
              </Segment>
            </Form>
            <Segment>
            <Message>
              <Message.Header>Already have an account?</Message.Header>
              <Message.Content>
                  <br></br>
                  <Button as={Link} color="red" to="/">Back to Home</Button>
                <Button primary size="small" as={Link} to="/login">
                  Log in
                </Button>
              </Message.Content>
            </Message>
            </Segment>
           
     
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
