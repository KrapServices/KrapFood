import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import userContext from '../../userContext';


class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.welcomeUser = (userType) => {
      switch (userType) {
        case 'customer':
          return <Header size="huge" as="h1" inverted>Welcome, Customer</Header>;
        case 'rider':
          return <Header size="huge" as="h1" inverted>Welcome, Rider</Header>;
        case 'staff':
          return <Header size="huge" as="h1" inverted>Welcome, Staff</Header>;
        case 'manager':
          return <Header size="huge" as="h1" inverted>Welcome, Manager</Header>;
        default:
          return <Header inverted>Super User</Header>;
      }
    };
  }

  render() {
    const { user, isLoggedIn } = this.context;
    const { children, onLogout } = this.props;
    return (
      <div>
        <Responsive>
          <Visibility once onBottomPassedReverse={this.hideFixedMenu}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 100, padding: '1em 1em', marginBottom: '50px' }}
              vertical
            >
              <Menu
                fluid
                widths={6}
                inverted
                size="small"
                icon="labeled"
                borderless
              >

                {!isLoggedIn
                  ? (
                    <>
                      <Menu.Item />
                      <Menu.Item />
                      <Menu.Item>
                        <Header as="h1" inverted>
                          <Icon name="road" />
                          KRAPFOOD
                        </Header>
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item />
                      <Menu.Item position="left">
                        {this.welcomeUser(user.type)}
                      </Menu.Item>
                    </>
                  )}
                {!isLoggedIn
                  ? (
                    <>
                      <Menu.Item as={Link} to="/login">
                        <Icon name="sign in" color="green" />
                        Log in
                      </Menu.Item>
                      <Menu.Item as={Link} to="/sign-up">
                        <Icon name="signup" color="blue" />
                        Sign up
                      </Menu.Item>
                    </>
                  )
                  : (
                    <>
                      <Menu.Item onClick={onLogout}>
                        <Icon name="cancel" color="red" />
                        Log Out
                      </Menu.Item>
                      <Menu.Item />
                    </>
                  )}
              </Menu>
            </Segment>
          </Visibility>
          <Container fluid className="site">
            <div className="site-content">{children}</div>
          </Container>
          {/* footer */}
          <Segment
            style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
            vertical
          />
        </Responsive>
      </div>
    );
  }
}

TopBar.contextType = userContext;

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;
