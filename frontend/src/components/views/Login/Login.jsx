import React, { Component } from 'react';
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import userContext from '../../../userContext';

// import login from "./registration";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

    this.handleLoginCx = async (event) => {
      event.preventDefault();
      const { email, password } = this.state;
      const { login } = this.context;
      try {
        await login(email, password, 'customer');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.handleLoginMg = async (event) => {
      event.preventDefault();
      const { email, password } = this.state;
      const { login } = this.context;
      try {
        await login(email, password, 'manager');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.handleLoginRd = async (event) => {
      event.preventDefault();
      const { email, password } = this.state;
      const { login } = this.context;
      try {
        await login(email, password, 'rider');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.handleLoginStaff = async (event) => {
      event.preventDefault();
      const { email, password } = this.state;
      const { login } = this.context;
      try {
        await login(email, password, 'staff');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };
  }

  render() {
    const { email, password } = this.state;
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

                <Header>loging</Header>
                <Button.Group>
                  <Button
                    color="blue"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleLoginCx}
                  >
                    <Button.Content visible>Customer</Button.Content>
                    <Button.Content hidden>Login!</Button.Content>
                  </Button>
                  <Button
                    color="green"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleLoginRd}
                  >
                    <Button.Content visible>Rider</Button.Content>
                    <Button.Content hidden>Login!</Button.Content>
                  </Button>
                  <Button
                    color="yellow"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleLoginStaff}
                  >
                    <Button.Content visible>Staff</Button.Content>
                    <Button.Content hidden>Login!</Button.Content>
                  </Button>
                  <Button
                    color="teal"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleLoginMg}
                  >
                    <Button.Content visible>Manager</Button.Content>
                    <Button.Content hidden>Login!</Button.Content>
                  </Button>
                </Button.Group>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.contextType = userContext;

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(Login);
