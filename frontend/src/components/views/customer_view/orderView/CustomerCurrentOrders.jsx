import React, { Component } from 'react';
import {
  Header, Table, Button, Modal, Icon,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import customerOrderContext from './customerOrderContext';

class CustomerCurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.rateOrder = async (id, rating) => {
      console.log(id);
      try {
        const ratedOrder = await Axios.patch(`${config.localhost}customers/rateOrder/`,
          {
            id,
            rating,
          });
        if (ratedOrder.status === 200) {
          const { loadOrders } = this.context;
          loadOrders();
          alert('rated!');
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  render() {

    const {
      preparingOrders, deliveringOrders, completedOrders,
    } = this.context;

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
              <Table.Row warning key={order.order_id}>
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
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Id</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery Location</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {completedOrders.map((order) => (
              <Table.Row key={order.order_id}>
                <Table.Cell>{order.order_id}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.delivery_location}</Table.Cell>
                <Table.Cell>{order.total_cost}</Table.Cell>
                <Table.Cell>{order.rating}</Table.Cell>
                <Table.Cell>
                  {' '}
                  <Modal trigger={<Button color="green">Rate Order</Button>} basic size="small">
                    <Header content="Rate this order!" />
                    <Modal.Content>
                      <p>
                        How was your experience ?
                      </p>
                    </Modal.Content>
                    <Modal.Actions>
                      {
                        [1, 2, 3, 4, 5].map((num) => <Button key={num} onClick={() => this.rateOrder(order.order_id, num)}>{`${num} stars  `}<Icon color='yellow' name='star'></Icon></Button>)
                      }
                    </Modal.Actions>
                  </Modal>
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
