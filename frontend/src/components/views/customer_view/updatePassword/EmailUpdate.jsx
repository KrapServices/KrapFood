import React, { Component } from 'react';
import axios from 'axios';
import {
  Form, Button, Divider, Message, Header,
} from 'semantic-ui-react';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

class EmailUpdate extends Component {
  constructor() {
    super();
    this.state = {
      newEmail: '',
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
    const { newEmail } = this.state;
    this.setState({
      newEmail: '',
      loading: true,
    });
    try {
      await axios.patch(`${config.localhost}customers/email`, {
        customerId: user.customerId,
        email: newEmail,
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
      newEmail, loading, success, error,
    } = this.state;

    return (
      <>
        <div
          style={{
            paddingLeft: '35vw',
            paddingRight: '35vw',
          }}
        >
          <Header size="huge">Update Email</Header>
          <Form
            loading={loading}
            success={success}
            error={error}
            onSubmit={() => this.handleSubmit()}
          >
            <Form.Field>
              <Form.Input
                name="newEmail"
                value={newEmail}
                label="Enter New Email"
                type="text"
                placeholder="Enter new email"
                required
                onChange={(event, data) => this.handleChange(event, data)}
              />
            </Form.Field>
            <Message
              success
              header="Update successful"
              content="Your email has been updated."
            />
            <Message
              error
              header="An error occurred"
              content="Failed to update your email."
            />
            <Button
              type="submit"
              disabled={newEmail.length === 0}
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

EmailUpdate.contextType = userContext;
export default EmailUpdate;
