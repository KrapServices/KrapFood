import React, { Component } from 'react';
import userContext from '../../../userContext';

class Rider extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <p>i am a Rider</p>
      </>
    );
  }
}

Rider.contextType = userContext;
export default Rider;
