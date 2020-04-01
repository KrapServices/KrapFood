import React, { Component } from 'react';
import { List, Button, Card } from 'semantic-ui-react';
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
      <List relaxed>
        {
          shoppingCart.map((food, index) => (
            <List.Item key={index}>
              <Card fluid>
                <Card.Header as="h2" float="left">
                  {`${food.foodName}`}
                </Card.Header>

                <Card.Description>
                  Price
                  {' '}
                  <strong>
                    $
                    {`${food.price}`}
                  </strong>
                </Card.Description>
                <Card.Content>
                  <Button color="red" onClick={() => removeFromCart(index)}>remove</Button>
                </Card.Content>
              </Card>
            </List.Item>
          ))
        }
      </List>

    );
  }
}

Cart.contextType = customerCartContext;
export default Cart;
