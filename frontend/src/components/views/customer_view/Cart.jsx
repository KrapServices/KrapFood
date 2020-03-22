import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';
import customerCartContext from './customerCartContext';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { shoppingCart, removeFromCart } = this.context;
    return (
      <List>
        {
          shoppingCart.map((food, index) => (
            <List.Item key={index}>
              <List.Header>
                {' '}
                {food.food_name}
              </List.Header>
              <List.Content floated="right">
                <Button color='red' onClick={() => removeFromCart(index)}>remove</Button>
              </List.Content>
            </List.Item>
          ))
        }
      </List>

    );
  }
}

Cart.contextType = customerCartContext;
export default Cart;
