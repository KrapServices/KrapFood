import React from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ShiftViewer.css';
import {
  Header, Table, Message,
} from 'semantic-ui-react';
import UserContext from '../../../userContext';
import config from '../../../config.json';

function getEarliestDate(dates) {
  return dates.reduce((prev, curr) => (curr < prev ? curr : prev));
}

function getLatestDate(dates) {
  return dates.reduce((prev, curr) => (curr > prev ? curr : prev));
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

export default class MonthShiftViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      dateRange: getDateRange([new Date(Date.now())]),
      shifts: [],
      waitingForFirstClick: true,
      error: false,
    };
  }

  async componentDidMount() {
    const { user } = this.context;
    const { rider_id: riderId } = user;
    try {
      const { shifts } = (await axios.get(`${config.localhost}riders/${riderId}/monthly-schedules`)).data;

      const combinedShifts = combine(shifts);

      this.setState({
        shifts: combinedShifts.map((shift) => ({
          ...shift,
          date: new Date(shift.date),
        })),
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const {
      dateRange, shifts, waitingForFirstClick, error,
    } = this.state;

    return (
      <>
        <Header as="h2">View your existing work shifts</Header>

        {error ? <Message error>Error occurred while retrieving schedules</Message> : null}

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
                dateRange: getDateRange([value]),
              });
            } else {
              this.setState({
                waitingForFirstClick: true,
                dateRange: getDateRange(dateRange.concat([value])),
              });
            }
          }}
          value={dateRange}
        />

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start</Table.HeaderCell>
              <Table.HeaderCell>End</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {shifts
              .filter((shift) => shift.date >= dateRange[0] && shift.date <= dateRange[1])
              .map((shift) => {
                const { date, startTime, endTime } = shift;
                return (
                  <Table.Row key={date + startTime + endTime}>
                    <Table.Cell>{date.toDateString()}</Table.Cell>
                    <Table.Cell>{startTime}</Table.Cell>
                    <Table.Cell>{endTime}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </>
    );
  }
}

MonthShiftViewer.contextType = UserContext;
