import React, { Component } from "react";
import { Container, Segment, Header, Button, Message } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import userContext from "../../../userContext";
import Rider from "../rider_view/Rider";
import Customer from "../customer_view/Customer";
import Manager from "../manager_view/Manager";
import Staff from "../staff_view/Staff";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: {},
      // loading: false,
      // initialLoading: false,
      userType: 0
      // 0 is no login
      // 1 is customer
      // 2 is rider
      // 3 is staff
      // 4 is manager
    };

    this.renderBody = userType => {
      switch (userType) {
        case "customer":
          return <Customer />;
        case "rider":
          return <Rider />;
        case "staff":
          return <Staff />;
        case "Manager":
          return <Manager />;
        default:
          return <Message>Please log in to use our application</Message>;
      }
    };
  }

  onLogout = () => {
    const { logout } = this.context;
    logout();
    this.props.history.push("/");
  };

  componentDidMount() {
    // mount and check  user Type
    if (this.context.isLoggedIn) {
      this.setState({ userType: this.context.user.type });
    }
  }

  componentDidUpdate() {
    // any update on user type
  }

  render() {
    const { userType } = this.state;
    const { user, logout } = this.context;
    const { email } = user;

    return (
      <div>
        <Container text textAlign="center">
          <Header>Welcome to KrapFood</Header>
          {!this.context.isLoggedIn ? (
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
                <Header>Welcome! {email}</Header>
                <Button primary onClick={this.onLogout}>
                  Log Out
                </Button>
              </Segment.Inline>
            </Segment>
          )}
          {this.renderBody(userType)}
        </Container>
      </div>
    );
  }
}

Home.contextType = userContext;
export default withRouter(Home);
