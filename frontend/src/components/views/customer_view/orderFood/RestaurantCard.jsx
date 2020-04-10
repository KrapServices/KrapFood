import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Header, Icon, Segment, Menu, Message, Tab, Item, Modal,
} from 'semantic-ui-react';
import CustomerCartContext from './customerCartContext';


function ViewReviews(reviews) {
  if (reviews.length === 0) {
    return <p>No reviews yet!</p>;
  }
  return (
    <Modal trigger={<Button>Browse Reviews!</Button>}>
      <Modal.Header>Reviews by our customers</Modal.Header>
      <Modal.Content>

        <Modal.Description>
          <Segment.Group>
            {reviews.map((review, index) => {
              const key = review + index;
              return (
                <Segment key={key}>
                  {`Review ${index}:  ${review.review}`}
                </Segment>
              );
            })}
          </Segment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

function RestaurantCard(props) {
  const cartContext = React.useContext(CustomerCartContext);

  const splitIntoCategories = (foods) => {
    const categories = new Set();
    foods.forEach(({ category }) => categories.add(category));
    return Array.from(categories);
  };

  const getFoodListing = (category) => {
    const { restaurant } = props;
    const { foods } = restaurant;
    const { addToCart } = cartContext;
    const listOfFood = foods.filter((food) => food.category === category);
    return (
      <Item.Group divided style={{ textAlign: 'left' }}>
        {listOfFood.map((food) => {
          const { restaurantId, foodName } = food;
          const key = restaurantId + foodName;
          return (
            <Item key={key}>
              <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Item.Content>
                <Item.Header as="h1">{food.foodName}</Item.Header>
                <Item.Description floated="left">
                  Price:
                  <b>{` ${food.price}`}</b>
                  {' '}
                  <br />
                  Daily Limit:
                  {' '}
                  <b>{` ${food.dailyLimit}`}</b>
                  {' '}
                  <br />
                  Available:
                  <b>{food.availability ? <Icon name="checkmark" color="green" /> : <Icon name="cancel" color="red" />}</b>
                  {' '}
                  {ViewReviews(food.reviews)}
                </Item.Description>
                { food.availability
                  ? (
                    <Button primary floated="right" onClick={() => addToCart(food)}>
                      <Icon name="cart" />
                      Add to cart
                      <Icon name="right chevron" />
                    </Button>
                  ) : <p>daily limit reached</p>}
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    );
  };

  const buildPanes = (categories) => {
    const panes = [];
    categories.forEach((category) => panes.push({
      menuItem: `${category}`,
      render: () => <Tab.Pane>{getFoodListing(category)}</Tab.Pane>,
    }));
    return panes;
  };

  const { restaurant, orderFromThisRestaurant } = props;
  const { restaurantName, restaurantId, restaurantLocation } = restaurant;
  const { selectedRestaurantId } = cartContext;
  const categories = splitIntoCategories(restaurant.foods);
  const panes = buildPanes(categories);

  return (
    <>
      <Header as="h2" attached="top" block>
        {`${restaurantName}`}
      </Header>
      <Segment key={restaurantId} attached padded="very">
        {selectedRestaurantId === restaurantId
          ? (
            <Segment>
              <Tab menu={{ tabular: true }} panes={panes} />
            </Segment>
          )
          : (
            <>
              <Message attached="top"> Categories</Message>
              <Menu attached>
                {categories.map((category) => <Menu.Item key={category}>{category}</Menu.Item>)}
              </Menu>
              <br />
              <Header as="h3" floated="left">
                {' '}
                Located at:
                {' '}
                {` ${restaurantLocation}`}
              </Header>
              <br />
            </>
          )}

        {selectedRestaurantId === restaurantId
          ? <div />
          : (
            <Button
              floated="right"
              color="blue"
              onClick={() => orderFromThisRestaurant(restaurantId)}
            >
              {' '}
              <Icon name="food" />
              Select restaurant
            </Button>
          )}
      </Segment>
    </>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    foods: PropTypes.arrayOf(PropTypes.object),
    restaurantName: PropTypes.string.isRequired,
    restaurantId: PropTypes.number.isRequired,
    restaurantLocation: PropTypes.string.isRequired,
  }).isRequired,
  orderFromThisRestaurant: PropTypes.func.isRequired,
};

export default RestaurantCard;
