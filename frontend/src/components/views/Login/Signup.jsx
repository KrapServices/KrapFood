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
import { userContext } from "../../../userContext";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""    
    };
  }

  redirectHome = () => {
    this.props.history.push("/");
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    //console.log(this.context.test);
  };

  handleSubmit = event => {
    //TODO: pass user type e.g customer to here to submit to correct endpoint;
    event.preventDefault();
    console.table(this.state);
    // call sign up function
    this.context.signup();
    
  }




  render() {
    const {email, password, error} = this.state;
    return (
      <React.Fragment>
        <Grid
          container
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column>
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
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Header>Choose your account type</Header>
                <Button.Group>
                  <Button color="blue" size="large" compact animated="fade" onClick={this.handleSubmit}>
                    <Button.Content visible>Customer</Button.Content>
                    <Button.Content hidden>Sign-up!</Button.Content>
                  </Button>
                  <Button color="green" size="large" compact animated="fade" onClick={this.handleSubmit}>
                    <Button.Content visible>Rider</Button.Content>
                    <Button.Content hidden>Sign-up!</Button.Content>
                  </Button>
                  <Button color="yellow" size="large" compact animated="fade" onClick={this.handleSubmit}>
                    <Button.Content visible>Staff</Button.Content>
                    <Button.Content hidden>Sign-up!</Button.Content>
                  </Button>
                  <Button color="teal" size="large" compact animated="fade" onClick={this.handleSubmit}>
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
              {error
            ? (
              <Message negative>
                <Message.Header>We can't sign you up:</Message.Header>
                <p>{this.state.error}</p>  
              </Message>              
              )
            : (<span></span>)}
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
Signup.contextType = userContext;
export default Signup;
