import React, { Component } from 'react';
import {
  Modal, Button, Header, Icon, Segment, Form,
} from 'semantic-ui-react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import config from '../../../../config.json';
import customerOrderContext from './customerOrderContext';

class CompletedOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      listOfFood: [],
      listOfReview: [],
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
    const { order } = this.props;
    const { stars, listOfFood } = this.state;
    console.log(order);
    return (
      <div>
        <Modal trigger={<Button color="blue">View Order</Button>} size="small">
          <Header content="Completed Order" />
          <Modal.Content>
            <p>
              Order Id:
              {' '}
              {order.order_id}
            </p>
            <p>
              Order Delivery Location:
              {' '}
              {order.delivery_location}
            </p>
            <p>
              Order Total cost:
              {' '}
              {order.total_cost}
            </p>
            <p>
              Delivery rating for this order:
              {' '}
              {order.rating}
              {' '}
              Stars
            </p>
            <Header as="h2">Food Ordered</Header>
            {
                listOfFood === undefined ? 'no food'
                  : listOfFood.map((food, index) => (
                    <Segment inverted key={food.food_name + food.restaurant_id}>
                      {`Food Name: ${food.food_name}`}
                    </Segment>
                  ))
              }
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

CompletedOrderModal.propTypes = {
  order: PropTypes.shape({
    order_id: PropTypes.number,
  }),
};

CompletedOrderModal.contextType = customerOrderContext;
export default CompletedOrderModal;
