/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Grid, Header, Divider,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import userContext from '../../../../userContext';
import CustomerCurrentOrders from './CustomerCurrentOrders';
import customerOrderContext from './customerOrderContext';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderCount: 0,
      points: 0,
      orders: [],
      preparingOrders: [],
      deliveringOrders: [],
      completedOrders: [],
    };


    this.loadOrders = async () => {
      const { user } = this.props;
      const { customerId } = user;
      const updateCx = await Axios.get(`${config.localhost}customers/${customerId}`);
      const result = await Axios.get(`${config.localhost}orders/userId/${customerId}`);
      if (result.status === 200) {
        // console.table(result.data.orders);
        const {
          orders, preparingOrders, deliveringOrders, completedOrders,
        } = result.data;
        this.setState({
          orders,
          preparingOrders,
          deliveringOrders,
          completedOrders,
          points: updateCx.data.customer.points,
          orderCount: updateCx.data.customer.order_count,
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
      orders, preparingOrders, deliveringOrders, completedOrders, orderCount, points,
    } = this.state;
    const { user } = this.context;
    const value = {
      orders, preparingOrders, deliveringOrders, completedOrders, loadOrders: this.loadOrders, user,
    };

    return (
      <div>
        <customerOrderContext.Provider value={value}>
          <Grid columns={2}>
            <Grid.Column>
              <Header>
                Number Of Orders Placed:
                {' '}
                {orderCount}
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header>
                Points:
                {' '}
                {points}
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
