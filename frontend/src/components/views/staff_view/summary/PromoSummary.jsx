import React, { Component } from 'react';
import {
  Header, Table, Loader,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../../config.json';
import userContext from '../../../../userContext';

function formatTime(date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const hourString = (hour < 10) ? `0${hour}` : `${hour}`;
  const minuteString = (minutes < 10) ? `0${minutes}` : `${minutes}`;
  return `${date.toDateString()}, ${hourString}:${minuteString}`;
}

class PromoSummary extends Component {
  constructor() {
    super();
    this.state = {
      stats: [],
      isLoadingStats: true,
    };

    this.loadStats = async () => {
      const { restaurant_id } = this.context.user;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/promostats`,
        );
        this.setState({
          stats: result.data.stats,
          isLoadingStats: false,
        });
        console.log(this.state);
      } catch (error) {
        console.log('Unable to load locations');
      }
    };
  }

  componentDidMount() {
    this.loadStats();
  }

  render() {
    const {
      isLoadingStats, stats,
    } = this.state;
    return (
      <>
        <Header size="medium" as="h1">
          Promotions Summary
        </Header>
        {isLoadingStats ? <Loader /> : (
          <div>
            <Table>
              <Table.Header>
                <Table.HeaderCell>Promotion Name</Table.HeaderCell>
                <Table.HeaderCell>Discount Amount</Table.HeaderCell>
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Average Order Amount</Table.HeaderCell>
              </Table.Header>

              <Table.Body>
                {stats.map((promo) => {
                  const {
                    promoId, discount, promoName, startTime, endTime, avgOrder,
                  } = promo;
                  return (
                    <Table.Row key={promoId}>
                      <Table.Cell>{discount}</Table.Cell>
                      <Table.Cell>{promoName}</Table.Cell>
                      <Table.Cell>{formatTime(new Date(startTime))}</Table.Cell>
                      <Table.Cell>{formatTime(new Date(endTime))}</Table.Cell>
                      <Table.Cell>{Number(avgOrder).toFixed(2)}</Table.Cell>
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

PromoSummary.contextType = userContext;
export default PromoSummary;
