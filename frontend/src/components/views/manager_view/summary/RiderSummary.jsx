import React, { Component } from 'react';
import Axios from 'axios';
import {
  Grid, Dropdown, Loader, Table, Header,
} from 'semantic-ui-react';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

const monthString = [];
monthString[0] = 'January';
monthString[1] = 'February';
monthString[2] = 'March';
monthString[3] = 'April';
monthString[4] = 'May';
monthString[5] = 'June';
monthString[6] = 'July';
monthString[7] = 'August';
monthString[8] = 'September';
monthString[9] = 'October';
monthString[10] = 'November';
monthString[11] = 'December';

function formatDeliveryTime(seconds) {
  const minuteString = Math.floor(seconds / 60).toString();
  return `${minuteString} minutes`;
}

class RiderSummary extends Component {
  constructor() {
    super();
    this.state = {
      months: [],
      riderStats: [],
      isLoading: true,
    };

    this.loadMonths = async () => {
      try {
        const result = await Axios.get(
          `${config.localhost}summary/months`,
        );
        console.log(result.data);
        this.setState({
          months: result.data,
          month: result.data[result.data.length - 1].month,
          year: result.data[result.data.length - 1].year,
        });
        console.log(this.state);
      } catch (error) {
        console.log('Error has occured');
      }
    };

    this.handleChange = async (e, { value }) => {
      const month = value[0];
      const year = value[1];
      try {
        const result = await Axios.get(
          `${config.localhost}summary/riders/?month=${month}&year=${year}`,
        );
        this.setState({
          riderStats: result.data.stats,
          isLoading: false,
        });
        console.log(this.state);
      } catch (error) {
        console.log('Error has occured');
      }
    };
  }

  componentDidMount() {
    this.loadMonths();
  }

  render() {
    // destructuring
    const {
      months, month, year, riderStats, isLoading,
    } = this.state;
    return (
      <>
        <Dropdown
          placeholder="Select month"
          fluid
          selection
          options={months.map((month) => ({
            key: [month.month, month.year],
            text: `${monthString[month.month - 1]} ${month.year}`,
            value: [month.month, month.year],
          }))}
          onChange={this.handleChange}
        />
        <br />
        <br />
        {isLoading ? <Loader /> : (
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
              Rider Statistics
              {' '}
              {' '}
            </Header>
            <Table>
              <Table.Header>
                <Table.HeaderCell>Rider ID</Table.HeaderCell>
                <Table.HeaderCell>Hours Worked</Table.HeaderCell>
                <Table.HeaderCell>Order Count</Table.HeaderCell>
                <Table.HeaderCell>Total Pay</Table.HeaderCell>
                <Table.HeaderCell>Delivery Duration</Table.HeaderCell>
                <Table.HeaderCell>Number of Ratings</Table.HeaderCell>
                <Table.HeaderCell>Average Rating</Table.HeaderCell>
              </Table.Header>

              <Table.Body>
                {riderStats.map((rider) => {
                  const {
                    hours, orderCount, pay, deliveryTime, noRating, avgRating, riderId,
                  } = rider;
                  return (
                    <Table.Row key={riderId}>
                      <Table.Cell>{riderId}</Table.Cell>
                      <Table.Cell>{hours}</Table.Cell>
                      <Table.Cell>{orderCount}</Table.Cell>
                      <Table.Cell>{pay}</Table.Cell>
                      <Table.Cell>{(deliveryTime === null) ? '-' : formatDeliveryTime(deliveryTime)}</Table.Cell>
                      <Table.Cell>{(noRating === null) ? '-' : noRating}</Table.Cell>
                      <Table.Cell>{(avgRating === null) ? '-' : Number(avgRating).toFixed(2)}</Table.Cell>
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

RiderSummary.contextType = userContext;
export default RiderSummary;
