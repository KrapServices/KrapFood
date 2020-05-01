import React, { Component } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import CustomerSummary from './CustomerSummary';
import userContext from '../../../../userContext';
import OrderSummary from './OrderSummary';

class Summary extends Component {
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
      { menuItem: 'Customer Summary', render: () => <Tab.Pane><CustomerSummary /></Tab.Pane> },
      { menuItem: 'Orders Summary', render: () => <Tab.Pane><OrderSummary /></Tab.Pane> },
      { menuItem: 'Rider Summary', render: () => <Tab.Pane><CustomerSummary /></Tab.Pane> },
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

Summary.contextType = userContext;
export default Summary;
