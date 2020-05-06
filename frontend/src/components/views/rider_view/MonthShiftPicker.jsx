import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Icon, Table, Input, Button, Header, Message, List,
} from 'semantic-ui-react';
import userContext from '../../../userContext';
import config from '../../../config.json';

function getDateAfterDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function getMonthDates(date) {
  return [0, 1, 2, 3].map((week) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 7 * week);
    return newDate;
  });
}

function displayMonthDates(dates) {
  return (
    <List>
      {dates.map((date) => (
        <List.Item key={date}>{date}</List.Item>
      ))}
    </List>
  );
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

export default class MonthShiftPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      dateString: '',
      shifts: [],
      error: false,
    };
  }

  addShift(date, startTime, endTime) {
    const dates = getMonthDates(date);
    const newShifts = dates.map((d) => ({
      date: d,
      startTime,
      endTime,
    }));
    const { shifts } = this.state;
    this.setState({
      shifts: shifts.concat(newShifts),
    });
  }

  removeShift(date, startTime, endTime) {
    const dates = getMonthDates(date);
    const { shifts } = this.state;
    this.setState({
      shifts: shifts.filter((shift) => !dates.find((d) => d.toString() === shift.date.toString())
          || shift.startTime !== startTime || shift.endTime !== endTime),
    });
  }

  async handleSubmit() {
    const { user } = this.context;
    const { rider_id: riderId } = user;
    const { shifts, dateString } = this.state;
    try {
      await axios.post(`${config.localhost}riders/${riderId}/monthly-schedules`, {
        startDate: new Date(dateString),
        endDate: getDateAfterDays(new Date(dateString), 27),
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
          Register a work month
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
                'The work month must not overlap with any existing work months.',
                'The work week must consist of five consecutive work days.',
                'Each work day must follow one of the following four shifts.',
                'Shift 1: 10am to 2pm and 3pm to 7pm.',
                'Shift 2: 11am to 3pm and 4pm to 8pm.',
                'Shift 3: 12pm to 4pm and 5pm to 9pm.',
                'Shift 4: 1pm to 5pm and 6pm to 10pm.',
              ]}
            />
          )
          : null}

        <Table id="picker">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((colNumber) => {
                const startTime = `${10 + colNumber}00`;
                const endTime = `${11 + colNumber}00`;
                return (
                  <Table.HeaderCell>{`${startTime} - ${endTime}`}</Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {[0, 1, 2, 3, 4, 5, 6].map((rowNumber) => {
              const date = getDateAfterDays(new Date(dateString), rowNumber);
              return (
                <Row
                  key={rowNumber}
                  dateString={dateString ? displayMonthDates(getMonthDates(date).map((d) => d.toDateString())) : ''}
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

MonthShiftPicker.contextType = userContext;
