import React, { Component } from 'react';
import userContext from '../../../userContext';
import FoodForm from './FoodForm';

class Staff extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return FoodForm;
  }
}

Staff.contextType = userContext;
export default Staff;
