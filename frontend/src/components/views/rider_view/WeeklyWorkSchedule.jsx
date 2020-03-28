/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Icon, Table, Input, Button,
} from 'semantic-ui-react';
import userContext from '../../../userContext';
import config from '../../../config.json';

function Cell(props) {
  const [selected, setSelected] = React.useState(false);
  const { hour, addShift } = props;

  return (
    <Table.Cell textAlign="center" selectable>
      <a
        href="#"
        onClick={() => {
          setSelected(!selected);
          addShift(hour);
        }}
      >
        {selected ? <Icon color="green" name="checkmark" size="large" /> : null}
      </a>
    </Table.Cell>
  );
}

Cell.propTypes = {
  hour: PropTypes.number.isRequired,
  addShift: PropTypes.func.isRequired,
};

function Row(props) {
  const { day, addShift } = props;

  return (
    <Table.Row>
      <Table.Cell>{day}</Table.Cell>
      <Cell
        hour={10}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={11}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={12}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={13}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={14}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={15}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={16}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={17}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={18}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={19}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={20}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour={21}
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
    </Table.Row>
  );
}

Row.propTypes = {
  day: PropTypes.number.isRequired,
  addShift: PropTypes.func.isRequired,
};

export default class WeeklyWorkSchedule extends React.Component {
  constructor() {
    super();
    this.state = {
      date: '',
      shifts: [],
    };
  }

  addShift(day, hour) {
    const { shifts } = this.state;
    this.setState({
      shifts: shifts.concat([{
        day,
        hour,
      }]),
    });
  }

  async handleSubmit() {
    const { user } = this.context;
    const { shifts, date } = this.state;
    try {
      await axios.post(`${config.localhost}schedules/`, {
        riderId: user.rider_id,
        startDate: date,
        shifts,
      });
      window.location.reload();
    } catch (error) {
      alert('Submission failed');
    }
  }

  render() {
    const { date } = this.state;

    return (
      <>
        <Input
          type="date"
          label="Starting date"
          error={date.length === 0}
          onChange={(event) => {
            this.setState({
              date: event.target.value,
            });
          }}
        />

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Day</Table.HeaderCell>
              <Table.HeaderCell>1000 - 1100</Table.HeaderCell>
              <Table.HeaderCell>1100 - 1200</Table.HeaderCell>
              <Table.HeaderCell>1200 - 1300</Table.HeaderCell>
              <Table.HeaderCell>1300 - 1400</Table.HeaderCell>
              <Table.HeaderCell>1400 - 1500</Table.HeaderCell>
              <Table.HeaderCell>1500 - 1600</Table.HeaderCell>
              <Table.HeaderCell>1600 - 1700</Table.HeaderCell>
              <Table.HeaderCell>1700 - 1800</Table.HeaderCell>
              <Table.HeaderCell>1800 - 1900</Table.HeaderCell>
              <Table.HeaderCell>1900 - 2000</Table.HeaderCell>
              <Table.HeaderCell>2000 - 2100</Table.HeaderCell>
              <Table.HeaderCell>2100 - 2200</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Row
              day={1}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
            <Row
              day={2}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
            <Row
              day={3}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
            <Row
              day={4}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
            <Row
              day={5}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
            <Row
              day={6}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
            <Row
              day={7}
              addShift={(day, hour) => this.addShift(day, hour)}
            />
          </Table.Body>
        </Table>

        <Button
          disabled={date.length === 0}
          onClick={() => this.handleSubmit()}
        >
          Submit
        </Button>
      </>
    );
  }
}

WeeklyWorkSchedule.contextType = userContext;
