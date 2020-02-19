import React, { Component } from "react";
import { Container, Segment, Header, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
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
        case 0:
          return <Message>Please log in to use our application</Message>;
        case 1:
          return <Customer />;
        case 2:
          return <Rider />;
        case 3:
          return <Staff />;
        case 4:
          return <Manager />;
        default:
          return <p> an error has occured!</p>;
      }
    };
  }

  componentDidMount() {
    // mount and check  user Type
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
          {userType === 0 ? (
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
                <Button primary onClick={logout}>
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
export default Home;
