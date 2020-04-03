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
      locations: [],
    };

    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = async () => {
      await this.loadInfo();
      this.setState({ modalOpen: false });
    };

    this.loadInfo = async () => {
      const { user } = this.context;
      // eslint-disable-next-line camelcase
      const { customer_id } = user;
      // eslint-disable-next-line camelcase
      try {
        const resultLocations = await Axios.get(`${config.localhost}customers/locations/${customer_id}`);
        const resultCC = await Axios.get(`${config.localhost}customers/cc/${customer_id}`);
        const resultPromo = await Axios.get(`${config.localhost}customers/promotions/`);
        if (resultCC.status === 200 && resultPromo.status === 200) {
          console.log(resultLocations.data.locations);
          const locations = [];
          const promotions = [];
          const customerCreditCards = [];
          resultCC.data.cards.forEach((val) => customerCreditCards.push({ cardNumber: val.card_number, expiry: val.expiry }));
          resultPromo.data.promotions.forEach((val) => promotions.push({
            promoId: val.promo_id, discount: val.discount, startTime: val.start_time, endTime: val.end_time,
          }));
          resultLocations.data.locations.forEach((val) => locations.push({ createdAt: val.created_at, orderId: val.order_id, deliveryLocation: val.delivery_location }));
          this.setState({ customerCreditCards: resultCC.data.cards, promotions: resultPromo.data.promotions, locations });
        }
      } catch (error) {
        console.log(error);
      }
    };
  }


  componentDidMount() {
    this.loadInfo();
  }

  render() {
    const {
      customerCreditCards, modalOpen, promotions, locations,
    } = this.state;
    return (
      <>
        <Grid columns="3" style={{ marginLeft: '10%', marginRight: '10%', marginBottom: '2%' }}>

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
                <Segment key={card.cardNumber}>
                  <Header as="h2">{card.cardNumber}</Header>
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
                       promotions === undefined || promotions.length === 0 ? <Header as="h3">No promo codes!</Header>
                         : (
                           <Segment.Group>
                             {
                  promotions.map((promo) => (
                    <Segment key={promo.promoId}>
                      <Header as="h3">{`Discount: ${promo.discount}`}</Header>
                      <Header as="h3">{`start Time: ${promo.startTime}`}</Header>
                      <Header as="h3">{`end Time: ${promo.endTime}`}</Header>
                    </Segment>
                  ))
                  }
                           </Segment.Group>
                         )

                  }
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h1">Most Recent Delivery Locations</Header>

                {
                    locations === undefined || locations.length === 0 ? <Header as="h3">No locations yet!</Header>
                      : (
                        <Segment.Group>
                          {
                  locations.map((location, index) => (
                    <Segment key={location.orderId}>
                      <Header as="h3">{`${index}: ${location.deliveryLocation}`}</Header>

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
