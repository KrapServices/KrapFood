import React, { Component } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Tab } from 'semantic-ui-react';
import userContext from '../../../userContext';
import PartTimeRiderWorkSchedule from './PartTimeRiderWorkSchedule';
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
    const { user } = this.context;
    const { status } = user;
    const { activeIndex } = this.state;
    const panes = status === 'part' ? [
      { menuItem: 'Schedule', render: () => <Tab.Pane><PartTimeRiderWorkSchedule /></Tab.Pane> },
      { menuItem: 'Assigned Orders', render: () => <Tab.Pane><RiderViewOrder /></Tab.Pane> },
      { menuItem: 'Summary', render: () => <Tab.Pane><div /></Tab.Pane> },
    ] : [
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
