import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import userContext from '../../../userContext';
import StaffAddFood from './addFood/StaffAddFood';
import StaffUpdateFood from './updateFood/StaffUpdateFood';
import StaffSummary from './summary/StaffSummary';
import StaffCreatePromotion from './promotions/StaffCreatePromotion';
import StaffOrderView from './orderView/StaffOrderView';

class Staff extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };

    this.handleTabChange = (_, { activeIndex }) => {
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
    const { user } = this.context;
    console.log(this.context);
    const panes = [
      { menuItem: 'Add Food Item to Menu', render: () => <Tab.Pane><StaffAddFood /></Tab.Pane> },
      { menuItem: 'Update Food Items', render: () => <Tab.Pane><StaffUpdateFood /></Tab.Pane> },
      { menuItem: 'Update Orders', render: () => <Tab.Pane><StaffOrderView user={user} /></Tab.Pane> },
      { menuItem: 'Create Promotion', render: () => <Tab.Pane><StaffCreatePromotion /></Tab.Pane> },
      { menuItem: 'Summary Information', render: () => <Tab.Pane><StaffSummary /></Tab.Pane> },
    ];
    return (
      <>
        <Header size="huge" as="h1">
          Welcome, Staff
        </Header>
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          menu={{ horizontal: true, compact: true }}
          panes={panes}
          style={{ marginLeft: '50px', marginRight: '50px' }}
        />
      </>
    );
  }
}

Staff.contextType = userContext;
export default Staff;
