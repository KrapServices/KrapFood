import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import userContext from '../../../userContext';
import CustomerOrderFood from './orderFood/CustomerOrderFood';
import CustomerOrderView from './orderView/CustomerOrderView';
import CustomerInfo from './customerInfo/CustomerInfo';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };

    this.handleTabChange = (_, { activeIndex }) => {
      window.localStorage.setItem('activeIndex', activeIndex);
      this.setState({ activeIndex });
    };
  }

  async componentDidMount() {
    const activeIndex = JSON.parse(window.localStorage.getItem('activeIndex'));
    const { user, login } = this.context;
    await login(user.email, user.password, 'customer');
    if (activeIndex) {
      this.setState({ activeIndex });
    }
  }

  render() {
    const { activeIndex } = this.state;
    const { user } = this.context;
    const panes = [
      { menuItem: 'Order Food', render: () => <Tab.Pane><CustomerOrderFood user={user} /></Tab.Pane> },
      { menuItem: 'Your Orders', render: () => <Tab.Pane><CustomerOrderView user={user} /></Tab.Pane> },
    ];
    return (
      <>
        <CustomerInfo />
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          panes={panes}
          style={{ marginLeft: '50px', marginRight: '50px' }}
        />
      </>
    );
  }
}

Customer.contextType = userContext;
export default Customer;
