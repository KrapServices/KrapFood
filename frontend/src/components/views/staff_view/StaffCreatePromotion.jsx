import React, { Component } from 'react';
import userContext from '../../../userContext';
import Calendar from 'react-calendar';
import { Dropdown, Grid, Header, Step, Segment } from 'semantic-ui-react';
import PromotionDurationSegment from './PromotionDurationSegment';

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
            value:i+":00"
        });
    }
    console.log(arr);
    return arr;
}

const timeOptions = generateValues(10, 22);


class StaffCreatePromotion extends Component {

    constructor() {
        super();
        this.state = {
            date: new Date(Date.now()),
            dateRange: [new Date(Date.now()), new Date(Date.now())],
            shifts: [],
            dateBuffer: [],
            waitingForFirstClick: true,
        };

        this.setRange = (value) => {
            console.log(value);
            this.setState({
              startDate: value,
            });
        };
    }


    render() {
        const {
            dateRange, waitingForFirstClick, dateBuffer,
        } = this.state;
        return (
        <>
        <Grid columns={2} divided>
        <Grid.Row>
            <Grid.Column>
                <PromotionDurationSegment />
            </Grid.Column>
        </Grid.Row>
        </Grid>
        </>
        ); 
    }

}

StaffCreatePromotion.contextType = userContext;
export default StaffCreatePromotion;
