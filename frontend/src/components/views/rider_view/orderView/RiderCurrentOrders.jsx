import React, { Component } from 'react';
import {
  Header, Table, Button,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import riderOrderContext from './riderOrderContext';

class RiderCurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.changeOrderStatus = async (order) => {
      console.log(order);
      this.setState({isLoading:true});
      const result = await Axios.patch(`${config.localhost}orders/${order.order_id}` , {
        status: 'completed'
      });
      if (result.status === 200) {
        const { loadOrders } = this.props;
        await loadOrders();
        this.setState({
          isLoading: false
        });
        // console.table(this.state);
      } else {
        alert('cannot load orders');
      }
    };
  }

  render() {
    const {
      deliveringOrders, completedOrders,
    } = this.context;
    return (
      <>
        <Header as="h2">Current Orders Assigned to you</Header>
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Id</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery Location</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
              <Table.HeaderCell width={2}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {deliveringOrders.map((order) => (
              <Table.Row key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>{order.total_cost}</Table.Cell>
                <Table.Cell ><Button color='green' onClick={()=> this.changeOrderStatus(order)}>Ready to deliver</Button></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br />
        <Header as="h2">Completed Orders</Header>
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Id</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery Location</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {completedOrders.map((order) => (
              <Table.Row postiive key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>{order.total_cost}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

      </>
    );
  }
}

RiderCurrentOrders.contextType = riderOrderContext;

export default RiderCurrentOrders;
