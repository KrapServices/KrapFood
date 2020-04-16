import React, { Component } from 'react';
import axios from 'axios';
import {
  Table, Divider, Header,
} from 'semantic-ui-react';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

class RiderViewer extends Component {
  constructor() {
    super();
    this.state = {
      riders: [],
    };
  }

  async componentDidMount() {
    const { user } = this.context;
    const { riders } = (await axios.get(`${config.localhost}managers/${user.manager_id}/riders`)).data;
    this.setState({
      riders,
    });
  }

  handleChange(event, { name, value }) {
    this.setState({
      [name]: value,
    });
  }


  render() {
    const {
      riders,
    } = this.state;

    return (
      <>
        <div style={{
          paddingLeft: '10vw',
          paddingRight: '10vw',
        }}
        >
          <Header size="huge">My riders</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Rider ID</Table.HeaderCell>
                <Table.HeaderCell>Part-time/Full-time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {riders.map((rider) => {
                const { id, status } = rider;
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      {id}
                    </Table.Cell>
                    <Table.Cell>{status === 'part-time' ? 'Part-time' : 'Full-time'}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>

        <Divider />
      </>
    );
  }
}

RiderViewer.contextType = userContext;
export default RiderViewer;
