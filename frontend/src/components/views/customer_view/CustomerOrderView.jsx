import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfOrders: []
    };


    this.loadOrders = async () => {
      const { user } = this.props;
      const { customer_id } = user;
      const result = await Axios.get(`${config.localhost}orders/userId/` + customer_id );
      if (result.status === 200) {
        this.setState({ listOfOrders: result.data.orders });
      } else {
        alert('cannot load orders');
      }
    };
  }

  componentDidMount() {
    this.loadOrders();
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
