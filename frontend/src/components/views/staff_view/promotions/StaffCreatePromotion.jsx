import React, { Component } from 'react';
import userContext from '../../../../userContext';

class StaffCreatePromotion extends Component {

    constructor() {
        super();
        this.state = {};
    }


    render() {
        return (
            <p>Promotions</p>
        ); 
    }

}

StaffCreatePromotion.contextType = userContext;
export default StaffCreatePromotion;
