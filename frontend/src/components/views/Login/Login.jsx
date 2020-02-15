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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.redirectHome = () => {
      const { history } = this.props;
      history.push('/');
    };

    this.handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    this.handleSubmit = (event) => {
      event.preventDefault();
      // const { username, email, password } = this.state;

      // const user = {
      //   username,
      //   email,
      //   password,
      // };

      const { login } = this.context;

      // call login here
      login();
    };
  }

  render() {
    const {
      email, password, error,
    } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" to="/">
              <Icon name="road" size="large" />
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
              <Message.Header>New to us?</Message.Header>
              <Message.Content>
                <br />
                <Button as={Link} color="red" to="/">
                  Back to Home
                </Button>
                <Button primary size="small" as={Link} to="/sign-up">
                  Sign up!
                </Button>
              </Message.Content>
            </Message>
            {error ? (
              <Message negative>
                <Message.Header>We can't log you in:</Message.Header>
                <p>{error}</p>
              </Message>
            ) : (
              <span />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.contextType = userContext;

Login.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Login;
