import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import userContext from '../../../userContext';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const { user } = this.context;
    const numOfOrder = user.num_orders;
    return (
      <div>
        <Grid>
          <Grid.Column>
            <Grid.Row centered>
              <Header>
                Order num:
                {numOfOrder}
              </Header>
            </Grid.Row>
            <Grid.Row centered>
              <br />
            </Grid.Row>
            <Grid.Row centered>
              <Header>
                Current_order:
              </Header>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

CustomerOrderView.contextType = userContext;

export default CustomerOrderView;
