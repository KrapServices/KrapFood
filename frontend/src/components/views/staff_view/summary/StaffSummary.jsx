import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import userContext from '../../../../userContext';
import MonthlySummary from './MonthlySummary';
import PromoSummary from './PromoSummary';

class StaffSummary extends Component {
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
      { menuItem: 'Monthly Summary', render: () => <Tab.Pane><MonthlySummary /></Tab.Pane> },
      { menuItem: 'Promotion Summary', render: () => <Tab.Pane><PromoSummary /></Tab.Pane> },
    ];
    return (
      <>
        <Header size="huge" as="h1">
          Summary Statistics
        </Header>
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          menu={{ compact: true }}
          panes={panes}
          style={{ marginLeft: '50px', marginRight: '50px', vertical: true }}
        />
      </>
    );
  }
}

StaffSummary.contextType = userContext;
export default StaffSummary;
