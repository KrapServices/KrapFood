import React, { Component } from 'react';
import {
  Header, Table, Dropdown, Loader,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      currentLocation: '',
      orderCounts: [],
      isLoadingStats: true,
    };

    this.loadLocations = async () => {
      try {
        const result = await Axios.get(
          `${config.localhost}summary/locations`,
        );
        this.setState({
          locations: result.data,
        });
      } catch (error) {
        console.log('Unable to load locations');
      }
    };

    this.handleChange = async (e, { value }) => {
      try {
        console.log(value);
        // encode value
        const encodedLocation = value.replace(/ /g, '%20');
        const result = await Axios.get(
          `${config.localhost}summary/orders/?area=${encodedLocation}`,
        );
        if (result.status === 200) {
          this.setState({
            orderCounts: result.data,
            currentLocation: value,
            isLoadingStats: false,
          });
        }
        console.log(this.state);
      } catch (error) {
        console.log('Unable to get total orders');
      }
    };
  }


  componentDidMount() {
    this.loadLocations();
  }

  render() {
    const {
      locations, currentLocation, isLoadingStats, orderCounts,
    } = this.state;
    return (
      <>
        <Header size="medium" as="h1">
          Orders Summary
        </Header>
        <Dropdown
          placeholder="Select location"
          fluid
          selection
          options={locations.map((location, index) => ({
            key: index,
            text: location.deliveryLocation,
            value: location.deliveryLocation,
          }))}
          onChange={this.handleChange}
        />
        <br />
        <br />
        {isLoadingStats ? <Loader /> : (
          <div>
            <Header
              size="medium"
              as="h1"
              style={
              {
                textAlign: 'left',
              }
            }
            >
              Order count at
              {' '}
              {' '}
              {currentLocation}
            </Header>
            <Table>
              <Table.Header>
                <Table.HeaderCell>Hour</Table.HeaderCell>
                <Table.HeaderCell>Order Count</Table.HeaderCell>
              </Table.Header>

              <Table.Body>
                {orderCounts.map((orderHour) => {
                  const { hour, orderCount } = orderHour;
                  return (
                    <Table.Row key={hour}>
                      <Table.Cell>{hour}</Table.Cell>
                      <Table.Cell>{orderCount}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        )}
      </>
    );
  }
}

export default OrderSummary;
