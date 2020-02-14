import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userContext } from '../../../userContext';

class Rider extends Component {


    render() {
        return (
            <React.Fragment>
                <p>i am a Rider</p>
            </React.Fragment>
        )
    }
}

Rider.contextType = userContext;
export default Rider;
