import React, { Component } from 'react';
import {
  List, Button, Rail, Segment, Grid, Input, Header,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';

class CustomerOrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRestaurants: [],
      shoppingCart: [],
    };

    this.loadRestaurants = async () => {
      const result = await Axios.get(`${config.localhost}restaurants/`);
      if (result.status === 200) {
        console.log(result.data.restaurants);
        this.setState({ listOfRestaurants: result.data.restaurants });
      } else {
        alert('cannot load restaurant');
      }
    };
  }

  componentDidMount() {
    this.loadRestaurants();
  }


  render() {
    const { listOfRestaurants } = this.state;

    return (
      <Grid columns={2} stackable>
        <Grid.Column>
          <Segment attached="top">
            <Header as="h2">Your Cart</Header>
          </Segment>
          <Segment attached> shoping cart items </Segment>
          <Segment attached="bottom">
            <Button.Group>
              <Button icon="delete" content="clear" />
              <Button.Or />
              <Button content="Order" color="green" />
            </Button.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Input icon="search" placeholder="Search..." />
            <List large divided relaxed>
              {listOfRestaurants === [] ? <div /> : listOfRestaurants.map((res) => (
                <List.Item>
                  <List.Content floated="left">
                    <List.Header as="h2">
                      {`Shop name: ${res.restaurant_name}`}
                    </List.Header>
                    {`Located at ${res.restaurant_location}`}
                  </List.Content>
                  <List.Content floated="right">
                    <Button primary> order</Button>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>

        </Grid.Column>
      </Grid>
    );
  }
}

CustomerOrderFood.contextType = userContext;

export default CustomerOrderFood;
