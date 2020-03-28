/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Table, Input, Button,
} from 'semantic-ui-react';

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
  hour: PropTypes.string.isRequired,
  addShift: PropTypes.func.isRequired,
};

function Row(props) {
  const { day, addShift } = props;

  return (
    <Table.Row>
      <Table.Cell>{day}</Table.Cell>
      <Cell
        hour="1000"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1100"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1200"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1300"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1400"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1500"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1600"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1700"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1800"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="1900"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="2000"
        addShift={(hour) => {
          addShift(day, hour);
        }}
      />
      <Cell
        hour="2100"
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

  handleSubmit() {
    const { shifts, date } = this.state;
    const shiftsWithDate = shifts.map((shift) => ({
      ...shift,
      date,
    }));
    console.log(shiftsWithDate);
  }

  render() {
    const { date } = this.state;

    return (
      <>
        <Input
          type="date"
          label="Starting date"
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
