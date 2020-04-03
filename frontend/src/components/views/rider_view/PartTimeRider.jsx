import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './PartTimeRider.css';
import { Header, Table, Divider } from 'semantic-ui-react';
import UserContext from '../../../userContext';
import WeeklyWorkSchedule from './WeeklyWorkSchedule';
import config from '../../../config.json';

function getEarliestDate(dates) {
  return dates.reduce((prev, curr) => (curr < prev ? curr : prev));
}

function getLatestDate(dates) {
  return dates.reduce((prev, curr) => (curr > prev ? curr : prev));
}

function fixDateRange(dateRange) {
  return [getEarliestDate(dateRange), getLatestDate(dateRange)];
}

export default class PartTimeRider extends Component {
  constructor() {
    super();
    this.state = {
      dateRange: [new Date(Date.now()), new Date(Date.now())],
      shifts: [],
      dateBuffer: [],
      waitingForFirstClick: false,
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
      dateRange, shifts, waitingForFirstClick, dateBuffer,
    } = this.state;

    return (
      <>
        <div
          style={{
            marginLeft: '20%',
            marginRight: '20%',
          }}
        >
          <Header as="h2">View your existing work shifts</Header>
          <Calendar
            className="calendar"
            onClickDay={(value) => {
              if (waitingForFirstClick) {
                this.setState({
                  waitingForFirstClick: false,
                  dateBuffer: [value],
                });
              } else {
                this.setState({
                  waitingForFirstClick: true,
                  dateRange: fixDateRange(dateBuffer.concat([value])),
                  dateBuffer: [],
                });
              }
            }}
            value={dateRange}
          />

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Shift</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {shifts
                .filter((shift) => shift.date.getDate() === date.getDate())
                .map((shift, index) => {
                  const { startHour, endHour } = shift;
                  return (
                    <Table.Row key={startHour}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{startHour}</Table.Cell>
                      <Table.Cell>{endHour}</Table.Cell>
                    </Table.Row>
                  );
                })} */}
            </Table.Body>
          </Table>
        </div>

        <Divider />

        <div
          style={{
            marginLeft: '20%',
            marginRight: '20%',
          }}
        >
          <WeeklyWorkSchedule />
        </div>
      </>
    );
  }
}

PartTimeRider.contextType = UserContext;
