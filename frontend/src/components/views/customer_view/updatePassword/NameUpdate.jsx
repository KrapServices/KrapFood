import React, { Component } from 'react';
import axios from 'axios';
import {
  Form, Button, Divider, Message, Header,
} from 'semantic-ui-react';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

class NameUpdate extends Component {
  constructor() {
    super();
    this.state = {
      newName: '',
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
    const { newName } = this.state;
    this.setState({
      newName: '',
      loading: true,
    });
    try {
      await axios.patch(`${config.localhost}customers/name`, {
        customerId: user.customerId,
        name: newName,
      });
      this.setState({
        loading: false,
        success: true,
        error: false,
      });
      window.location.reload();
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
      newName, loading, success, error,
    } = this.state;

    return (
      <>
        <div
          style={{
            paddingLeft: '35vw',
            paddingRight: '35vw',
          }}
        >
          <Header size="huge">Update name</Header>
          <Form
            loading={loading}
            success={success}
            error={error}
            onSubmit={() => this.handleSubmit()}
          >
            <Form.Field>
              <Form.Input
                name="newName"
                value={newName}
                label="Enter New Name"
                type="text"
                placeholder="Enter new name"
                required
                onChange={(event, data) => this.handleChange(event, data)}
              />
            </Form.Field>
            <Message
              success
              header="Update successful"
              content="Your name has been updated."
            />
            <Message
              error
              header="An error occurred"
              content="Failed to update your name."
            />
            <Button
              type="submit"
              disabled={newName.length === 0}
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

NameUpdate.contextType = userContext;
export default NameUpdate;
