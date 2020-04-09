import React, { Component } from 'react';
import Calendar from 'react-calendar';
import {
  Dropdown, Grid, Button, Form, Header, Message,
} from 'semantic-ui-react';
import Axios from 'axios';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

function getEarliestDate(dates) {
  return dates.reduce((prev, curr) => (curr < prev ? new Date(+curr) : new Date(+prev)));
}

function getLatestDate(dates) {
  return dates.reduce((prev, curr) => (curr > prev ? new Date(+curr) : new Date(+prev)));
}

function getDateRange(dates) {
  return [getEarliestDate(dates), getLatestDate(dates)];
}

function combine(shifts) {
  const intervals = [];
  let currentInterval;

  shifts.forEach((shift) => {
    const { date, startTime, endTime } = shift;
    if (currentInterval === undefined) {
      currentInterval = {
        date,
        startTime,
        endTime,
      };
    } else if (currentInterval.date === date && startTime === currentInterval.endTime) {
      currentInterval = {
        ...currentInterval,
        endTime,
      };
    } else {
      intervals.push(currentInterval);
      currentInterval = {
        date,
        startTime,
        endTime,
      };
    }
  });

  return intervals;
}

function generateValues(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push({
      key: i,
      text: `${i}:00`,
      value: i,
    });
  }
  return arr;
}

const timeOptions = generateValues(10, 22);


class PromotionDurationSegment extends Component {
  constructor() {
    super();
    this.state = {
      dateRange: getDateRange([new Date(Date.now())]),
      waitingForFirstClick: true,
      error: false,
      startTime: '',
      endTime: '',
      promoName: '',
      discount: '',
      restaurantId: '',
    };

    this.handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    this.handleStartTimeChange = (event, { value }) => {
      const { dateRange } = this.state;
      dateRange[0].setHours(value);

      this.setState({ startTime: value, dateRange });
    };

    this.handleEndTimeChange = (event, { value }) => {
      const { dateRange } = this.state;
      dateRange[1].setHours(value);
      this.setState({ endTime: value, dateRange });

    };

    this.clearForm = () => {
      this.setState({
        date: new Date(Date.now()),
        dateRange: [new Date(Date.now()), new Date(Date.now())],
        dateBuffer: [],
        waitingForFirstClick: true,
        startTime: '',
        endTime: '',
        promoName: '',
        discount: '',
        restaurantId: '',
      });
    };

    this.handleSubmit = async () => {
      const { restaurant_id } = this.context.user;
      this.state.restaurantId = restaurant_id;
      const {
        startTime, endTime, restaurantId, dateRange, promoName, discount,
      } = this.state;
      // dateRange[0].setHours(startTime);
      // dateRange[1].setHours(endTime);
      console.table(this.state);
      try {
        await Axios.post(`${config.localhost}restaurants/create`, {
          restaurantId,
          dateRange,
          promoName,
          discount,
        });
        alert('promotion created!');
        this.clearForm();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };
  }


  render() {
    const {
      dateRange, waitingForFirstClick, dateBuffer, startTime, endTime, promoName, discount,
    } = this.state;
    console.log('state');
    console.log(this.state);
    return (
      <>
        <Header size="huge">Create a promotion</Header>
        <br />
        <Form>
          <Form.Field>
            <Header>Enter Date</Header>
            <Message
              size="large"
              info
              compact
            >
              {waitingForFirstClick ? 'Select start of range' : 'Select end of range'}
            </Message>

            <Calendar
              className="calendar"
              onClickDay={(value) => {
                if (waitingForFirstClick) {
                  this.setState({
                    waitingForFirstClick: false,
                    dateRange: getDateRange([new Date(+value)]),
                  });
                } else {
                  this.setState({
                    waitingForFirstClick: true,
                    dateRange: getDateRange(dateRange.concat([new Date(+value)])),
                  });
                }
              }}
              value={dateRange}
            />

          </Form.Field>
          <br />
          <Form.Field>
            <Header>
              Enter Time Period
            </Header>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Dropdown
                    placeholder="Select Start Time"
                    fluid
                    selection
                    options={timeOptions}
                    name="startTime"
                    value={startTime}
                    onChange={this.handleStartTimeChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <p>to</p>
                </Grid.Column>
                <Grid.Column>
                  <Dropdown
                    placeholder="Select End Time"
                    fluid
                    selection
                    options={timeOptions}
                    name="endTime"
                    value={endTime}
                    onChange={this.handleEndTimeChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
          <Form.Field>
            <Header>Promotion Name</Header>
            <input
              placeholder="Promotion Name"
              name="promoName"
              value={promoName}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Header>Discount Amount</Header>
            <input
              placeholder="Discount"
              name="discount"
              value={discount}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

PromotionDurationSegment.contextType = userContext;
export default PromotionDurationSegment;
