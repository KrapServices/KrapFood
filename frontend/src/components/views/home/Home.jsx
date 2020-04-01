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
          // return <Message>Please log in to use our application</Message>;
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
    return (
      <div>
        <TopBar onLogout={this.onLogout}>
          <Container fluid textAlign="center">
            {
          isLoggedIn ? <div />

            : <Header>Welcome to KrapFood</Header>
}
            {this.renderBody(user.type)}

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
