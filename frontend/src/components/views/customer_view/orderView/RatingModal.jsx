import React, { Component } from 'react';
import {
  Modal, Button, Header, Icon, Segment, Form,
} from 'semantic-ui-react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../../config.json';
import customerOrderContext from './customerOrderContext';

class RatingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      listOfFood: [],
      listOfReview: [],
    };

    this.handleChange = (e, { name, value }) => {
      const { listOfReview } = this.state;
      listOfReview[name] = value;
      this.setState({ [name]: value, listOfReview });
    };
    this.rateFood = async (id, rating) => {
      try {
        const { listOfFood, listOfReview } = this.state;
        const { user } = this.context;
        const { customerId } = user;

        const ratedFood = await Axios.post(`${config.localhost}customers/food/ratings`, {
          listOfFood,
          listOfReview,
          customerId,
        });

        if (ratedFood.status === 200) {
          alert('rated Food!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    this.rateOrder = async () => {
      try {
        const { order } = this.props;
        const id = order.order_id;
        const { stars } = this.state;
        const ratedOrder = await Axios.patch(`${config.localhost}customers/orders/ratings`,
          {
            id,
            rating: stars,
          });
        if (ratedOrder.status === 200) {
          const { loadOrders } = this.context;
          loadOrders();
          alert('rated delivery service!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    this.getFood = async () => {
      try {
        const { order } = this.props;
        const result = await Axios.get(`${config.localhost}orders/${order.order_id}/foods`);
        if (result.status === 200) {
          const listOfReview = [];
          result.data.food.map((_) => listOfReview.push(null));
          this.setState({ listOfFood: result.data.food, listOfReview });
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  componentDidMount() {
    this.getFood();
  }

  render() {
    const { stars, listOfFood } = this.state;
    return (
      <div>
        <Modal trigger={<Button color="green">Rate Order</Button>} basic size="small">
          <Header content="Rate this order!" />
          <Modal.Content>
            <p>
              How was your experience ?
            </p>
            <br />
            <p>
              {`Rate the delivery service: ${stars} stars`}
            </p>
            <Button.Group>
              {
                        [1, 2, 3, 4, 5].map((num) => (
                          <Button key={num} onClick={() => this.setState({ stars: num })} inverted>
                            {`${num} stars  `}
                            <Icon color="yellow" name="star" />
                          </Button>
                        ))
                      }
            </Button.Group>
            <br />
            <Button onClick={this.rateOrder} style={{ marginTop: '25px' }}> Rate delivery service</Button>
            <br />
            <br />
            <p>
              Rate the food! We love to hear your opinions
            </p>
            <Header as="h2" inverted>Food Ordered</Header>
            {
                listOfFood === undefined ? 'no food'
                  : listOfFood.map((food, index) => (
                    <Segment inverted key={food.food_name + food.restaurant_id}>
                      {`Food Name: ${food.food_name}`}
                      <Segment inverted>
                        <Form inverted>
                          <Form.Input label="Review" name={index} onChange={this.handleChange} placeholder="Tell us more about this food." />
                        </Form>
                      </Segment>
                    </Segment>
                  ))
              }
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.rateFood} inverted>
              <Icon name="checkmark" />
              {' '}
              Review food!
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

RatingModal.propTypes = {
  order: PropTypes.shape({
    order_id: PropTypes.number,
  }),
};

RatingModal.contextType = customerOrderContext;
export default RatingModal;
