import React, { Component } from 'react';
import userContext from '../../../userContext';
import Calendar from 'react-calendar';
import { Dropdown, Grid, Button, Form, Header } from 'semantic-ui-react';
import Axios from 'axios';
import config from '../../../config.json';

function getEarliestDate(dates) {
    return dates.reduce((prev, curr) => (curr < prev ? curr : prev));
}
  
function getLatestDate(dates) {
    return dates.reduce((prev, curr) => (curr > prev ? curr : prev));
}
  
function fixDateRange(dateRange) {
    return [getEarliestDate(dateRange), getLatestDate(dateRange)];
}

function generateValues(start, end) {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push({
            key:i,
            text:i+":00",
            value: i
        });
    }
    return arr;
}

const timeOptions = generateValues(10, 22);


class PromotionDurationSegment extends Component {

    constructor() {
        super();
        this.state = {
            date: new Date(Date.now()),
            dateRange: [new Date(Date.now()), new Date(Date.now())],
            dateBuffer: [],
            waitingForFirstClick: true,
            startTime: "",
            endTime: "",
            promoName: "",
            discount: "",
            restaurantId: "",
        };

        this.handleChange = (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            this.setState({
              [name]: value,
            });
          };
        
        this.handleStartTimeChange = (event, {value}) => {
            const { dateRange } = this.state;
            dateRange[0].setHours(value);
            this.setState({ startTime: value });
        };

        this.handleEndTimeChange = (event, {value}) => {
            const { dateRange } = this.state;
            dateRange[1].setHours(value);
            this.setState({ endTime: value });
        };

        this.clearForm = () => {
            this.setState({
                date: new Date(Date.now()),
                dateRange: [new Date(Date.now()), new Date(Date.now())],
                dateBuffer: [],
                waitingForFirstClick: true,
                startTime: "",
                endTime: "",
                promoName: "",
                discount: "",
                restaurantId: "",
            });
        }

        this.handleSubmit = async () => {
            const { restaurant_id } = this.context.user;
            this.state.restaurantId = restaurant_id;
            console.log(this.state);
            const { startTime, endTime, restaurantId, dateRange, promoName, discount } = this.state;
            // dateRange[0].setHours(startTime);
            // dateRange[1].setHours(endTime);
            try {
                await Axios.post(`${config.localhost}restaurants/create`, {
                    restaurantId: restaurantId,
                    dateRange: dateRange,
                    promoName: promoName,
                    discount: discount
                  });
                alert('promotion created!');
                this.clearForm();
                window.location.reload();
            }  catch (error) {
                console.log(error);
                alert('error has occured');
            }
        }
    }


    render() {
        const {
            dateRange, waitingForFirstClick, dateBuffer, startTime, endTime, promoName, discount
        } = this.state;
        return (
            <>
            <Header size="huge">Create a promotion</Header>
            <br />
            <Form>
                <Form.Field>
                <Header>Enter Date</Header>
                <Calendar
                className="calendar"
                onClickDay={(value) => {
                this.setState({
                    date: value,
                });
                if (waitingForFirstClick) {
                    this.setState({
                    waitingForFirstClick: false,
                    dateBuffer: [value],
                    });
                } else {
                    this.setState({
                    waitingForFirstClick: true,
                    dateRange: fixDateRange(dateBuffer.concat([value])),
                    dateBuffer: [],
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
                            placeholder='Select Start Time'
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
                            placeholder='Select End Time'
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
                <Button
                type="submit"
                onClick={this.handleSubmit}
                >
                Submit
                </Button>
            </Form>
            </>
        ); 
    }

}

PromotionDurationSegment.contextType = userContext;
export default PromotionDurationSegment;
