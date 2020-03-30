import React, { Component } from 'react';
import userContext from '../../../userContext';
import { Header, Tab } from 'semantic-ui-react';
import StaffAddFood from './StaffAddFood';
import StaffUpdateFood from './StaffUpdateFood';
import StaffSummary from './StaffSummary';


class Staff extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.context);
    const panes = [
      { menuItem: 'Add Food Item to Menu', render: () => <Tab.Pane><StaffAddFood /></Tab.Pane> },
      { menuItem: 'Update Food Items', render: () => <Tab.Pane><StaffUpdateFood /></Tab.Pane> },
      { menuItem: 'Create Promotion', render: () => <Tab.Pane><StaffUpdateFood /></Tab.Pane> },
      { menuItem: 'Summary Information', render: () => <Tab.Pane><StaffSummary /></Tab.Pane> },
    ];
    return (
      <>
        <Header size="huge" as="h1">
          Welcome, Staff
        </Header>
        <Tab
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
