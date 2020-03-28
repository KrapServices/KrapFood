/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import _ from 'lodash';
import faker from 'faker';
import {
  List, Button, Segment, Grid, Header, Search, Divider, Message, Icon,
} from 'semantic-ui-react';
import Axios from 'axios';
import Cart from './Cart';
import config from '../../../config.json';
import customerCartContext from './customerCartContext';
import RestaurantCard from './RestaurantCard';

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}));


class CustomerOrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: '',
      results: [],
      listOfRestaurants: [],
      shoppingCart: [],
      selectedRestaurantId: -1,
    };

    this.orderFromThisRestaurant = (id) => {
      const { listOfRestaurants } = this.state;
      this.setState({
        selectedRestaurantId: id,
        listOfRestaurants: listOfRestaurants.filter((x) => x.restaurant_id === id),
      });
    };

    this.resetCurrentOrder = () => {
      this.loadRestaurants();
      this.clearCart();
      this.setState({ selectedRestaurantId: -1 });
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
      return result;
    };
    this.minimum = () => {
      const { selectedRestaurantId, listOfRestaurants } = this.state;
      if (selectedRestaurantId === -1) {
        return true;
      }
      return this.calculateTotal() <= listOfRestaurants[0].price_threshold;
    };


    // =========================================================================
    // Axios calls
    // =========================================================================
    this.createOrder = async () => {
      const { shoppingCart } = this.state;
      const { user } = this.props;
      const { customer_id } = user;
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
        //  console.log(result);
        this.clearCart();
        alert('order created!');
      } catch (error) {
        //  console.log(error);
        alert('error has occured');
      }
    };


    // -------------------------------------------------------------------------
    // Search stuff
    // -------------------------------------------------------------------------

    this.handleResultSelect = (e, { result }) => this.setState({ value: result.title });


    this.handleSearchChange = (e, { value }) => {
      const initialState = { isLoading: false, results: [], value: '' };
      this.setState({ isLoading: true, value });

      setTimeout(() => {
        if (this.state.value.length < 1) return this.setState(initialState);

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = (result) => re.test(result.title);

        this.setState({
          isLoading: false,
          results: _.filter(source, isMatch),
        });
      }, 300);
    };
  }

  componentDidMount() {
    this.loadRestaurants();
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    const {
      listOfRestaurants, shoppingCart, selectedRestaurantId, isLoading, results,
      value,
    } = this.state;
    const value2 = {
      shoppingCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      selectedRestaurantId,
    };
    const price = this.calculateTotal();
    return (
      <customerCartContext.Provider value={value2}>
        <Grid columns={1} stackable>
          <Grid.Column>
            <Segment attached="top" color="grey">
              <Header as="h2">Your Cart</Header>
            </Segment>
            <Segment attached color="grey">
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
            <Segment attached="bottom" color="grey">
              <Button.Group>
                <Button icon="delete" content="clear" onClick={() => this.clearCart()} />
                <Button.Or />
                <Button content="Confirm Order" color="green" onClick={() => this.createOrder()} disabled={this.minimum()} />
              </Button.Group>
            </Segment>
            {selectedRestaurantId === -1 ? <div />
              : (
                <>
                  <Header floated="left">Minimum Order cost</Header>
                  <Header floated="right">
                    {' '}
                    $
                    {listOfRestaurants[0].price_threshold}
                  </Header>
                </>
              )}

            <Message info icon>

              {selectedRestaurantId === -1
                ? (

                  <>
                    <Icon name="help circle" />
                    {' '}
                    <Message.Header>
                      Select a Restaurant
                    </Message.Header>

                  </>

                )
                : (
                  <Button color="red" onClick={this.resetCurrentOrder}>
                    {' '}
                    <Icon name="cancel" />
                    Change restaurant
                  </Button>
                )}

              {' '}
            </Message>
            <Divider />
            <Segment>
              <Search
                fluid
                input={{ icon: 'search', iconPosition: 'left' }}
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
                results={results}
                value={value}

              />
              <Divider />
              <List divided relaxed style={{ marginLeft: '8rem', marginRight: '8rem' }}>
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
