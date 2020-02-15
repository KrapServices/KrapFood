import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import userContext from '../../../userContext';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    this.redirectHome = () => {
      const { history } = this.props;
      history.push('/');
    };

    this.handleSubmit = (event) => {
      // TODO: pass user type e.g customer to here to submit to correct endpoint;
      event.preventDefault();
      console.table(this.state);
      // call sign up function
      const { signup } = this.context;
      signup();
    };
  }

  componentDidMount() {
    // console.log(this.context.test);
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <>
        <Grid
          container
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Header as="h1" to="/">
              <Icon name="road" size="large" />
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
                  <br />
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
                    <p>{error}</p>
                  </Message>
                )
                : (<span />)}
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

Signup.contextType = userContext;

Signup.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Signup;
