import React, { Component } from 'react';
import Axios from 'axios';
import { Table, Statistic } from 'semantic-ui-react';
import userContext from '../../../userContext';
import config from '../../../config.json';

class StaffSummary extends Component {
  constructor() {
    super();
    this.state = {};

    this.loadOrders = async () => {
      const { restaurant_id } = this.context.user;
      this.state.restaurant_id = restaurant_id;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/stats/orders${restaurant_id}`,
        );
        console.log(result);
        if (result.status === 200) {
          this.setState({ menu: result.data });
        } else {
          alert('unable to load menu');
        }
        return result.data.totalOrders;
      } catch (error) {
        console.log('Error has occured');
      }
    };
  }

  render() {
    return (
      <Table>
        <Statistic>
          <Statistic.Value>400</Statistic.Value>
          <Statistic.Label>Orders</Statistic.Label>
        </Statistic>
      </Table>
    );
  }
}

StaffSummary.contextType = userContext;
export default StaffSummary;
