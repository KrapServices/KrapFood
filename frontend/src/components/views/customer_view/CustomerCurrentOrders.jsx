import React, { Component } from 'react';
import {
  List, Item, Card, Button, Modal, Header, Icon, Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import customerOrderContext from './customerOrderContext';

class CustomerCurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /* order_id: 28
total_cost: "5123.00"
status: "preparing"
delivery_location: "test location"
customer_id: 1
rating: null */

  render() {
    const {
      orders, preparingOrders, deliveringOrders, completedOrders,
    } = this.context;
    console.log(preparingOrders);
    return (
      <>
        <Header as="h2">Current Orders being Prepared</Header>
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
            {preparingOrders.map((order) => (
              <Table.Row  warning key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>{order.total_cost}</Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br />
        <Header as="h2">Current Orders being Delivered</Header>
        <Table padded >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Id</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery Location</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {deliveringOrders.map((order) => (
              <Table.Row key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>{order.total_cost}</Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br />
        <Header as="h2">Completed Orders</Header>
        <Table padded >
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

CustomerCurrentOrders.contextType = customerOrderContext;
CustomerCurrentOrders.propTypes = {

};

export default CustomerCurrentOrders;
