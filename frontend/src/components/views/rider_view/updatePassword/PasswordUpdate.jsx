import React, { Component } from 'react';
import axios from 'axios';
import {
  Form, Button, Divider, Message, Header,
} from 'semantic-ui-react';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

class PasswordUpdate extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: '',
      confirmPassword: '',
      loading: false,
      success: false,
      error: false,
    };
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
      await axios.patch(`${config.localhost}riders/`, {
        riderId: user.rider_id,
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
      newPassword, confirmPassword, loading, success, error,
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
      </>
    );
  }
}

PasswordUpdate.contextType = userContext;
export default PasswordUpdate;
