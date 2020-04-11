import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import {
  Dropdown, Input, Header, Button,
} from 'semantic-ui-react';
import config from '../../../../../config.json';
import 'react-credit-cards/es/styles-compiled.css';
import userContext from '../../../../../userContext';

class DeliveryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      options: [],
      value: '',
      enterLocation: true,
    };

    this.handleChange = (e, { value }) => {
      const { locations } = this.state;
      const { calculateDeliveryFee } = this.props;
      calculateDeliveryFee(e, { value: locations[value].deliveryLocation });
      this.setState({ value });
    };

    this.loadLocations = async () => {
      try {
        const { user } = this.context;
        const { customerId } = user;
        const resultLocations = await Axios.get(`${config.localhost}customers/locations/${customerId}`);
        if (resultLocations.status === 200) {
          const locations = [];
          resultLocations.data.locations.forEach((val) => {
            locations.push({ createdAt: val.created_at, orderId: val.order_id, deliveryLocation: val.delivery_location });
          });
          const options = [];
          locations.forEach((value, index) => {
            const obj = {};
            obj.key = index;
            obj.text = value.deliveryLocation;
            obj.value = index;
            options.push(obj);
            this.setState({ locations, options });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  componentDidMount() {
    this.loadLocations();
  }

  render() {
    const { value, enterLocation, options } = this.state;
    const { calculateDeliveryFee } = this.props;

    return (
      <>
        <Header as="h3"> Delivery Location</Header>
        <Button style={{ marginTop: '25px', marginBottom: '25px' }} color="instagram" onClick={() => this.setState({ enterLocation: !enterLocation })} size="medium">
          {
      enterLocation ? 'choose previous Locations' : 'enter new'
    }
        </Button>
        <br/>
        { enterLocation

          ? <Input focus onChange={calculateDeliveryFee} placeholder="Enter  Address" fluid />
          : (
            <Dropdown
              fluid
              onChange={this.handleChange}
              options={options}
              placeholder="Choose a delivery Location"
              selection
              value={value}
            />
          )}
      </>
    );
  }
}

DeliveryForm.propTypes = {
  calculateDeliveryFee: PropTypes.func.isRequired,
};
DeliveryForm.contextType = userContext;
export default DeliveryForm;
