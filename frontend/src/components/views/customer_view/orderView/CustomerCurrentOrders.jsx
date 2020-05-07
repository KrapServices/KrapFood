import React, { Component } from 'react';
import {
  Header, Table,
} from 'semantic-ui-react';
import customerOrderContext from './customerOrderContext';
import RatingModal from './RatingModal';
import CompletedOrderModal from './CompletedOrderModal';

class CustomerCurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      preparingOrders, deliveringOrders, completedOrders,
    } = this.context;

    return (
      <>
        <Header as="h2">Current Orders being prepared</Header>
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery Location</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {preparingOrders.map((order) => (
              <Table.Row warning key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>
                  $
                  {order.total_cost}
                </Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br />
        <Header as="h2">Current Orders being delivered</Header>
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
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
                <Table.Cell>
                  $
                  {order.total_cost}
                </Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <br />
        <Header as="h2">Completed Orders</Header>
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery Location</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell width={2} />
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {completedOrders.map((order) => (
              <Table.Row key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>
                  $
                  {order.total_cost}
                </Table.Cell>
                <Table.Cell>{order.rating}</Table.Cell>
                <Table.Cell>
                  {' '}
                  <RatingModal order={order} />
                </Table.Cell>
                <Table.Cell>
                  <CompletedOrderModal order={order} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

      </>
    );
  }
}

CustomerCurrentOrders.contextType = customerOrderContext;

export default CustomerCurrentOrders;
