import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-input-slider';
import _ from 'lodash';
import Axios from 'axios';
import {
  Modal, Header, Button, Icon, List, Grid,
} from 'semantic-ui-react';
import PaymentForm from './PaymentForm';
import Promotions from './Promotions';
import DeliveryForm from './DeliveryForm';
import customerCartContext from '../customerCartContext';
import config from '../../../../../config.json';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payByCash: false,
      selectedCreditCard: {},
      restaurantPromotions: [],
      customerPromotions: [''],
      deliveryLocation: '',
      deliveryFee: 0,
      isDeliveryFeeCaculated: false,
      availablePoints: 0,
      pointsToRedeem: 0,
    };

    this.setCard = (card) => {
      this.setState({ selectedCreditCard: card });
    };
    this.switchPayment = () => {
      const { payByCash } = this.state;
      this.setState({ payByCash: !payByCash, selectedCreditCard: {} });
    };


    // =========================================================================
    // promo code
    // =========================================================================

    this.setPromotions = (value, index) => {
      const { customerPromotions } = this.state;
      customerPromotions[index] = value;
      this.setState({ customerPromotions });
    };

    // -------------------------------------------------------------------------
    // Delivery Fee
    // -------------------------------------------------------------------------
    this.determineFee = (value) => (value[0] === 'A' ? 5 : 6);

    this.calculateDeliveryFee = (e, { value }) => {
      console.log(value);
      const deliveryFee = this.determineFee(value);
      this.setState({ isDeliveryFeeCaculated: true, deliveryFee, deliveryLocation: value });
    };

    // =========================================================================
    // Axios calls
    // =========================================================================
    this.isDisabledOrder = () => {
      const { isDeliveryFeeCaculated, payByCash, selectedCreditCard } = this.state;
      if (payByCash) {
        return !isDeliveryFeeCaculated;
      }
      return !isDeliveryFeeCaculated ? true : _.isEmpty(selectedCreditCard);
    };

    this.createOrder = async () => {
      console.log(this.state);
      const {
        deliveryLocation,
        deliveryFee, payByCash, selectedCreditCard,
        restaurantPromotions, customerPromotions,
        pointsToRedeem,
      } = this.state;
      const { shoppingCart } = this.context;
      const { user } = this.props;
      const { customerId } = user;
      // get ID
      const listOfFoods = [];
      const uniqueFoods = [];
      shoppingCart.forEach((food) => {
        const { restaurantId, foodName } = food;
        const sameFood = (uniqueFood) => uniqueFood.restaurantId === restaurantId
            && uniqueFood.foodName === foodName;
        if (!uniqueFoods.find(sameFood)) {
          uniqueFoods.push(food);
        }
      });
      uniqueFoods.forEach((uniqueFood) => {
        const quantity = shoppingCart
          .filter((food) => food.restaurantId === uniqueFood.restaurantId
          && food.foodName === uniqueFood.foodName).length;
        listOfFoods.push({
          ...uniqueFood,
          quantity,
        });
      });

      const price = this.calculateFinalCost();
      try {
        const { clearCart } = this.context;
        const result = await Axios.post(
          `${config.localhost}orders/`,
          {
            customerId,
            totalCost: price,
            status: 'preparing',
            listOfFoods,
            deliveryLocation,
            deliveryFee,
            payByCash,
            selectedCreditCard,
            restaurantPromotions,
            customerPromotions,
            pointsToRedeem,
          },
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
        console.log(result);
        clearCart();
        alert('order created!');
      } catch (error) {
        //  console.log(error);
        alert('error has occured');
      }
    };

    this.getRestaurantOffers = async () => {
      const { selectedRestaurantId } = this.context;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${selectedRestaurantId}/promo`,
        );
        if (result.status === 200) {
          console.log(result.data);
          this.setState({ restaurantPromotions: result.data });
        } else {
          alert('unable to load promotions from restaurants');
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };
    this.DisplayRestaurantPromo = (restaurantPromotions) => (restaurantPromotions.length === 0 ? (
      <>
        {' '}
        <Header as="h2">
          No Active Restaurant Promotion
          <Icon name="cancel" />
        </Header>
        {' '}
      </>
    ) : (
      <>
        <Header as="h2">Current Restaurant promotions</Header>
        <List relaxed ordered>
          {restaurantPromotions.map((promo) => (
            <List.Item key={promo.promoName}>
              <List.Header>
                {`Promotion: ${promo.promoName}`}
              </List.Header>
              <List.Description>
                {`Discount: ${promo.discount}%`}
              </List.Description>
            </List.Item>
          ))}
        </List>
      </>
    )
    );
    this.caculateActualCost = () => {
      const { shoppingCart } = this.context;
      return shoppingCart.map((x) => Number(x.price)).reduce((prev, curr) => prev + curr, 0);
    };
    this.calculateFinalCost = () => {
      const { restaurantPromotions, deliveryFee, pointsToRedeem } = this.state;
      const { shoppingCart } = this.context;
      let priceList = shoppingCart.map((x) => Number(x.price));
      if (restaurantPromotions.length !== 0) {
        const totalRestaurantDiscount = restaurantPromotions
          .map((x) => x.discount).reduce((prev, curr) => Number(prev) + Number(curr), 0);
        // apply to each item
        priceList = priceList.map((price) => price * (totalRestaurantDiscount / 100));
      }
      // TODO: settle customer app wide promo code
      const result = priceList.reduce((prev, curr) => prev + curr, 0);
      const final = result + deliveryFee - pointsToRedeem;
      return final;
    };
    this.handleRedeem = (e) => {
      e.preventDefault();
      const { value } = e.target;
      const { availablePoints } = this.state;

      if (Number(value) > Number(availablePoints)) {
        this.setState({ pointsToRedeem: availablePoints });
      } else {
        this.setState({ pointsToRedeem: value });
      }
    };
  }

  async componentDidMount() {
    // get offers from restaurant
    await this.getRestaurantOffers();
    const { user } = this.props;
    this.setState({ availablePoints: user.points });
  }

  render() {
    const {
      payByCash, selectedCreditCard,
      customerPromotions, deliveryFee,
      restaurantPromotions, availablePoints, pointsToRedeem,
    } = this.state;

    const {
      closePayment,
    } = this.context;
    const actualCost = this.caculateActualCost();
    const finalCost = this.calculateFinalCost();
    return (
      <>
        <Modal
          open
          size="large"
        >
          <Header icon="money" content="Confirm your order" />
          <Modal.Content>
            {this.DisplayRestaurantPromo(restaurantPromotions)}
            { payByCash
              ? (
                <>
                  <h3>Payment will be by Cash on Delivery!</h3>
                  <br />
                  <Button color="orange" onClick={() => this.switchPayment()} inverted fluid>
                    <Icon name="money" />
                    {' '}
                    Pay by Credit Card instead
                  </Button>
                </>
              )
              : (
                <>
                  <PaymentForm
                    selectedCreditCard={selectedCreditCard}
                    setCard={(card) => this.setCard(card)}
                  />
                  {' '}
                  <br />
                  <Button color="orange" onClick={() => this.switchPayment()} inverted fluid>
                    <Icon name="money" />
                    {' '}
                    Pay by Cash On Delivery
                  </Button>
                </>
              ) }
            <Promotions promotions={customerPromotions} setPromotions={this.setPromotions} />
            <DeliveryForm calculateDeliveryFee={this.calculateDeliveryFee} />
            <Header as="h2">Redeem points</Header>
            <Header as="h3">{`Available Points: ${availablePoints}`}</Header>
            { availablePoints <= 0 ? <Header as="h3">No points to redeem</Header> : (
              <>
                <Header as="h3">Redeem:</Header>
                <Slider axis="x" xmin={0} x={pointsToRedeem} xmax={availablePoints} onChange={({ x }) => this.setState((state) => ({ ...state, pointsToRedeem: x }))} />
                {' '}
                <br />
                {' '}
                <p>{pointsToRedeem}</p>
              </>
            ) }
            <br />
            <Grid columns="5">
              <Grid.Column>
                <Header as="h3">{`Actual Cost: $${actualCost}` }</Header>
              </Grid.Column>
              <Grid.Column>
                <Icon size="big" name="add circle" />
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">{`Delivery Fee:  $${deliveryFee}`}</Header>
              </Grid.Column>
              <Grid.Column>
                <Icon size="big" name="arrow alternate circle right" />
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">{`Final Cost:  $${finalCost}`}</Header>
              </Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => closePayment()} inverted>
              <Icon name="cancel" />
              {' '}
              Back to order
            </Button>
            <Button color="green" onClick={() => this.createOrder()} disabled={this.isDisabledOrder()} inverted>
              <Icon name="checkmark" />
              {' '}
              Create Order
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

Checkout.propTypes = {
  user: PropTypes.objectOf(Object).isRequired,
};

Checkout.contextType = customerCartContext;
export default Checkout;
