import React, { Component } from 'react';
import userContext from '../../../userContext';

class Staff extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <p>i am a Staff</p>
      </>
    );
  }
}

Staff.contextType = userContext;
export default Staff;
