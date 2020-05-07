import React, { Component } from 'react';
import Calendar from 'react-calendar';
import {
  Dropdown, Grid, Button, Form, Header, Message, Loader,
} from 'semantic-ui-react';
import Axios from 'axios';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

function getEarliestDate(dates) {
  return dates.reduce((prev, curr) => (curr < prev ? new Date(+curr) : new Date(+prev)));
}

function getLatestDate(dates) {
  return dates.reduce((prev, curr) => (curr > prev ? new Date(+curr) : new Date(+prev)));
}

function getDateRange(dates) {
  return [getEarliestDate(dates), getLatestDate(dates)];
}

function generateValues(start, end) {
  const arr = [];
  for (let i = start; i <= end; i += 1) {
    arr.push({
      key: i,
      text: `${i}:00`,
      value: i,
    });
  }
  return arr;
}

const timeOptions = generateValues(10, 22);


class PromotionSegment extends Component {
  constructor() {
    super();
    this.state = {
      dateRange: getDateRange([new Date(Date.now())]),
      waitingForFirstClick: true,
      error: false,
      startTime: '',
      endTime: '',
      promoName: '',
      discount: '',
      campaignId: '',
      campaigns: [],
      isLoading: true,
      customCampaign: false,
      campaignName: '',
    };

    this.handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    this.handleStartTimeChange = (event, { value }) => {
      this.setState({ startTime: value });
    };

    this.handleEndTimeChange = (event, { value }) => {
      this.setState({ endTime: value });
    };

    this.handleCampaign = (event, { value }) => {
      if (value === 'Custom') {
        this.setState({
          campaign: value,
          campaignId: '',
          customCampaign: true,
        });
      } else {
        this.setState({
          campaignId: value,
          customCampaign: false,
        });
      }
    };

    this.clearForm = () => {
      this.setState({
        date: new Date(Date.now()),
        dateRange: [new Date(Date.now()), new Date(Date.now())],
        dateBuffer: [],
        waitingForFirstClick: true,
        startTime: '',
        endTime: '',
        promoName: '',
        discount: '',
        campaignId: '',
        customCampaign: false,
        campaignName: '',
      });
    };

    this.handleSubmit = async () => {
      const {
        startTime, endTime, dateRange, promoName,
        discount, campaignId, campaignName, customCampaign,
      } = this.state;
      dateRange[0].setHours(startTime);
      dateRange[1].setHours(endTime);
      console.log(this.state);
      try {
        if (customCampaign) {
          await Axios.post(`${config.localhost}promotions/createCampaign`, {
            dateRange,
            promoName,
            discount,
            campaignName,
          });
        } else {
          await Axios.post(`${config.localhost}promotions/createPromo`, {
            dateRange,
            promoName,
            discount,
            campaignId,
          });
        }
        alert('promotion created!');
        this.clearForm();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert('error has occured');
      }
    };

    this.loadCampaigns = async () => {
      try {
        const result = await Axios.get(
          `${config.localhost}promotions/campaigns`,
        );
        this.setState({
          campaigns: result.data,
        });
      } catch (error) {
        console.log('Error has occured');
      }
      const { campaigns } = this.state;
      const newCampaigns = campaigns.concat({
        campaignId: 'Custom',
        campaignName: 'Custom',
      });
      this.setState({ campaigns: newCampaigns });
      this.setState({
        isLoading: false,
        customCampaign: false,
      });
    };
  }

  componentDidMount() {
    this.loadCampaigns();
  }

  render() {
    const {
      campaignName, customCampaign, isLoading,
      campaigns, dateRange, waitingForFirstClick,
      startTime, endTime, promoName, discount, campaignId,
    } = this.state;
    return (
      <>
        <Header size="huge">Create a promotion</Header>
        <br />
        {isLoading ? <Loader /> : (
          <Form>
            <Form.Field>
              <Header>Enter Date</Header>
              <Message
                size="large"
                info
                compact
              >
                {waitingForFirstClick ? 'Select start of range' : 'Select end of range'}
              </Message>

              <Calendar
                className="calendar"
                onClickDay={(value) => {
                  if (waitingForFirstClick) {
                    this.setState({
                      waitingForFirstClick: false,
                      dateRange: getDateRange([new Date(+value)]),
                    });
                  } else {
                    this.setState({
                      waitingForFirstClick: true,
                      dateRange: getDateRange(dateRange.concat([new Date(+value)])),
                    });
                  }
                }}
                value={dateRange}
              />

            </Form.Field>
            <br />
            <Form.Field>
              <Header>
                Enter Time Period
              </Header>
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Select Start Time"
                      fluid
                      selection
                      options={timeOptions}
                      name="startTime"
                      value={startTime}
                      onChange={this.handleStartTimeChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <p>to</p>
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      placeholder="Select End Time"
                      fluid
                      selection
                      options={timeOptions}
                      name="endTime"
                      value={endTime}
                      onChange={this.handleEndTimeChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Field>
            <Form.Field>
              <Header>Promotion Name</Header>
              <input
                placeholder="Promotion Name"
                name="promoName"
                value={promoName}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Discount Amount</Header>
              <input
                placeholder="Discount"
                name="discount"
                value={discount}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Header>Promotional Campaign</Header>
              <Dropdown
                placeholder="Select Campaign"
                fluid
                selection
                options={campaigns.map((campaign) => ({
                  key: campaign.campaignId,
                  text: `${campaign.campaignName}`,
                  value: campaign.campaignId,
                }))}
                name="campaign"
                value={campaignId}
                onChange={this.handleCampaign}
              />
            </Form.Field>
            {customCampaign ? (
              <Form.Field>
                <Header>New Campaign Name</Header>
                <input
                  placeholder="Campaign Name"
                  name="campaignName"
                  value={campaignName}
                  onChange={this.handleChange}
                />
              </Form.Field>
            ) : <br />}
            <Button
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form>
        )}
      </>
    );
  }
}
PromotionSegment.contextType = userContext;
export default PromotionSegment;
