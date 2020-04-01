import React, { Component } from 'react';
import Axios from 'axios';
import { Table, Statistic, Dropdown } from 'semantic-ui-react';
import userContext from '../../../userContext';
import config from '../../../config.json';

var monthString = new Array();
monthString[0] = "January";
monthString[1] = "February";
monthString[2] = "March";
monthString[3] = "April";
monthString[4] = "May";
monthString[5] = "June";
monthString[6] = "July";
monthString[7] = "August";
monthString[8] = "September";
monthString[9] = "October";
monthString[10] = "November";
monthString[11] = "December";

class StaffSummary extends Component {
  constructor() {
    super();
    this.state = {
      months: [],
    }

    this.loadMonths = async () => {
      const { restaurant_id } = this.context.user;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/months`,
        );
        this.setState({
          months:result.data
        })
      } catch (error) {
        console.log('Error has occured');
      }
    };

    this.handleChange = (e, { value }) => {
      this.setState({month: value[0], year: value[1]});
      console.log(this.state);
      this.loadStats();
    };

    this.loadStats = async () => {
      const { restaurant_id } = this.context.user;
      const { month, year } = this.state;
      try {
        const result = await Axios.get(
          `${config.localhost}restaurants/${restaurant_id}/stats/?month=${month}&year=${year}`,
        );
        console.log(result.data.stats[0]);
        // this.generateStats();
        // if (result.status === 200) {
        //   this.setState({ menu: result.data });
        // } else {
        //   alert('unable to load menu');
        // }
        // return result.data.totalOrders;
      } catch (error) {
        console.log('Error has occured');
      }
    };

    // this.generateStats = () => {
    //   return (
    //     <Statistic.Group
    //       style={{
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <Statistic>
    //         <Statistic.Value>{orderCount}</Statistic.Value>
    //         <Statistic.Label>Orders</Statistic.Label>
    //       </Statistic>
    //       <Statistic>
    //         <Statistic.Value>{totalCost}</Statistic.Value>
    //         <Statistic.Label>Total Order Value</Statistic.Label>
    //       </Statistic>
    //     </Statistic.Group>

    //   );
    // }

  }

  componentDidMount() {
    this.loadMonths();
  }

  render() {
    // destructuring
    const { months } = this.state;
    return (
      <Table>
         <Dropdown
            placeholder='Select month'
            fluid
            selection
            options={months.map(month => {
              return {
                  key: [month.month, month.year],
                  text: monthString[month.month-1] + " " + month.year,
                  value: [month.month, month.year]
              }
            })}
            onChange={this.handleChange}
          />
      </Table>
    );
  }
}

StaffSummary.contextType = userContext;
export default StaffSummary;
