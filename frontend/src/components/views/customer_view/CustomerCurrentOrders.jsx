import React, { Component } from 'react';
import {
  List, Item, Card, Button, Modal, Header, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import customerCartContext from './customerCartContext';

class CustomerCurrentOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return <div/>;
  }
}

CustomerCurrentOrders.contextType = customerCartContext;
CustomerCurrentOrders.propTypes = {
  currentOrders: PropTypes.array
};

export default CustomerCurrentOrders;
