/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';

function Cell() {
  const [selected, setSelected] = React.useState(false);

  return (
    <Table.Cell textAlign="center" selectable>
      <a
        href="#"
        onClick={() => setSelected(!selected)}
      >
        {selected ? <Icon color="green" name="checkmark" size="large" /> : null}
      </a>
    </Table.Cell>
  );
}

function Row(props) {
  const { day } = props;

  return (
    <Table.Row>
      <Table.Cell>{day}</Table.Cell>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Table.Row>
  );
}

Row.propTypes = {
  day: PropTypes.string.isRequired,
};

export default class WeeklyWorkSchedule extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: Date.now(),
    };
  }

  render() {
    return (

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
          <Row day={1} />
          <Row day={2} />
          <Row day={3} />
          <Row day={4} />
          <Row day={5} />
          <Row day={6} />
          <Row day={7} />
        </Table.Body>
      </Table>
    );
  }
}
