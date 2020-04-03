import React, { Component } from 'react';
import axios from 'axios';
import {
  Form, Table, Button, Divider, Message, Header,
} from 'semantic-ui-react';
import Summary from './Summary';
import userContext from '../../../userContext';
import config from '../../../config.json';

class Manager extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: '',
      confirmPassword: '',
      loading: false,
      success: false,
      error: false,
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

  async handleSubmit() {
    const { user } = this.context;
    const { newPassword } = this.state;
    this.setState({
      newPassword: '',
      confirmPassword: '',
      loading: true,
    });
    try {
      await axios.patch(`${config.localhost}managers/`, {
        manager_id: user.manager_id,
        password: newPassword,
      });
      this.setState({
        loading: false,
        success: true,
        error: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        success: false,
        error: true,
      });
    }
  }

  render() {
    const {
      newPassword, confirmPassword, loading, success, error, riders,
    } = this.state;

    return (
      <>
        <div
          style={{
            paddingLeft: '35vw',
            paddingRight: '35vw',
          }}
        >
          <Header size="huge">Update password</Header>
          <Form
            loading={loading}
            success={success}
            error={error}
            onSubmit={() => this.handleSubmit()}
          >
            <Form.Field>
              <Form.Input
                name="newPassword"
                value={newPassword}
                label="Enter New Password"
                type="password"
                placeholder="Enter password"
                required
                onChange={(event, data) => this.handleChange(event, data)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                name="confirmPassword"
                value={confirmPassword}
                label="Confirm New Password"
                type="password"
                placeholder="Enter your password again"
                required
                onChange={(event, data) => this.handleChange(event, data)}
                error={newPassword !== confirmPassword}
              />
            </Form.Field>
            <Form.Field />
            <Message
              success
              header="Update successful"
              content="Your password has been updated."
            />
            <Message
              error
              header="An error occurred"
              content="Failed to update your password."
            />
            <Button
              type="submit"
              disabled={newPassword.length === 0 || newPassword !== confirmPassword}
            >
              Submit
            </Button>
          </Form>
        </div>

        <Divider />

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

        <Summary />
      </>
    );
  }
}

Manager.contextType = userContext;
export default Manager;
