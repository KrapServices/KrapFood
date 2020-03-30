import React, { Component } from 'react';
import { Item, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';

class MenuItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      restaurant_id: '',
    };

    this.loadMenu = async () => {
      const { restaurant_id } = this.context.user;
      this.state.restaurant_id = restaurant_id;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}`,
        );
        console.log(result);
        if (result.status === 200) {
          this.setState({ menu: result.data.restaurant.food });
        } else {
          alert('unable to load menu');
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };
  }

  /* executed once components are mounted */
  componentDidMount() {
    this.loadMenu();
  }

  render() {
    const { menu } = this.state;
    console.log(menu);
    return (
      <Item.Group divided style={{ textAlign: 'left' }}>
        {menu.map((food) => (
          <Item key={food.food_id}>
            <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <Item.Content>
              <Item.Header as="h1">{food.food_name}</Item.Header>
              <Item.Description floated="left">
                Price:
                <b>{` ${food.price}`}</b>
                {' '}
                <br />
                Daily Limit:
                {' '}
                <b>{` ${food.daily_limit}`}</b>
                {' '}
                <br />
                Available:
                <b>{food.availability ? <Icon name="checkmark" color="green" /> : <Icon name="cancel" color="red" />}</b>
                {' '}
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}

MenuItems.contextType = userContext;
export default MenuItems;
