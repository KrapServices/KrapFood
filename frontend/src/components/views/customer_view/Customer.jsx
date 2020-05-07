import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';
import CustomerOrderFood from './orderFood/CustomerOrderFood';
import CustomerOrderView from './orderView/CustomerOrderView';
import CustomerInfo from './customerInfo/CustomerInfo';
import PasswordUpdate from './updatePassword/PasswordUpdate';
import NameUpdate from './updatePassword/NameUpdate';
import EmailUpdate from './updatePassword/EmailUpdate';


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
    const { user, update } = this.context;
    try {
      const refreshUser = await Axios.get(`${config.localhost}customers/getUser/${user.customerId}`);
      if (refreshUser.status === 200) {
        console.log(refreshUser.data);
        update(refreshUser.data.user);
      }
    } catch (error) {
      console.log('Error has occured');
    }

    if (activeIndex) {
      this.setState({ activeIndex });
    }
  }

  render() {
    const { activeIndex } = this.state;
    const { user } = this.context;
    const panes = [
      { menuItem: 'Customer Info', render: () => <Tab.Pane><CustomerInfo /></Tab.Pane> },
      { menuItem: 'Order Food', render: () => <Tab.Pane><CustomerOrderFood user={user} /></Tab.Pane> },
      { menuItem: 'Your Orders', render: () => <Tab.Pane><CustomerOrderView user={user} /></Tab.Pane> },
      {
        menuItem: 'Update Info',
        render: () => (
          <Tab.Pane>
            <>
              <EmailUpdate />
              <NameUpdate />
              <PasswordUpdate />
            </>
          </Tab.Pane>
        ),
      },
    ];
    return (
      <>
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
