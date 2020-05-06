import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header, Table, Button, Grid, Loader,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import riderOrderContext from './riderOrderContext';

class RiderCurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.departToRestaurant = async (order) => {
      console.log(order);
      this.setState({ isLoading: true });
      const result = await Axios.patch(`${config.localhost}orders/departToRestaurant/${order.order_id}`);
      if (result.status === 200) {
        const { loadOrders } = this.props;
        await loadOrders();
        this.setState({
          isLoading: false,
        });
        // console.table(this.state);
      } else {
        alert('cannot load orders');
      }
    };


    this.arrive = async (order) => {
      console.log(order);
      this.setState({ isLoading: true });
      const result = await Axios.patch(`${config.localhost}orders/arriveAtRestaurant/${order.order_id}`);
      if (result.status === 200) {
        const { loadOrders } = this.props;
        await loadOrders();
        this.setState({
          isLoading: false,
        });
      // console.table(this.state);
      } else {
        alert('cannot load orders');
      }
    };

    this.departFromRestaurant = async (order) => {
      console.log(order);
      this.setState({ isLoading: true });
      const result = await Axios.patch(`${config.localhost}orders/departFromRestaurant/${order.order_id}`);
      if (result.status === 200) {
        const { loadOrders } = this.props;
        await loadOrders();
        this.setState({
          isLoading: false,
        });
      // console.table(this.state);
      } else {
        alert('cannot load orders');
      }
    };


    this.changeOrderStatusCompleted = async (order) => {
      console.log(order);
      this.setState({ isLoading: true });
      const result = await Axios.patch(`${config.localhost}orders/${order.order_id}`, {
        status: 'completed',
      });
      if (result.status === 200) {
        const { loadOrders } = this.props;
        await loadOrders();
        this.setState({
          isLoading: false,
        });
        // console.table(this.state);
      } else {
        alert('cannot load orders');
      }
    };
  }

  render() {
    const {
      deliveringOrders, completedOrders, departToCollectOrders, departFromRestaurantOrders, arriveToCollectOrders,
    } = this.context;
    const { isLoading } = this.state;

    return (isLoading ? <Loader />
      : (
        <>
          <Grid columns="2">
            <Grid.Column>
              <Header as="h2">Depart to Restaurant</Header>
              <Table padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Order Id</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Delivery Location</Table.HeaderCell>
                    <Table.HeaderCell>Total Cost</Table.HeaderCell>
                    <Table.HeaderCell width={4} />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {departToCollectOrders.map((order) => (
                    <Table.Row key={order.order_id}>
                      <Table.Cell>{order.order_id}</Table.Cell>
                      <Table.Cell>{order.status}</Table.Cell>
                      <Table.Cell>{order.delivery_location}</Table.Cell>
                      <Table.Cell>{order.total_cost}</Table.Cell>
                      <Table.Cell><Button color="orange" onClick={() => this.departToRestaurant(order)}>Depart To Collect</Button></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <br />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">Arrived at Restaurant</Header>
              <Table padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Order Id</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Delivery Location</Table.HeaderCell>
                    <Table.HeaderCell>Total Cost</Table.HeaderCell>
                    <Table.HeaderCell width={4} />
                    <Table.HeaderCell width={4} />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {arriveToCollectOrders.map((order) => (
                    <Table.Row key={order.order_id}>
                      <Table.Cell>{order.order_id}</Table.Cell>
                      <Table.Cell>{order.status}</Table.Cell>
                      <Table.Cell>{order.delivery_location}</Table.Cell>
                      <Table.Cell>{order.total_cost}</Table.Cell>
                      <Table.Cell />
                      <Table.Cell><Button color="blue" onClick={() => this.arrive(order)}>I have arrived</Button></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <br />
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Header as="h2">Depart From Restaurant</Header>
              <Table padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Order Id</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Delivery Location</Table.HeaderCell>
                    <Table.HeaderCell>Total Cost</Table.HeaderCell>
                    <Table.HeaderCell width={4} />
                    <Table.HeaderCell width={4} />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {departFromRestaurantOrders.map((order) => (
                    <Table.Row key={order.order_id}>
                      <Table.Cell>{order.order_id}</Table.Cell>
                      <Table.Cell>{order.status}</Table.Cell>
                      <Table.Cell>{order.delivery_location}</Table.Cell>
                      <Table.Cell>{order.total_cost}</Table.Cell>
                      <Table.Cell />
                      <Table.Cell><Button color="blue" onClick={() => this.departFromRestaurant(order)}>Depart From Restaurant</Button></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <br />
            </Grid.Column>
          </Grid>
          <Header as="h2">Complete Delivery</Header>
          <Table padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Order Id</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Delivery Location</Table.HeaderCell>
                <Table.HeaderCell>Total Cost</Table.HeaderCell>
                <Table.HeaderCell width={2} />
                <Table.HeaderCell width={4} />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {deliveringOrders.map((order) => (
                <Table.Row key={order.order_id}>
                  <Table.Cell>{order.order_id}</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>{order.delivery_location}</Table.Cell>
                  <Table.Cell>{order.total_cost}</Table.Cell>
                  <Table.Cell />
                  <Table.Cell><Button color="green" onClick={() => this.changeOrderStatusCompleted(order)}>Complete Delivery</Button></Table.Cell>
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
      )
    );
  }
}

RiderCurrentOrders.contextType = riderOrderContext;

RiderCurrentOrders.propTypes = {
  loadOrders: PropTypes.func.isRequired,
};

export default RiderCurrentOrders;
