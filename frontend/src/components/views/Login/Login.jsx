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

class Login extends Component {
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
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;

    let user = {
      username: username,
      email: email,
      password: password
    };
    //call login here
    this.context.login();
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" to="/">
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

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              <Message.Header>new to us?</Message.Header>
              <Message.Content>
                <br></br>
                <Button as={Link} color="red" to="/">
                  Back to Home
                </Button>
                <Button primary size="small" as={Link} to="/sign-up">
                  Sign up!
                </Button>
              </Message.Content>
            </Message>
            {this.state.error ? (
              <Message negative>
                <Message.Header>We can't log you in:</Message.Header>
                <p>{this.state.error}</p>
              </Message>
            ) : (
              <span></span>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.contextType = userContext;
export default Login;
