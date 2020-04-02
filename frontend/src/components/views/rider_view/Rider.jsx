import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Rider.css';
import {
  Header, Table, Divider, Tab,
} from 'semantic-ui-react';
import userContext from '../../../userContext';
import WeeklyWorkSchedule from './schedule/WeeklyWorkSchedule';
import config from '../../../config.json';
import RiderWorkSchedule from './schedule/RiderWorkSchedule';
import RiderViewOrder from './orderView/RiderOrderView';

class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };

    this.handleTabChange = (e, { activeIndex }) => {
      window.localStorage.setItem('activeIndex', activeIndex);
      this.setState({ activeIndex });
    };
  }

  componentDidMount() {
    const activeIndex = JSON.parse(window.localStorage.getItem('activeIndex'));
    if (activeIndex) {
      this.setState({ activeIndex });
    }
  }

  render() {
    const { activeIndex } = this.state;
    const panes = [
      { menuItem: 'Schedule', render: () => <Tab.Pane><RiderWorkSchedule /></Tab.Pane> },
      { menuItem: 'Assigned Orders', render: () => <Tab.Pane><RiderViewOrder /></Tab.Pane> },
      { menuItem: 'Summary', render: () => <Tab.Pane><div /></Tab.Pane> },
    ];
    return (
      <>
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          menu={{ compact: true }}
          panes={panes}
          style={{ marginLeft: '50px', marginRight: '50px' }}
        />
      </>

    );
  }
}

Rider.contextType = userContext;
export default Rider;