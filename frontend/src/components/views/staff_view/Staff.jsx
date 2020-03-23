import React, { Component } from 'react';
import userContext from '../../../userContext';
import { Header, Tab } from 'semantic-ui-react';
import StaffAddFood from './StaffAddFood';
import StaffUpdateFood from './StaffUpdateFood';


class Staff extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const panes = [
      { menuItem: 'Add Food Item to Menu', render: () => <Tab.Pane><StaffAddFood /></Tab.Pane> },
      { menuItem: 'Update Food Availability', render: () => <Tab.Pane><StaffUpdateFood /></Tab.Pane> },
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
