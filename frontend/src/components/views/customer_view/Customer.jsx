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
      { menuItem: 'Your Orders', render: () => <Tab.Pane><CustomerOrderView /></Tab.Pane> },
      { menuItem: 'Order Food', render: () => <Tab.Pane><CustomerOrderFood /></Tab.Pane> },
      { menuItem: 'Summary', render: () => <Tab.Pane></Tab.Pane> },
    ];
    return (
      <Segment>
        <Header dividing size="huge" as="h1">
          Welcome, Customer
        </Header>
        <Grid padded>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={16}
            floated="right"
            id="content"
          >
            <Tab menu={{ fluid: true, vertical: true, compact: true }} panes={panes} />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

Customer.contextType = userContext;
export default Customer;
