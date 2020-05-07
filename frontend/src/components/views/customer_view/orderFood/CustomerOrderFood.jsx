import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  List, Button, Segment, Grid, Header, Search, Divider, Message, Icon, Card,
} from 'semantic-ui-react';
import Axios from 'axios';
import Cart from './Cart';
import config from '../../../../config.json';
import customerCartContext from './customerCartContext';
import RestaurantCard from './RestaurantCard';
import Checkout from './orderModal/Checkout';

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
    };
    // =========================================================================
    // Restaurant state
    // =========================================================================
    this.orderFromThisRestaurant = (id) => {
      const { listOfRestaurants } = this.state;
      this.setState({
        selectedRestaurantId: id,
        listOfRestaurants: listOfRestaurants.filter((restaurant) => restaurant.restaurantId === id),
      });
    };
    this.loadRestaurants = async () => {
      const result = await Axios.get(`${config.localhost}restaurants/`);
      if (result.status === 200) {
        this.setState({ listOfRestaurants: result.data.restaurants });
      } else {
        alert('cannot load restaurant');
      }
    };

    this.resetCurrentOrder = () => {
      this.loadRestaurants();
      this.clearCart();
      this.setState({ selectedRestaurantId: -1 });
    };

    // =========================================================================
    // Cart Stuff
    // =========================================================================

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
      return this.calculateTotal() <= listOfRestaurants[0].priceThreshold;
    };

    // -------------------------------------------------------------------------
    // Open checkout Modal
    // -------------------------------------------------------------------------
    this.openPayment = () => {
      this.setState({ paymentOpen: true });
    };
    this.closePayment = () => {
      this.setState({ paymentOpen: false });
    };

    // -------------------------------------------------------------------------
    // Search stuff
    // -------------------------------------------------------------------------

    this.handleResultSelect = (e, { result }) => {
      const { listOfRestaurants } = this.state;
      this.setState({
        selectedRestaurantId: result.restaurantId,
        listOfRestaurants: listOfRestaurants.filter(
          (restaurant) => restaurant.restaurantId === result.restaurantId,
        ),
      });
    };

    this.handleSearchChange = (e, { value }) => {
      const { listOfRestaurants, searchValue } = this.state;
      const initialState = { isLoading: false, results: [], searchValue: value };
      this.setState({ isLoading: true, searchValue: value });

      setTimeout(() => {
        if (searchValue.length < 1) {
          this.setState(initialState);
          return;
        }

        const re = new RegExp(_.escapeRegExp(searchValue), 'i');
        const isMatch = (result) => re.test(result.restaurantName);
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
            {result.restaurantName}
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
    const { user } = this.props;
    const {
      listOfRestaurants, shoppingCart, selectedRestaurantId, isLoading, results,
      searchValue, paymentOpen,
    } = this.state;
    const value = {
      shoppingCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      clearCart: this.clearCart,
      selectedRestaurantId,
      closePayment: this.closePayment,
    };
    const price = this.calculateTotal();
    return (
      <customerCartContext.Provider value={value}>
        <Grid stackable>
          <Grid.Column width="5">
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
                <Button icon="delete" content="Clear" onClick={() => this.clearCart()} />
                <Button.Or />
                <Button content="Confirm Order" color="green" onClick={() => this.openPayment()} disabled={this.minimum()} />
              </Button.Group>
            </Segment>

            {paymentOpen
              ? <Checkout user={user} />
              : <div />}
            {selectedRestaurantId === -1 ? <div />
              : (
                <>
                  <Header floated="left">Minimum Order cost</Header>
                  <Header floated="right">
                    {' '}
                    $
                    {listOfRestaurants[0].priceThreshold}
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
          </Grid.Column>
          <Grid.Column width="11">

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
                    <p>Search for restaurant by name</p>
                    <Divider />
                  </>
                )
                : <div />}
              <List divided relaxed style={{ marginLeft: '8rem', marginRight: '8rem' }}>
                {listOfRestaurants.map((restaurant) => (
                  <React.Fragment key={restaurant.restaurantId}>
                    <RestaurantCard
                      restaurant={restaurant}
                      orderFromThisRestaurant={this.orderFromThisRestaurant}
                    />
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
CustomerOrderFood.propTypes = {
  user: PropTypes.objectOf(Object).isRequired,
};

CustomerOrderFood.contextType = customerCartContext;
export default CustomerOrderFood;
