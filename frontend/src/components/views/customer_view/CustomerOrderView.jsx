import React, { Component } from 'react';
import userContext from '../../../userContext';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <p>Your Past Orders</p>
      </div>
    );
  }
}

CustomerOrderView.contextType = userContext;

export default CustomerOrderView;
