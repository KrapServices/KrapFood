import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Header, Table, Divider } from 'semantic-ui-react';
import userContext from '../../../userContext';
import WeeklyWorkSchedule from './WeeklyWorkSchedule';
import config from '../../../config.json';

class RiderWorkSchedule extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(Date.now()),
      shifts: [],
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
    const { date, shifts } = this.state;

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
              this.setState({
                date: value,
              });
            }}
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
              {shifts
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
                })}
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

RiderWorkSchedule.contextType = userContext;
export default RiderWorkSchedule;
