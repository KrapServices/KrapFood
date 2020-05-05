import React from 'react';
import axios from 'axios';
import {
  Header, Input, Statistic, Button,
} from 'semantic-ui-react';
import config from '../../../config.json';
import userContext from '../../../userContext';

class RiderSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      endDate: '',
      riderStats: [],
    };
  }

  async handleSubmit() {
    const {rider_id} = this.context.user;
    const { startDate, endDate } = this.state;

    const stringStartDate = new Date(startDate).toString();
    const stringEndDate = new Date(endDate).toString();

    const url = `${config.localhost}rider/${rider_id}/ridersummary?startDate=${stringStartDate}&endDate=${stringEndDate}`;

    const { summary } = (await axios.get(url)).data;
    console.log(this.state);

    this.setState({
      riderStats: summary.stats,

    });
  }

  render() {
    const {
      startDate, endDate, riderStats,
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
            <Statistic.Value>{riderStats[2]}</Statistic.Value>
            <Statistic.Label>Total Work Hours</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{riderStats[0]}</Statistic.Value>
            <Statistic.Label>Total Orders</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{riderStats[1]}</Statistic.Value>
            <Statistic.Label>Total Pay</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </>
    );
  }
}

RiderSummary.contextType = userContext;
export default RiderSummary;
