/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Grid, Header, Divider,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';
import CustomerCurrentOrders from './CustomerCurrentOrders';
import customerOrderContext from './customerOrderContext';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      preparingOrders: [],
      deliveringOrders: [],
      completedOrders: [],
    };


    this.loadOrders = async () => {
      const { user } = this.props;
      const { customer_id } = user;
      const result = await Axios.get(`${config.localhost}orders/userId/${customer_id}`);
      if (result.status === 200) {
        // console.table(result.data.orders);
        const {
          orders, preparingOrders, deliveringOrders, completedOrders,
        } = result.data;
        this.setState({
          orders, preparingOrders, deliveringOrders, completedOrders,
        });
        // console.table(this.state);
      } else {
        alert('cannot load orders');
      }
    };
  }

  componentDidMount() {
    this.loadOrders();
  }


  render() {
    const {
      orders, preparingOrders, deliveringOrders, completedOrders,
    } = this.state;
    const { user } = this.context;
    const numOfOrder = user.order_count;
    const customerPoints = user.points;
    const value = {
      orders, preparingOrders, deliveringOrders, completedOrders,
    };

    return (
      <div>
        <customerOrderContext.Provider value={value}>
          <Grid columns={2}>
            <Grid.Column>
              <Header>
                Number Of Orders Placed:
                {' '}
                {numOfOrder}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header>
                Points:
                {' '}
                {customerPoints}
              </Header>
            </Grid.Column>
          </Grid>
          <Divider />
          <CustomerCurrentOrders />
        </customerOrderContext.Provider>
      </div>
    );
  }
}

CustomerOrderView.contextType = userContext;

export default CustomerOrderView;
