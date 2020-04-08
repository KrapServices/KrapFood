/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Grid, Header, Divider,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import userContext from '../../../../userContext';
import riderOrderContext from './riderOrderContext';
import RiderCurrentOrders from './RiderCurrentOrders';


class RiderOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      deliveringOrders: [],
      completedOrders: [],
    };


    this.loadOrders = async () => {
      const { user } = this.context;
      const { rider_id } = user;
      const result = await Axios.get(`${config.localhost}orders/riderId/${rider_id}`);
      if (result.status === 200) {
        console.log(result.data.orders);
        const {
          orders, deliveringOrders, completedOrders,
        } = result.data;
        this.setState({
          orders, deliveringOrders, completedOrders,
        });
        console.log(this.state);
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
      orders, deliveringOrders, completedOrders,
    } = this.state;
    const { user } = this.context;
    const value = {
      orders, deliveringOrders, completedOrders,
    };

    return (
      <div>
        <riderOrderContext.Provider value={value}>
          <RiderCurrentOrders />
        </riderOrderContext.Provider>
      </div>
    );
  }
}

RiderOrderView.contextType = userContext;
export default RiderOrderView;
