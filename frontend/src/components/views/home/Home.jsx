/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import {
  Container, Segment, Header, Button, Message, ButtonContent,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import userContext from '../../../userContext';
import Rider from '../rider_view/Rider';
import Customer from '../customer_view/Customer';
import Manager from '../manager_view/Manager';
import Staff from '../staff_view/Staff';
import TopBar from '../../layout/TopBar';

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
          //return <Message>Please log in to use our application</Message>;
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
        <TopBar onLogout={this.onLogout}>
        <Container fluid textAlign="center">
          <Header>Welcome to KrapFood</Header>
          {!isLoggedIn ? (
            <Segment>
              <Segment>
                <Button primary as={Link} to="/login">
                  Log in
                </Button>
              </Segment>
              <Message>
                <Message.Content>Don't have an account yet?</Message.Content>
              </Message>
              <Segment.Inline>
                  <Button
                  color="blue"
                  size="small"
                  compact
                  as={Link} to="/customer-signup">
                    <ButtonContent>Customer Sign-up</ButtonContent>
                  </Button>
                  <Button
                  color="green"
                  size="small"
                  compact
                  as={Link} to="/rider-signup">
                    <ButtonContent>Rider Sign-up</ButtonContent>
                  </Button>
                  <Button
                  color="yellow"
                  size="small"
                  compact
                  as={Link} to="/staff-signup">
                    <ButtonContent>Staff Sign-up</ButtonContent>
                  </Button>
                  <Button
                  color="teal"
                  size="small"
                  compact
                  as={Link} to="/manager-signup">
                    <ButtonContent>Manager Sign-up</ButtonContent>
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
        </Container>
        </TopBar>
      </div>
    );
  }
}
Home.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

Home.contextType = userContext;
export default withRouter(Home);
