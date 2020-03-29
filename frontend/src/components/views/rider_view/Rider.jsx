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
      <div
        style={{
          marginLeft: '20%',
          marginRight: '20%',
        }}
      >
        <WeeklyWorkSchedule />
      </div>
    );
  }
}

Rider.contextType = userContext;
export default Rider;
