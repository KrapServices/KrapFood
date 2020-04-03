import React, { Component } from 'react';
import {
  Button, Table, Header, Item, Icon, Modal, Image, Form,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';

class StaffUpdateFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      foodName: '',
      dailyLimit: '',
      availability: '',
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
        console.log(result);
        if (result.status === 200) {
          this.setState({ menu: result.data });
        } else {
          alert('unable to load menu');
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };

    this.handleChange = (event) => {
      console.log(event.target);
      event.preventDefault();
      const { name, value } = event.target;
      console.log(name);
      console.log(value);
      this.setState({
        [name]: value,
      });
    };

    this.updateItem = async (restaurant_id, food_name) => {
      console.log(this.state);
      try {
        await Axios.patch(
          `${config.localhost}food/update`,
          this.state,
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
        this.loadMenu();
        alert('item updated!');
      } catch (error) {
        console.log(error);
        alert('Unable to update item');
      }
    };

    this.updateState = (food) => {
      const { category, dailyLimit, availability, price, foodName } = food;
      this.setState({
        category, dailyLimit, availability, price, foodName
      });
    };
  }

  /* executed once components are mounted */
  componentDidMount() {
    this.loadMenu();
  }

  render() {
    const { menu, foodName, dailyLimit, price, category } = this.state;
    return (
      <Table>
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
                  <div>
                    <Modal trigger={<Button primary onClick={() => this.updateState(food)}>Update Item</Button>}>
                      <Modal.Header>Update Item Details</Modal.Header>
                      <Modal.Content image>
                        <Image wrapped size="medium" src="https://react.semantic-ui.com/images/wireframe/image.png" />
                        <Modal.Description>
                          <Form>
                            <Form.Field>
                              <Header>Food Name</Header>
                              <input
                                fluid
                                placeholder="Food Name"
                                name="food_name"
                                value={foodName}
                                onChange={this.handleChange}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Header>Daily Quantity</Header>
                              <input
                                fluid
                                placeholder="Daily Quantity"
                                name="dailyLimit"
                                value={dailyLimit}
                                onChange={this.handleChange}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Header>Price</Header>
                              <input
                                fluid
                                placeholder="Price"
                                name="price"
                                value={price}
                                onChange={this.handleChange}
                              />
                            </Form.Field>
                            <Form.Field>
                              <Header>Category</Header>
                              <input
                                fluid
                                placeholder="Category"
                                name="category"
                                value={category}
                                onChange={this.handleChange}
                              />
                            </Form.Field>
                            <Button
                              type="submit"
                              onClick={() => this.updateItem(food.restaurantId, food.foodName)}
                            >
                              Confirm Update
                            </Button>
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </div>
                  {' '}
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Table>
    );
  }
}

StaffUpdateFood.contextType = userContext;
export default StaffUpdateFood;
