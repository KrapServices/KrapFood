import React, { Component } from "react";
import {
  Grid,
  Container,
  Form,
  Segment,
  Header,
  Image,
  Button,
  Message
} from "semantic-ui-react";
import {Link} from "react-router-dom"
import Login from './Login/Login';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Container text textAlign="center">
        <Header>Welcome to KrapFood</Header>
        <Segment><Segment.Inline>
      <Button primary as={Link} to="/login">Log in</Button>
      <Button  as={Link} color="green" to="/sign-up">Sign up</Button>
    </Segment.Inline></Segment>
        </Container>
      </div>
    );
  }
}
