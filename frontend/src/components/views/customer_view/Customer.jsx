import React, { Component } from 'react';
import {
  Header,
  Tab,
} from 'semantic-ui-react';
import userContext from '../../../userContext';
import CustomerOrderFood from './CustomerOrderFood';
import CustomerOrderView from './CustomerOrderView';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.context;
    const panes = [
      { menuItem: 'Order Food', render: () => <Tab.Pane><CustomerOrderFood user={user} /></Tab.Pane> },
      { menuItem: 'Your Orders', render: () => <Tab.Pane><CustomerOrderView user={user} /></Tab.Pane> },
      { menuItem: 'Summary', render: () => <Tab.Pane><div /></Tab.Pane> },
    ];
    return (
      <>
        <Tab
          menu={{ compact: true }}
          panes={panes}
          style={{ marginLeft: '50px', marginRight: '50px' }}
        />
      </>

    );
  }
}

Customer.contextType = userContext;
export default Customer;
