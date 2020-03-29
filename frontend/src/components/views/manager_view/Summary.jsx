import React from 'react';
import axios from 'axios';
import {
  Header, Input, Statistic, Button,
} from 'semantic-ui-react';
import config from '../../../config.json';

export default class Summary extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      endDate: '',
      customerCount: 0,
      orderCount: 0,
      totalCost: 0,
    };
  }

  async handleSubmit() {
    const { startDate, endDate } = this.state;

    const primitiveStartDate = new Date(startDate).valueOf();
    const primitiveEndDate = new Date(endDate).valueOf();

    const url = `${config.localhost}summary/?startDate=${primitiveStartDate}&endDate=${primitiveEndDate}`;

    const { summary } = (await axios.get(url)).data;

    this.setState({
      customerCount: summary.customerCount,
      orderCount: summary.orderCount,
      totalCost: summary.totalCost,
    });
  }

  render() {
    const {
      startDate, endDate, customerCount, orderCount, totalCost,
    } = this.state;

    return (
      <>
        <Header as="h1">Summary Statistics</Header>

        <Input
          type="date"
          label="From"
          error={startDate.length === 0}
          onChange={(event) => {
            this.setState({
              startDate: event.target.value,
            });
          }}
        />

        <Input
          type="date"
          label="To"
          error={endDate.length === 0}
          onChange={(event) => {
            this.setState({
              endDate: event.target.value,
            });
          }}
        />

        <Button
          disabled={startDate.length === 0 || endDate.length === 0}
          onClick={() => this.handleSubmit()}
        >
          Query
        </Button>

        <Statistic.Group
          style={{
            justifyContent: 'center',
          }}
        >
          <Statistic>
            <Statistic.Value>{customerCount}</Statistic.Value>
            <Statistic.Label>New Customers</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{orderCount}</Statistic.Value>
            <Statistic.Label>Orders</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{totalCost}</Statistic.Value>
            <Statistic.Label>Total Order Value</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </>
    );
  }
}
