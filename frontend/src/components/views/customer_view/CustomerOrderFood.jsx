import React, { Component } from 'react';
import userContext from '../../../userContext';

class CustomerOrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <p>order Food</p>
      </div>
    );
  }
}

CustomerOrderFood.contextType = userContext;

export default CustomerOrderFood;
