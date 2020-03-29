import React, { Component } from 'react';
import userContext from '../../../userContext';
import WeeklyWorkSchedule from './WeeklyWorkSchedule';

class Rider extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <WeeklyWorkSchedule />
    );
  }
}

Rider.contextType = userContext;
export default Rider;