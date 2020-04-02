import React, { Component } from 'react';
import Axios from 'axios';
import config from '../../../../config.json';
import StaffCurrentOrders from './StaffCurrentOrders'
import staffOrderContext from './staffOrderContext';
import { Grid, Header, Divider } from 'semantic-ui-react';

class StaffOrderView extends Component {
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
          const { restaurant_id } = user;
  
          const result = await Axios.get(`${config.localhost}orders/restaurantId/${restaurant_id}`);
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
        const value = {
          orders, preparingOrders, deliveringOrders, completedOrders,
        };
    
        return (
          <div>
            <staffOrderContext.Provider value={value}>
              <StaffCurrentOrders loadOrders={this.loadOrders} />
            </staffOrderContext.Provider>
          </div>
        );
      }
}

export default StaffOrderView;
