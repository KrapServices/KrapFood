import React, { Component } from 'react';
import {
  Modal, Button, Icon, Header, Segment, Grid,
} from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';
import userContext from '../../../userContext';
import CreditCardSignUp from './creditCard/CreditCardSignup';


class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCreditCards: [],
      promotions: [],
      modalOpen: false,
    };

    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }


  async componentDidMount() {
    const { user } = this.context;
    // eslint-disable-next-line camelcase
    const { customer_id } = user;
    // eslint-disable-next-line camelcase
    const resultCC = await Axios.get(`${config.localhost}customers/cc/${customer_id}`);
    const resultPromo = await Axios.get(`${config.localhost}customers/promotions/`);
    if (resultCC.status === 200 && resultPromo.status === 200) {
      this.setState({ customerCreditCards: resultCC.data.cards, promotions: resultPromo.data.promotions });
    }
  }

  render() {
    const { customerCreditCards, modalOpen, promotions } = this.state;
    return (
      <>
        <Grid columns="2" style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '2%' }}>

          <Grid.Row>
            <Grid.Column>

              <Segment>
                <Header as="h1">Your Credit Cards</Header>

                {
              customerCreditCards === undefined ? <Header as="h3">No credit card found!</Header>
                : (
                  <Segment.Group>
                    {
              customerCreditCards.map((card) => (
                <Segment key={card.card_number}>
                  <Header as="h2">{card.card_number}</Header>
                  <Header as="h4">{card.expiry}</Header>
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

            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h1">Available Promo Codes</Header>

                {
                  promotions === undefined ? <Header as="h3">No promo codes!</Header>
                    : (
                      <Segment.Group>
                        {
                  promotions.map((promo) => (
                    <Segment key={promo.promo_id}>
                      <Header as="h3">{`Discount: ${promo.discount}`}</Header>
                      <Header as="h3">{`start Time: ${promo.start_time}`}</Header>
                      <Header as="h3">{`end Time: ${promo.end_time}`}</Header>
                    </Segment>
                  ))
                  }
                      </Segment.Group>
                    )

                  }
              </Segment>
            </Grid.Column>
          </Grid.Row>


        </Grid>

      </>
    );
  }
}


CustomerInfo.contextType = userContext;
export default CustomerInfo;
