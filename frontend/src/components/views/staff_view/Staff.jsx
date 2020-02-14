import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userContext } from '../../../userContext';

class Staff extends Component {


    render() {
        return (
            <React.Fragment>
                <p>i am a Staff</p>
            </React.Fragment>
        )
    }
}

Staff.contextType = userContext;
export default Staff;
