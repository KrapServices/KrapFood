/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import _ from 'lodash';
import {
  List, Button, Segment, Grid, Header, Search, Divider, Message, Icon, Label, Card, Modal,
} from 'semantic-ui-react';
import Axios from 'axios';
import Cart from './Cart';
import config from '../../../config.json';
import customerCartContext from './customerCartContext';
import RestaurantCard from './RestaurantCard';
import PaymentForm from './PaymentForm';

class CustomerOrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchValue: '',
      results: [],
      listOfRestaurants: [],
      shoppingCart: [],
      selectedRestaurantId: -1,
      paymentOpen: false,
      payByCash: false,
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
    this.openPayment = () => {
      this.setState({ paymentOpen: true });
    };
    this.closePayment = () => {
      this.setState({ paymentOpen: false });
    };
    this.switchPayment = () => {
      const { payByCash } = this.state;
      this.setState({ payByCash: !payByCash });
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

    this.handleResultSelect = (e, { result }) => {
      const { selectedRestaurantId, listOfRestaurants } = this.state;
      this.setState({
        selectedRestaurantId: result.restaurant_id,
        listOfRestaurants: listOfRestaurants.filter((res) => res.restaurant_id === result.restaurant_id),
      });
    };

    this.handleSearchChange = (e, { value }) => {
      const { listOfRestaurants, searchValue } = this.state;
      const initialState = { isLoading: false, results: [], searchValue: value };
      this.setState({ isLoading: true, searchValue: value });

      setTimeout(() => {
        if (searchValue.length < 1) return this.setState(initialState);

        const re = new RegExp(_.escapeRegExp(searchValue), 'i');
        const isMatch = (result) => re.test(result.restaurant_name);
        this.setState({
          isLoading: false,
          results: _.filter(listOfRestaurants, isMatch),
        });
      }, 100);
    };
    this.resultRenderer = (result) => (
      <Card>
        <Card.Content>
          <Card.Header>
            {result.restaurant_name}
          </Card.Header>
          { result.foods.map((food) => <Card.Description>{food.category}</Card.Description>)}
        </Card.Content>
      </Card>
    );
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
      searchValue, paymentOpen, payByCash,
    } = this.state;
    const value = {
      shoppingCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      selectedRestaurantId,
    };
    const price = this.calculateTotal();
    console.log(results);
    return (
      <customerCartContext.Provider value={value}>
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
                <Button content="Confirm Order" color="green" onClick={() => this.openPayment()} disabled={this.minimum()} />
              </Button.Group>
            </Segment>
            <>
              <Modal
                open={paymentOpen}
                size="large"
              >
                <Header icon="money" content="Confirm your order" />
                <Modal.Content>
                  { payByCash
                    ? (
                      <>
                        <h3>Payment will be by Cash on Delivery!</h3>
                        <br />
                        <Button color="orange" onClick={() => this.switchPayment()} inverted>
                          <Icon name="money" />
                          {' '}
                          Pay by Credit Card instead
                        </Button>
                      </>
                    )
                    : (
                      <>
                        <PaymentForm />
                        {' '}
                        <br/>
                        <Button color="orange" onClick={() => this.switchPayment()} inverted>
                          <Icon name="money" />
                          {' '}
                          Pay by Cash On Delivery
                        </Button>
                      </>
                    ) }
                </Modal.Content>
                <Modal.Actions>

                  <Button color="red" onClick={() => this.closePayment()} inverted>
                    <Icon name="cancel" />
                    {' '}
                    Back to order
                  </Button>
                  <Button color="green" onClick={() => this.createOrder()} inverted>
                    <Icon name="checkmark" />
                    {' '}
                    Create Order
                  </Button>
                </Modal.Actions>
              </Modal>
            </>

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
              { selectedRestaurantId === -1
                ? (
                  <>
                    <Search
                      fluid
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={_.debounce(this.handleSearchChange, 100, {
                        leading: true,
                      })}
                      results={results}
                      value={searchValue}
                      resultRenderer={this.resultRenderer}
                    />
                    <Divider />
                  </>
                )
                : <div />}

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
