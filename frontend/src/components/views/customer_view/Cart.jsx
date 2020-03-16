import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import customerCartContext from './customerCartContext';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const shoppingCart = this.context;
    return (
      <List>
        {
                    shoppingCart.map((food) => (
                      <List.Item>
                        <List.Header>
                          {' '}
                          {food}
                        </List.Header>
                      </List.Item>
                    ))
                }
      </List>

    );
  }
}

Cart.contextType = customerCartContext;
export default Cart;
