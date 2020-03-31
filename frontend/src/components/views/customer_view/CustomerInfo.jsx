import React, { Component } from 'react';
import {
  Modal, Button, Icon, Header, Segment,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config';
import userContext from '../../../userContext';
import CreditCardSignUp from './CreditCardSignup';


class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCreditCards: [],
      modalOpen: false,
    };

    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }


  async componentDidMount() {
    const { user } = this.context;
    const { customer_id } = user;
    const result = await Axios.get(`${config.localhost}customers/cc/${customer_id}`);
    if (result.status === 200) {
      this.setState({ customerCreditCards: result.data.cards });
    }
  }

  render() {
    const { customerCreditCards, modalOpen } = this.state;
    return (
      <>
        <Segment style={{ marginLeft: '20%', marginRight: '20%' }}>
          <Header as="h1">Your Credit Cards</Header>

          {
              customerCreditCards === undefined ? <Header as="h3">No credit card found!</Header>
                : (
                  <Segment.Group>
                    {
              customerCreditCards.map((card) =>(
                <Segment key={card.card_number}>
                  <Header as="h2">{card.card_number}</Header>
                  <Header as="h4" >{card.expiry}</Header>
                </Segment>
              ))
}
                  </Segment.Group>
                )

          }


          <Modal
            trigger={(
              <Button onClick={this.handleOpen} color="blue">
                {' '}
                <Icon name="add" />
                Add Credit Card
              </Button>
)}
            open={modalOpen}
            onClose={this.handleClose}
            size="small"
          >
            <Header icon="money" content="Register Credit Card" />
            <Modal.Content>
              <CreditCardSignUp handleClose={() => this.handleClose()} />
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="backward" />
                {' '}
                go back
              </Button>
            </Modal.Actions>
          </Modal>

        </Segment>
      </>
    );
  }
}


CustomerInfo.contextType = userContext;
export default CustomerInfo;
