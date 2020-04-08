import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import Axios from 'axios';
import PromotionDurationSegment from './PromotionDurationSegment';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

class StaffCreatePromotion extends Component {
  constructor() {
    super();
    this.state = {
      promotions: [],
      startTime: '',
      endTime: '',
    };

    this.loadPromo = async () => {
      const { restaurant_id } = this.context.user;
      this.state.restaurantId = restaurant_id;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/promo`,
        );
        if (result.status === 200) {
          this.setState({ promotions: result.data });
          console.log(this.state);
        } else {
          alert('unable to load promotions');
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };
  }

  /* executed once components are mounted */
  componentDidMount() {
    this.loadPromo();
  }


  render() {
    const { promotions } = this.state;
    return (
      <>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <PromotionDurationSegment />
            </Grid.Column>
            <Grid.Column>
              <Item.Group divided style={{ textAlign: 'left' }}>
                {promotions.map((promo) => (
                  <Item key={{
                    restaurantId: promo.restaurantId,
                    promoName: promo.promoName,
                  }}
                  >
                    <Item.Content>
                      <Item.Header as="h1">{promo.promoName}</Item.Header>
                      <Item.Description floated="left">
                        Discount:
                        <b>
                          {` ${promo.discount}`}
                          % off
                        </b>
                        {' '}
                        <br />
                        Start time:
                        {' '}
                        <b>{` ${new Date(promo.startTime)}`}</b>
                        {' '}
                        <br />
                        End time:
                        {' '}
                        <b>{` ${new Date(promo.endTime)}`}</b>
                        {' '}
                        <br />
                      </Item.Description>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

StaffCreatePromotion.contextType = userContext;
export default StaffCreatePromotion;
