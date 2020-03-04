import React, { Component } from 'react';
import {
  List, Button,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';

class CustomerOrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRestaurants: [],
    };

    this.loadRestaurants = async () => {
      const result = await Axios.get(`${config.localhost}restaurants/`);
      if (result.status === 200) {
        console.log(result.data.restaurants);
        this.setState({ listOfRestaurants: result.data.restaurants });
      } else {
        alert('cannot load restaurant');
      }
    };
  }

  componentDidMount() {
    this.loadRestaurants();
  }


  render() {
    const { listOfRestaurants } = this.state;

    return (
      <div>
        <List large divided relaxed>
          { listOfRestaurants === [] ? <div /> : listOfRestaurants.map((res) => {
            console.log(res);
            return (
              <List.Item>
                <List.Content floated="left">
                  <List.Header as="h2">
                    { `Shop name: ${res.restaurant_name}`}
                  </List.Header>
                  {`Located at ${res.restaurant_location}`}
                </List.Content>
                <List.Content floated="right">
                  <Button primary> order</Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  }
}

CustomerOrderFood.contextType = userContext;

export default CustomerOrderFood;
