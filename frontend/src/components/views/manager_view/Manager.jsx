import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userContext } from '../../../userContext';

class Manager extends Component {


    render() {
        return (
            <React.Fragment>
                <p>i am a Manager</p>
            </React.Fragment>
        )
    }
}

Manager.contextType = userContext;
export default Manager;
