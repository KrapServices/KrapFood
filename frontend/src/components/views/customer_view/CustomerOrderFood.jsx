import React, { Component } from 'react';
import {
  List, Button, Segment, Grid, Input, Header,
} from 'semantic-ui-react';
import Axios from 'axios';
import Cart from './Cart';
import config from '../../../config.json';
import customerCartContext from './customerCartContext';
import RestaurantCard from './RestaurantCard';

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
        this.setState({ listOfRestaurants: result.data.restaurants });
      } else {
        alert('cannot load restaurant');
      }
    };
    this.addToCart = (food) => {
      const { shoppingCart } = this.state;
      shoppingCart.push(food);
      this.setState({ shoppingCart });
    };

    this.removeFromCart = (index) => {
      let { shoppingCart } = this.state;
      shoppingCart = shoppingCart.filter((x, current) => current !== index);
      this.setState({ shoppingCart });
    };
  }

  componentDidMount() {
    this.loadRestaurants();
  }


  render() {
    const { listOfRestaurants, shoppingCart } = this.state;
    const value = {
      shoppingCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    };

    return (
      <customerCartContext.Provider value={value}>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Segment attached="top">
              <Header as="h2">Your Cart</Header>
            </Segment>
            <Segment attached>
              <Cart />
            </Segment>
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
              <Header as="h1"> List Of Restaurants </Header>
              <List divided relaxed>
                {listOfRestaurants === [] ? <div /> : listOfRestaurants.map((restaurant) => (
                  <RestaurantCard res={restaurant} />
                ))}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </customerCartContext.Provider>

    );
  }
}

CustomerOrderFood.contextTypes = customerCartContext;
export default CustomerOrderFood;
