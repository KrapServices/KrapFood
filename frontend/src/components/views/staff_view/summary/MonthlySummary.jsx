import React, { Component } from 'react';
import Axios from 'axios';
import {
  Grid, Dropdown, Loader, Item, Statistic, Header,
} from 'semantic-ui-react';
import userContext from '../../../../userContext';
import config from '../../../../config.json';

const monthString = [];
monthString[0] = 'January';
monthString[1] = 'February';
monthString[2] = 'March';
monthString[3] = 'April';
monthString[4] = 'May';
monthString[5] = 'June';
monthString[6] = 'July';
monthString[7] = 'August';
monthString[8] = 'September';
monthString[9] = 'October';
monthString[10] = 'November';
monthString[11] = 'December';

class MonthlySummary extends Component {
  constructor() {
    super();
    this.state = {
      months: [],
      isLoading: true,
    };

    this.loadMonths = async () => {
      const { restaurant_id } = this.context.user;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/months`,
        );
        this.setState({
          months: result.data,
          month: result.data[result.data.length - 1].month,
          year: result.data[result.data.length - 1].year,
        });
        console.log(this.state);
      } catch (error) {
        console.log('Error has occured');
      }
    };

    this.handleChange = async (e, { value }) => {
      const { restaurant_id } = this.context.user;
      const month = value[0];
      const year = value[1];
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/monthlystats/?month=${month}&year=${year}`,
        );
        if (result.status === 200) {
          this.setState({
            orderCount: result.data.stats[0].orderCount,
            totalCost: result.data.stats[0].totalCost,
            topFive: result.data.topFive,
          });
          this.setState({
            isLoading: false,
          });
          console.log(this.state);
        }
      } catch (error) {
        console.log('Error has occured');
      }
    };
  }

  componentDidMount() {
    this.loadMonths();
  }

  render() {
    // destructuring
    const {
      months, month, year, orderCount, totalCost, topFive, isLoading,
    } = this.state;
    return (
      <>
        <Dropdown
          placeholder="Select month"
          fluid
          selection
          defaultValue={[month, year]}
          options={months.map((month) => ({
            key: [month.month, month.year],
            text: `${monthString[month.month - 1]} ${month.year}`,
            value: [month.month, month.year],
          }))}
          onChange={this.handleChange}
        />
        <br />
        <br />
        {isLoading ? <Loader /> : (
          <div>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Statistic size="huge">
                    <Statistic.Value>{orderCount}</Statistic.Value>
                    <Statistic.Label>Orders</Statistic.Label>
                  </Statistic>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Statistic size="huge">
                    <Statistic.Value>{totalCost}</Statistic.Value>
                    <Statistic.Label>Total Order Value</Statistic.Label>
                  </Statistic>
                  <br />
                </Grid.Column>
                <Grid.Column>
                  <Header
                    as="h1"
                    textAlign="center"
                  >
                    Top Five
                  </Header>
                  <Item.Group divided style={{ textAlign: 'left' }}>
                    {topFive.map((food, index) => (
                      <Item key={index}>
                        {' '}
                        <Header as="h1" style={{ marginRight: '1rem' }}>
                          {index + 1}
                          .
                        </Header>
                        {' '}
                        <Item.Image
                          src="https://react.semantic-ui.com/images/wireframe/image.png"
                          spaced="left"
                          bordered="true"
                        />
                        <Item.Content>
                          <Item.Header as="h1">{food.food_name}</Item.Header>
                          <Item.Description floated="left">
                            Price:
                            <b>{` ${food.price}`}</b>
                            {' '}
                            <br />
                            Category:
                            {' '}
                            <b>{` ${food.category}`}</b>
                            {' '}
                            <br />
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    ))}
                  </Item.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row />
            </Grid>


          </div>
        )}
        <br />
        <br />
      </>
    );
  }
}
MonthlySummary.contextType = userContext;
export default MonthlySummary;
