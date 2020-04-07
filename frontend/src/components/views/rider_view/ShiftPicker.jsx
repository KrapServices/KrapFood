import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Icon, Table, Input, Button, Header, Message,
} from 'semantic-ui-react';
import userContext from '../../../userContext';
import config from '../../../config.json';

function getDateAfterDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function Cell(props) {
  const [selected, setSelected] = React.useState(false);
  const { addShift, removeShift, disabled } = props;

  return (
    <Table.Cell textAlign="center" selectable={!disabled}>
      <a
        href="#picker"
        onClick={() => {
          if (selected) {
            removeShift();
          } else {
            addShift();
          }
          setSelected(!selected);
        }}
      >
        {selected ? <Icon color="green" name="checkmark" size="large" /> : null}
      </a>
    </Table.Cell>
  );
}

Cell.propTypes = {
  addShift: PropTypes.func.isRequired,
  removeShift: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function Row(props) {
  const {
    dateString, addShift, removeShift, disabled,
  } = props;

  return (
    <Table.Row>
      <Table.Cell singleLine>{dateString}</Table.Cell>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((colNumber) => {
        const startTime = `${10 + colNumber}0000`;
        const endTime = `${11 + colNumber}0000`;
        return (
          <Cell
            key={colNumber}
            addShift={() => addShift(startTime, endTime)}
            removeShift={() => removeShift(startTime, endTime)}
            disabled={disabled}
          />
        );
      })}
    </Table.Row>
  );
}

Row.propTypes = {
  dateString: PropTypes.string.isRequired,
  addShift: PropTypes.func.isRequired,
  removeShift: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default class ShiftPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      dateString: '',
      shifts: [],
      error: false,
    };
  }

  addShift(date, startTime, endTime) {
    const { shifts } = this.state;
    this.setState({
      shifts: shifts.concat([{
        date,
        startTime,
        endTime,
      }]),
    });
  }

  removeShift(date, startTime, endTime) {
    const { shifts } = this.state;
    this.setState({
      shifts: shifts.filter((shift) => shift.date.toString() !== date.toString()
          || shift.startTime !== startTime || shift.endTime !== endTime),
    });
  }

  async handleSubmit() {
    const { user } = this.context;
    const { rider_id: riderId } = user;
    const { shifts, dateString } = this.state;
    try {
      await axios.post(`${config.localhost}riders/${riderId}/schedules`, {
        startDate: new Date(dateString),
        endDate: getDateAfterDays(new Date(dateString), 6),
        shifts,
      });
      window.location.reload();
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { dateString, shifts, error } = this.state;

    return (
      <>
        <Header as="h1">
          Register a work week
        </Header>
        <Input
          type="date"
          label="Starting date"
          error={dateString.length === 0}
          onChange={(event) => {
            this.setState({
              dateString: event.target.value,
            });
          }}
        />

        {error
          ? (
            <Message
              error
              header="Your submission was invalid"
              list={[
                'The work week must not overlap with any existing work weeks.',
                'The minimum number of total work hours is 10.',
                'The maximum number of total work hours is 48.',
                'The maximum number of consecutive shifts allowed is 4.',
              ]}
            />
          )
          : null}

        <Table id="picker">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
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
            {[0, 1, 2, 3, 4, 5, 6].map((rowNumber) => {
              const date = getDateAfterDays(new Date(dateString), rowNumber);
              return (
                <Row
                  key={rowNumber}
                  dateString={dateString ? date.toDateString() : ''}
                  addShift={(startTime, endTime) => this.addShift(date, startTime, endTime)}
                  removeShift={(startTime, endTime) => this.removeShift(date, startTime, endTime)}
                  disabled={dateString.length === 0}
                />
              );
            })}
          </Table.Body>
        </Table>

        <Button
          disabled={dateString.length === 0 || shifts.length === 0}
          onClick={() => this.handleSubmit()}
        >
          Submit
        </Button>
      </>
    );
  }
}

ShiftPicker.contextType = userContext;
