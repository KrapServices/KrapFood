import React, { Component } from 'react';
import {
  Button, Form, Grid, Header, Item, Icon,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import userContext from '../../../../userContext';


class StaffAddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      foodName: '',
      dailyLimit: 10000000,
      availability: true,
      price: '',
      restaurantId: '',
      menu: [],
    };

    this.loadMenu = async () => {
      const { restaurant_id } = this.context.user;
      this.state.restaurantId = restaurant_id;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/food`,
        );
        if (result.status === 200) {
          this.setState({ menu: result.data });
        } else {
          alert('unable to load menu');
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };

    this.createItem = async () => {
      const { user } = this.context;
      try {
        const { restaurant_id } = user;
        this.state.restaurantId = restaurant_id;
        console.log(this.state);
        const result = await Axios.post(
          `${config.localhost}food/create`,
          this.state,
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
        this.clearForm();
        alert('item created!');
        this.loadMenu();
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.clearForm = () => {
      this.setState({
        category: '',
        foodName: '',
        dailyLimit: 10000000,
        availability: true,
        price: '',
        restaurantId: '',
      });
    };

    this.handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };
  }

  /* executed once components are mounted */
  componentDidMount() {
    this.loadMenu();
  }

  render() {
    const { menu, price, foodName, dailyLimit, category } = this.state;
    return (
      <Grid columns={2} stackable>
        <Grid.Column>
          <Form>
            <Form.Field>
              <Header>Food Name</Header>
              <input
                fluid
                placeholder="Food Name"
                name="foodName"
                value={foodName}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Daily Quantity</Header>
              <input
                placeholder="Daily Quantity"
                name="dailyLimit"
                value={dailyLimit}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Price</Header>
              <input
                placeholder="Price"
                name="price"
                value={price}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Category</Header>
              <input
                placeholder="Category"
                name="category"
                value={category}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button
              type="submit"
              onClick={this.createItem}
            >
              Submit
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Header as="h1">Menu Items</Header>
          <Item.Group divided style={{ textAlign: 'left' }}>
          {menu.map((food) => (
            <Item key={{
                restaurantId: food.restaurantId,
                foodName: food.foodName
              }}>
              <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Item.Content>
                <Item.Header as="h1">{food.foodName}</Item.Header>
                <Item.Description floated="left">
                  Price:
                  <b>{` ${food.price}`}</b>
                  {' '}
                  <br />
                  Daily Limit:
                  {' '}
                  <b>{` ${food.dailyLimit}`}</b>
                  {' '}
                  <br />
                  Category:
                  {' '}
                  <b>{` ${food.category}`}</b>
                  {' '}
                  <br />
                  Available:
                  <b>{food.availability ? <Icon name="checkmark" color="green" /> : <Icon name="cancel" color="red" />}</b>
                  {' '}
                  <br />
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

StaffAddFood.contextType = userContext;
export default StaffAddFood;
