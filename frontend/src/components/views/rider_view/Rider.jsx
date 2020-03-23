import React, { Component } from 'react';
import userContext from '../../../userContext';
import { Header, Tab } from 'semantic-ui-react';
import RiderSubmitWS from './RiderSubmitWS';
import RiderUpdateOrder from './RiderUpdateOrder';


class Rider extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const panes = [
      { menuItem: 'Update Delivery Status', render: () => <Tab.Pane><RiderUpdateOrder /></Tab.Pane> },
      { menuItem: 'Submit Work Schedule', render: () => <Tab.Pane><RiderSubmitWS /></Tab.Pane> },
    ];
    return (
      <>
        <Header size="huge" as="h1">
          Welcome, Rider
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

Rider.contextType = userContext;
export default Rider;
