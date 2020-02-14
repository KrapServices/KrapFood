import React, { Component } from "react";
import {
  Grid,
  Container,
  Form,
  Segment,
  Header,
  Image,
  Button,
  Message,
  Loader
} from "semantic-ui-react";
import { Link, Switch } from "react-router-dom";
import { userContext } from "../../../userContext";
import Rider from "../rider_view/Rider";
import Customer from "../customer_view/Customer";
import Manager from "../manager_view/Manager";
import Staff from "../staff_view/Staff";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
      initialLoading: false,
      userType: 0
      // 0 is no login
      // 1 is customer
      // 2 is rider
      // 3 is staff
      // 4 is manager
    };
  }

  renderSwitch = userType => {
    switch (userType) {
      case 0:
        return <Message>Please log in to use our application</Message>;
        break;
      case 1:
        return <Customer></Customer>;
        break;
      case 2:
       return  <Rider></Rider>;
        break;
      case 3:
       return  <Staff></Staff>;
        break;
      case 4:
        return <Manager></Manager>;
        break;
      default:
       return  <p> an error has occured!</p>
        break;
    }
  };

  render() {
    const { userType } = this.state;

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
                <Header>Welcome! {this.context.user.email}</Header>
                <Button primary onClick={this.context.logout}>
                  Log Out
                </Button>
              </Segment.Inline>
            </Segment>
          )}
          {this.renderSwitch(userType)}
        </Container>
      </div>
    );
  }
}

Home.contextType = userContext;
export default Home;
