/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import {
  Container, Segment, Header, Button, Message,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import userContext from '../../../userContext';
import Rider from '../rider_view/Rider';
import Customer from '../customer_view/Customer';
import Manager from '../manager_view/Manager';
import Staff from '../staff_view/Staff';
import GenerateData from '../../utils/GenerateData';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderBody = (userType) => {
      switch (userType) {
        case 'customer':
          return <Customer />;
        case 'rider':
          return <Rider />;
        case 'staff':
          return <Staff />;
        case 'manager':
          return <Manager />;
        default:
          return <Message>Please log in to use our application</Message>;
      }
    };

    this.onLogout = () => {
      const { logout } = this.context;
      logout();
      const { history } = this.props;
      history.push('/');
    };
  }

  render() {
    const { user, isLoggedIn } = this.context;
    const { email } = user;
    return (
      <div>
        <Container fluid textAlign="center">
          <Header>Welcome to KrapFood</Header>
          {!isLoggedIn ? (
            <Segment>
              <Segment.Inline>
                <Button primary as={Link} to="/login">
                  Log in
                </Button>
                <Button as={Link} color="green" to="/sign-up">
                  Sign up
                </Button>
              </Segment.Inline>
            </Segment>
          ) : (
            <Segment>
              <Segment.Inline>
                <Header>
                  Welcome!
                </Header>
                <Header>
                  {email}
                </Header>
                <Button primary onClick={this.onLogout}>
                  Log Out
                </Button>
              </Segment.Inline>
            </Segment>
          )}
          {this.renderBody(user.type)}
          { /** *********** */
            // use this to generate data
            // remember to run npm run build before using this.
          }
          <GenerateData />
        </Container>
      </div>
    );
  }
}
Home.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

Home.contextType = userContext;
export default withRouter(Home);
