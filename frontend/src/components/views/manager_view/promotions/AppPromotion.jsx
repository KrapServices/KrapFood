import React, { Component } from 'react';
import {
  Grid, Item, Segment, Header,
} from 'semantic-ui-react';
import Axios from 'axios';
import userContext from '../../../../userContext';
import config from '../../../../config.json';
import PromotionSegment from './PromotionSegment';

function formatTime(date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const hourString = (hour < 10) ? `0${hour}` : `${hour}`;
  const minuteString = (minutes < 10) ? `0${minutes}` : `${minutes}`;
  return `${date.toDateString()}, ${hourString}:${minuteString}`;
}

class AppPromotion extends Component {
  constructor() {
    super();
    this.state = {
      campaigns: [],
    };

    this.loadPromoWithCampaign = async () => {
      try {
        const result = await Axios.get(
          `${config.localhost}promotions/promoCampaign`,
        );
        if (result.status === 200) {
          this.setState({ campaigns: result.data.campaigns });
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
    this.loadPromoWithCampaign();
  }


  render() {
    const { campaigns } = this.state;
    return (
      <>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <PromotionSegment />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">Campaigns</Header>
              {
                campaigns.map((campaign) => (
                  <Segment
                    textAlign="justified"
                    key={
                {
                  id: campaign.campaignId,
                }
                  }
                  >
                    <Header as="h3">
                      Campaign:
                      {` ${campaign.campaignName}`}
                    </Header>
                    <Segment.Group>
                      {campaign.promotions.map((promo) => {
                        const key = promo.promoId + promo.restaurantId + promo.promoName;
                        return (
                          <Segment key={key}>
                            <Item>
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
                                  <b>
                                    {formatTime(new Date(promo.startTime))}
                                  </b>
                                  {' '}
                                  <br />
                                  End time:
                                  {' '}
                                  <b>{formatTime(new Date(promo.endTime))}</b>
                                  {' '}
                                  <br />
                                </Item.Description>
                              </Item.Content>
                            </Item>
                          </Segment>
                        );
                      })}
                    </Segment.Group>


                  </Segment>
                ))
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

AppPromotion.contextType = userContext;
export default AppPromotion;
