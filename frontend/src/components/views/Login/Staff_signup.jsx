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

class Staff_signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      restaurantId: '',
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

    this.handleSubmitStaff = async (event) => {
      const { email, password, restaurantId } = this.state;
      const { login } = this.context;
      event.preventDefault();
      await Axios.post(
        `${config.localhost}registrations/staff/sign-up`,
        { email, password, restaurantId },
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
    const { email, password, restaurantId } = this.state;
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
                <Form.Input
                  fluid
                  icon="info"
                  iconPosition="left"
                  placeholder="Restaurant ID"
                  type="restaurantId"
                  name="restaurantId"
                  value={restaurantId}
                  onChange={this.handleChange}
                />
                <Button
                    color="yellow"
                    size="large"
                    compact
                    onClick={this.handleSubmitStaff}
                >
                    <Button.Content visible>Sign-up!</Button.Content>
                </Button>
              </Segment>
            </Form>
            <Segment>
              <Message>
                <Message.Header>Already have an account?</Message.Header>
                <Message.Content>
                  <br />
                  <Button size="small" as={Link} color="red" to="/sign-up">
                    Back to Sign up
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

Staff_signup.contextType = userContext;

Staff_signup.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withRouter(Staff_signup);
