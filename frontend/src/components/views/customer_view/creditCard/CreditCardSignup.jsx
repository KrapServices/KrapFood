import React from 'react';
import Axios from 'axios';
import Cards from 'react-credit-cards';
import { Header, Button } from 'semantic-ui-react';
import config from '../../../../config.json';
import 'react-credit-cards/es/styles-compiled.css';
import userContext from '../../../../userContext';


class CreditCardSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: '',
      expiry: '',
      name: '',
      number: '',
    };


    this.handleInputFocus = (e) => {
      this.setState({ focus: e.target.name });
    };

    this.handleInputChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    this.createCard = async () => {
      const { name, number, expiry } = this.state;
      const { user } = this.context;
      const { customer_id } = user;
      console.log(name);
      console.log(number);
      try {
        const result = await Axios.post(
          `${config.localhost}customers/cc/`,
          {
            nameCard: name,
            expiry,
            cardNumber: number,
            customerId: customer_id,
          },
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
      } catch (error) {
        //  console.log(error);
        alert('User does not have a credit card preregistered!');
      }
    };
  }

  render() {
    const {
      cvc, expiry, focus, name, number,
    } = this.state;
    return (
      <div id="CreditCardSignUp">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focus={focus}
          name={name}
          number={number}
        />
        <form>
          <Header as="h2">CC Number</Header>
          <input
            maxLength="16"
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br />
          <Header as="h2">Enter Name</Header>
          <input
            maxLength="25"
            type="tel"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br />
          <Header as="h2">Enter Expiry Date</Header>
          <input
            maxLength="4"
            type="tel"
            name="expiry"
            value={expiry}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br />
        </form>
        <br />
        <Button color="green" onClick={this.createCard}>Create Card</Button>

      </div>

    );
  }
}

CreditCardSignUp.contextType = userContext;
export default CreditCardSignUp;
