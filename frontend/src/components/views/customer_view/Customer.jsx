import React, { Component } from 'react';
import {
  Grid,
  Header,
  Tab,
  Segment,
} from 'semantic-ui-react';
import userContext from '../../../userContext';
import CustomerOrderFood from './CustomerOrderFood';
import CustomerOrderView from './CustomerOrderView';

class Customer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const panes = [
      { menuItem: 'Order Food', render: () => <Tab.Pane><CustomerOrderFood /></Tab.Pane> },
      { menuItem: 'Your Orders', render: () => <Tab.Pane><CustomerOrderView /></Tab.Pane> },
      { menuItem: 'Summary', render: () => <Tab.Pane></Tab.Pane> },
    ];
    return (
      <>
        <Header size="huge" as="h1">
          Welcome, Customer
        </Header>
        <Tab menu={{ horizontal: true, compact: true }} 
        panes={panes}  style={{marginLeft: "50px", marginRight: "50px"}}/>
      </>

    );
  }
}

Customer.contextType = userContext;
export default Customer;
