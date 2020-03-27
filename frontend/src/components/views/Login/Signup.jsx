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
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import userContext from '../../../userContext';
import config from '../../../config.json';

// @flow
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      // call sign up function
      const { signup } = this.context;
      signup();
    };

    this.handleSubmitCx = async (event : Event) => {
      const { email, password } = this.state;
      const { login } = this.context;
      event.preventDefault();
      await Axios.post(
        `${config.localhost}registrations/customer/sign-up`,
        { email, password },
        {
          headers: { 'Access-Control-Allow-Origin': true },
        },
      );
      try {
        await login(email, password, 'customer');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.handleSubmitMg = async (event) => {
      const { email, password } = this.state;
      const { login } = this.context;
      event.preventDefault();
      await Axios.post(
        `${config.localhost}registrations/manager/sign-up`,
        { email, password },
        {
          headers: { 'Access-Control-Allow-Origin': true },
        },
      );
      try {
        await login(email, password, 'manager');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.handleSubmitRd = async (event : Event) => {
      const { email, password } = this.state;
      const { login } = this.context;
      event.preventDefault();
      await Axios.post(
        `${config.localhost}registrations/rider/sign-up`,
        { email, password },
        {
          headers: { 'Access-Control-Allow-Origin': true },
        },
      );
      try {
        await login(email, password, 'rider');
        const { history } = this.props;
        history.push('/');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.handleSubmitStaff = async (event : Event) => {
      const { email, password } = this.state;
      const { login } = this.context;
      event.preventDefault();
      await Axios.post(
        `${config.localhost}registrations/staff/sign-up`,
        { email, password },
        {
          headers: { 'Access-Control-Allow-Origin': true },
        },
      );
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

  componentDidMount() {
    // console.log(this.context.test);
  }

  render() {

    

    const { email, password } = this.state;
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
                  <Button
                    color="blue"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleSubmitCx}
                  >
                    <Button.Content visible>Customer</Button.Content>
                    <Button.Content hidden>Sign-up!</Button.Content>
                  </Button>
                  <Button
                    color="green"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleSubmitRd}
                  >
                    <Button.Content visible>Rider</Button.Content>
                    <Button.Content hidden>Sign-up!</Button.Content>
                  </Button>
                  <Button
                    color="yellow"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleSubmitStaff}
                  >
                    <Button.Content visible>Staff</Button.Content>
                    <Button.Content hidden>Sign-up!</Button.Content>
                  </Button>
                  <Button
                    color="teal"
                    size="large"
                    compact
                    animated="fade"
                    onClick={this.handleSubmitMg}
                  >
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

export default withRouter(Signup);
