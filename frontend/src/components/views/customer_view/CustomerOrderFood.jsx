import React, { Component } from 'react';
import {
  List, Button, Segment, Grid, Input, Header, Search, Divider,
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
      selectedRestaurantId: -1,
    };

    this.orderFromThisRestaurant = (id) => {
      console.log('yums');
      const { listOfRestaurants } = this.state;
      this.setState({ selectedRestaurantId: id, listOfRestaurants: listOfRestaurants.filter((x) => x.restaurant_id === id) });
    };

    this.resetCurrentOrder = () => {
      this.loadRestaurants();
      this.clearCart();
      this.setState({selectedRestaurantId: -1});
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
    this.clearCart = () => {
      this.setState({ shoppingCart: [] });
    };
    this.calculateTotal = () => {
      const { shoppingCart } = this.state;
      const priceList = shoppingCart.map((x) => Number(x.price));
      const result = priceList.reduce((prev, curr) => prev + curr, 0);
      console.log(result);
      return result;
    };


    this.createOrder = async () => {
      const { shoppingCart } = this.state;
      const { customer_id } = this.props.user;
      // get ID
      const listOfFoods = [];

      const listOfFoodId = new Set();
      shoppingCart.forEach((x) => listOfFoodId.add(x.food_id));
      listOfFoodId.forEach((id) => {
        const count = shoppingCart.filter((x) => x.food_id === id).length;
        const qtyAndID = { food_id: id, quantity: count };
        listOfFoods.push(qtyAndID);
      });

      const price = this.calculateTotal();
      try {
        const result = await Axios.post(
          `${config.localhost}orders/`,
          {
            customer_id,
            total_cost: price,
            status: 'preparing',
            listOfFoods,
            delivery_location: 'test location',
          },
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
        this.clearCart();
        alert('order created!');
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };
  }

  componentDidMount() {
    this.loadRestaurants();
  }


  render() {
    const { listOfRestaurants, shoppingCart, selectedRestaurantId } = this.state;
    const value = {
      shoppingCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      selectedRestaurantId,
    };
    const price = this.calculateTotal();

    return (
      <customerCartContext.Provider value={value}>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Segment attached="top">
              <Header as="h2">Your Cart</Header>
            </Segment>
            <Segment attached>
              <Cart />

              <div style={{ marginBottom: '30px' }}>
                <Header floated="left">Total</Header>
                <Header floated="right">
                  {' '}
                  $
                  {price}
                </Header>
              </div>

            </Segment>
            <Segment attached="bottom">
              <Button.Group>
                <Button icon="delete" content="clear" onClick={() => this.clearCart()} />
                <Button.Or />
                <Button content="Confirm Order" color="green" onClick={() => this.createOrder()} />
              </Button.Group>
            </Segment>

            { selectedRestaurantId === -1 ? <Header> Click on a restaurant to order </Header> : <Button onClick={this.resetCurrentOrder}>Change restaurant</Button> }
          </Grid.Column>
          <Grid.Column>
            <Search fluid />
            <Segment>
              <Header as="h1"> List Of Restaurants </Header>
              <Divider />
              <List divided relaxed>
                {listOfRestaurants.map((restaurant) => (
                  <React.Fragment key={restaurant.restaurant_id}>
                    <RestaurantCard res={restaurant} orderFromThisRestaurant={this.orderFromThisRestaurant} />
                  </React.Fragment>
                ))}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </customerCartContext.Provider>

    );
  }
}

CustomerOrderFood.contextType = customerCartContext;
export default CustomerOrderFood;
