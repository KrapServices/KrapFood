import React, { Component } from 'react';
import userContext from '../../../userContext';
import Calendar from 'react-calendar';

class StaffCreatePromotion extends Component {

    constructor() {
        super();
        this.state = {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now())
        };

        this.setRange = (value) => {
            console.log(value);
            this.setState({
              startDate: value,
            });
        };
    }


    render() {
        return (
            <>
            <Calendar
            className="calendar"
            defaultValue={[new Date(2020, 4, 1), new Date(2020, 4, 7)]}
            selectRange="true"
            onClickDay={(value) => this.setRange(value)}
          />
          </>
        ); 
    }

}

StaffCreatePromotion.contextType = userContext;
export default StaffCreatePromotion;
