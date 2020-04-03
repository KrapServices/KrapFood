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

export default class ShiftViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      dateRange: [new Date(Date.now()), new Date(Date.now())],
      shifts: [],
      waitingForFirstClick: true,
    };
  }

  async componentDidMount() {
    const { user } = this.context;
    const { rider_id: riderId } = user;
    try {
      const { shifts } = (await axios.get(`${config.localhost}schedules/${riderId}`)).data;
      this.setState({
        shifts: shifts.map((shift) => ({
          ...shift,
          date: new Date(shift.date),
        })),
      });
    } catch (error) {
      alert('error');
    }
  }

  render() {
    const {
      dateRange, shifts, waitingForFirstClick,
    } = this.state;

    return (
      <>
        <Header as="h2">View your existing work shifts</Header>

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
              .filter((shift) => {
                const startDate = dateRange[0].getDate();
                const endDate = dateRange[1].getDate();
                return shift.date.getDate() >= startDate && shift.date.getDate() <= endDate;
              })
              .map((shift) => {
                const { date, startHour, endHour } = shift;
                return (
                  <Table.Row key={shift}>
                    <Table.Cell>{date.toDateString()}</Table.Cell>
                    <Table.Cell>{startHour}</Table.Cell>
                    <Table.Cell>{endHour}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </>
    );
  }
}

ShiftViewer.contextType = UserContext;
