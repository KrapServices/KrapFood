import React, { Component } from 'react';
import { Button, Table, Header, Item, Icon, Modal, Image, Form } from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';

class StaffUpdateFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
          category:'',
          food_name: '',
          daily_limit:'',
          availability: '',
          price:'',
          restaurant_id:'',
          food_id: '',
          menu: [],
          open_modal: false,
        };
    

      this.loadMenu =  async () => {
        const restaurant_id = this.context.user.restaurant_id;
        this.state.restaurant_id = restaurant_id;
        try {
            const result = await Axios.get(
                `${config.localhost}food/menu/${restaurant_id}`
            )
            console.log(result);
            if (result.status === 200) {
                this.setState({ menu: result.data});
            } else {
                alert('unable to load menu');
            }
        } catch (error) {
            console.log("Error has occured");
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
        console.log(this.state.food_id);
    };

      this.updateItem = async (food_id) => {
        this.state.food_id = food_id;
        console.log(this.state);
        try {
          const result = await Axios.post(
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
        console.log(food);
        this.state.food_id = food.food_id;
        this.state.category = food.category;
        this.state.daily_limit = food.daily_limit;
        this.state.availability = food.availability;
        this.state.price = food.price;
        this.state.food_name = food.food_name;
        this.state.open_modal = true;
      }

    }

    /* executed once components are mounted */
    componentDidMount() {
      this.loadMenu();
    }

    render() {
      const menu = this.state.menu;
        return ( 
        <Table>
          <Header as="h1">Menu Items</Header>
          <Item.Group divided style={{ textAlign: 'left'}}>
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
          <Modal trigger = {<Button primary onClick = {() => this.updateState(food)}>Update Item</Button>}>
                  <Modal.Header>Update Item Details</Modal.Header>
                    <Modal.Content image>
                      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      <Modal.Description>
                      <Form>
                    <Form.Field>
                        <label>Food Name</label>
                        <input 
                            fluid
                            placeholder='Food Name'
                            name = "food_name"
                            value = {this.state.food_name}
                            onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Daily Quantity</label>
                        <input 
                            fluid
                            placeholder='Daily Quantity'
                            name = "daily_limit" 
                            value = {this.state.daily_limit}
                            onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input 
                            fluid
                            placeholder='Price' 
                            name = "price"
                            value = {this.state.price}
                            onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <input 
                            fluid
                            placeholder='Category' 
                            name = "category"
                            value = {this.state.category}
                            onChange={this.handleChange} />
                    </Form.Field>
                    <Button type='submit' 
                            onClick = {() => this.updateItem(food.food_id)}>Confirm Update</Button>
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