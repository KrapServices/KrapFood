/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import {
  List, Card, Button, Modal, Header, Icon, Container, Segment, Menu, Message, Tab, Item,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import customerCartContext from './customerCartContext';

class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.splitIntoCategories = (foods) => {
      const setOfCat = new Set();
      foods.map((x) => setOfCat.add(x.category));
      return Array.from(setOfCat);
    };

    this.buildPanes = (categories) => {
      const panes = [];
      categories.map((cat) => panes.push({ menuItem: `${cat}`, render: () => <Tab.Pane>{this.getFoodListing(cat)}</Tab.Pane> }));
      return panes;
    };

    this.getFoodListing = (category) => {
      const { res } = this.props;
      const { addToCart } = this.context;
      const listOfFood = res.foods.filter((food) => food.category === category);
      return (
        <>
          <Item.Group divided style={{ textAlign: 'left' }}>
            {listOfFood.map((food) => (
              <Item key={food.food_id}>
                <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <Item.Content>

                  <Item.Header as="h1">{food.food_name}</Item.Header>
                  <Item.Description floated="left">
                    Price:

                    <b>{` ${food.price}`}</b>

                    {' '}

                    <br />
                    DailyLimit:
                    {' '}

                    <b>{` ${food.daily_limit}`}</b>

                    {' '}
                  </Item.Description>
                  { food.availability
                    ? (
                      <Button primary floated="right" onClick={() => addToCart(food)}>
                        <Icon name="cart" />
                        Add to cart
                        <Icon name="right chevron" />
                      </Button>
                    ) : <p>daily limit reached</p>}
                </Item.Content>
              </Item>

            ))}
          </Item.Group>
        </>
      );
    };
  }

  render() {
    const { res, orderFromThisRestaurant } = this.props;
    const { selectedRestaurantId } = this.context;
    const categories = this.splitIntoCategories(res.foods);
    const panes = this.buildPanes(categories);


    return (
      <>
        <Header as="h2" attached="top" block>
          {`${res.restaurant_name}`}
        </Header>
        <Segment key={res.restaurant_id} attached padded="very">
          {selectedRestaurantId === res.restaurant_id
            ? (
              <Segment>
                <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
              </Segment>


            )
            : (
              <>
                <Message attached="top"> Categories</Message>
                <Menu attached>
                  {
              categories.map((cat) => (
                <Menu.Item key={cat}>{cat}</Menu.Item>


              ))

            }

                </Menu>
                <br />
                <Header as="h3" floated="left">
                  {' '}
                  Located at:
                  {' '}
                  {` ${res.restaurant_location}`}
                </Header>
                <br />
              </>
            )}

          {
            selectedRestaurantId === res.restaurant_id ? <div /> : (
              <Button floated="right" color="blue" onClick={() => orderFromThisRestaurant(res.restaurant_id)}>
                {' '}
                <Icon name="food" />
                Select restaurant
              </Button>
            )
          }
        </Segment>
      </>


    );
  }
}

RestaurantCard.contextType = customerCartContext;
RestaurantCard.propTypes = {
};

export default RestaurantCard;
