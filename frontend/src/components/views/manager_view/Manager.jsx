import React, { Component } from 'react';
import axios from 'axios';
import userContext from '../../../userContext';
import config from '../../../config.json';

class Manager extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      riders: [
        {
          id: 1,
          status: 'part-time',
        },
        {
          id: 2,
          status: 'full-time',
        },
      ],
    };
  }

  async componentDidMount() {
    const { user } = this.context;
    const { riders } = (await axios.get(`${config.localhost}managers/${user.manager_id}/riders`)).data;
    this.setState({
      riders,
    });
  }

  submitPassword() {
    const { user } = this.context;
    const { password } = this.state;
    axios.patch(`${config.localhost}managers/`, {
      manager_id: user.manager_id,
      password,
    });
  }

  render() {
    const { password, riders } = this.state;

    return (
      <>
        <h3>Update password</h3>
        <div className="ui action input">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(event) => {
              this.setState({
                password: event.target.value,
              });
            }}
          />
          <button
            className="ui button"
            type="button"
            onClick={() => {
              this.submitPassword();
              this.setState({
                password: '',
              });
            }}
          >
            Submit
          </button>
        </div>

        <div style={{
          marginTop: '32px',
        }}
        >
          <h3>My riders</h3>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Part-time/Full-time</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => {
                const { id, status } = rider;

                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{status === 'part-time' ? 'Part-time' : 'Full-time'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

Manager.contextType = userContext;
export default Manager;
