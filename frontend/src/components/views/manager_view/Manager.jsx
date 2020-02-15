import React, { Component } from 'react';
import userContext from '../../../userContext';

class Manager extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <p>i am a Manager</p>
      </>
    );
  }
}

Manager.contextType = userContext;
export default Manager;
