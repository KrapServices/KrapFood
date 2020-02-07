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
import { UserContext } from "../../userContext";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }


  render() {
    return (
      <UserContext.Consumer>
        {({ user, logoutUser }) => {
          return <div>
            <Grid
            container
         
              textAlign="center"
              style={{ height: "100vh" }}
              verticalAlign="middle"
            >
              <Grid.Column >
                <Header as="h1" to="/">
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
                  <Header>Choose your account type</Header>  
                  <Button.Group>
                  <Button color="blue"  size="large" compact  animated='fade'> 
                      <Button.Content visible>Customer</Button.Content>
                      <Button.Content hidden>Sign-up!</Button.Content> 
                    </Button>
                    <Button color="green"  size="large" compact  animated='fade'>
                      <Button.Content visible>Rider</Button.Content> 
                      <Button.Content hidden>Sign-up!</Button.Content> 
                    </Button>
                    <Button color="yellow"size="large" compact  animated='fade'>
                      <Button.Content visible>Staff</Button.Content> 
                      <Button.Content hidden>Sign-up!</Button.Content> 
                    </Button>
                    <Button color="teal" size="large" compact  animated='fade'>
                      <Button.Content visible>Manager</Button.Content> 
                      <Button.Content hidden>Sign-up!</Button.Content> 
                    </Button>
                  </Button.Group>
                  </Segment>
                </Form>
                <Segment>
                  <Message>
                    <Message.Header>Already have an account?</Message.Header>
                    <Message.Content>
                      <br></br>
                      <Button as={Link} color="red" to="/">
                        Back to Home
                      </Button>
                      <Button primary size="small" as={Link} to="/login">
                        Log in
                      </Button>
                    </Message.Content>
                  </Message>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>;
        }}
      </UserContext.Consumer>
    );
  }
}
