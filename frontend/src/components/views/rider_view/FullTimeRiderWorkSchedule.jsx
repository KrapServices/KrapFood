import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';

function Cell(props) {
  const { ticked } = props;

  return (
    <>
      {ticked ? (
        <Table.Cell textAlign="center">
          <Icon color="green" name="checkmark" size="large" />
        </Table.Cell>
      ) : <Table.Cell />}
    </>
  );
}

Cell.propTypes = {
  ticked: PropTypes.bool.isRequired,
};

export default class FullTimeRider extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div
        style={{
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <Table>
          <Table.Header>
            <Table.HeaderCell />
            <Table.HeaderCell>Monday</Table.HeaderCell>
            <Table.HeaderCell>Tuesday</Table.HeaderCell>
            <Table.HeaderCell>Wednesday</Table.HeaderCell>
            <Table.HeaderCell>Thursday</Table.HeaderCell>
            <Table.HeaderCell>Friday</Table.HeaderCell>
            <Table.HeaderCell>Saturday</Table.HeaderCell>
            <Table.HeaderCell>Sunday</Table.HeaderCell>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1000 - 1100</Table.Cell>
              <Cell ticked />
              <Cell ticked />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1100 - 1200</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1200 - 1300</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1300 - 1400</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1400 - 1500</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1500 - 1600</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1600 - 1700</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1700 - 1800</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1800 - 1900</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>1900 - 2000</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>2000 - 2100</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
            <Table.Row>
              <Table.Cell>2100 - 2200</Table.Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
