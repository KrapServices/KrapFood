import React from 'react';
import Axios from 'axios';
import Cards from 'react-credit-cards';
import { Header } from 'semantic-ui-react';
import config from '../../../../config.json';
import 'react-credit-cards/es/styles-compiled.css';
import userContext from '../../../../userContext';

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
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

    this.getCard = async () => {
      const { user } = this.context;
      const { name } = user;
      try {
        const result = await Axios.get(
          `${config.localhost}customers/cc/${user.customer_id}`,
          {
            headers: { 'Access-Control-Allow-Origin': true },
          },
        );
        console.log(result);
        this.setState({ name, number: result.data.cardNumber.card_number });
      } catch (error) {
        //  console.log(error);
        alert('User does not have a credit card preregistered!');
      }
    };
  }

  componentDidMount() {
    this.getCard();
  }


  render() {
    const {
      cvc, expiry, focus, name, number,
    } = this.state;
    return (
      <div id="PaymentForm">
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
          <Header as="h2">Enter CVC</Header>
          <input
            maxLength="3"
            type="tel"
            name="cvc"
            value={cvc}
            placeholder="Enter cvc"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

        </form>
      </div>
    );
  }
}

PaymentForm.contextType = userContext;
export default PaymentForm;
