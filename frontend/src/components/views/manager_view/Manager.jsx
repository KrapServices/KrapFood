import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import userContext from '../../../userContext';
import PasswordUpdate from './updatePassword/PasswordUpdate';
import Summary from './summary/Summary';
import RiderViewer from './viewRiders/RiderViewer';
import AppPromotion from './promotions/AppPromotion';

class Manager extends Component {
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
      { menuItem: 'Create Promotions', render: () => <Tab.Pane><AppPromotion user={user} /></Tab.Pane> },
      { menuItem: 'View Summary', render: () => <Tab.Pane><Summary /></Tab.Pane> },
      { menuItem: 'View Rider Shifts', render: () => <Tab.Pane><RiderViewer /></Tab.Pane> },
      { menuItem: 'Update Password', render: () => <Tab.Pane><PasswordUpdate /></Tab.Pane> },

    ];
    return (
      <>
        <Header size="huge" as="h1">
          Welcome, Manager
        </Header>
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

Manager.contextType = userContext;
export default Manager;
