import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userContext } from '../../../userContext';

class Customer extends Component {


    render() {
        return (
            <React.Fragment>
                <p>i am a customer</p>
            </React.Fragment>
        )
    }
}

Customer.contextType = userContext;
export default Customer;
