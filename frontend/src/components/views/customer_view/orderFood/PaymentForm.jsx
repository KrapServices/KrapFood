import React from 'react';
import Axios from 'axios';
import Cards from 'react-credit-cards';
import { Header, Dropdown } from 'semantic-ui-react';
import config from '../../../../config.json';
import 'react-credit-cards/es/styles-compiled.css';
import userContext from '../../../../userContext';

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCreditCards: [],
      options: [],
      value: '',
    };

    this.handleChange = (e, { value }) => {
      const { setCard } = this.props;
      const { customerCreditCards } = this.state;
      setCard(customerCreditCards[value]);
      this.setState({ value });
    };
    this.getCard = async () => {
      const { user } = this.context;
      const { customer_id } = user;
      try {
        const resultCC = await Axios.get(`${config.localhost}customers/cc/${customer_id}`);
        if (resultCC.status === 200) {
          console.log(resultCC.data);
          const options = [];
          resultCC.data.cards.forEach((value, index) => {
            const obj = {};
            obj.key = index;
            obj.text = value.card_number;
            obj.value = index;
            options.push(obj);
          });
          this.setState({ customerCreditCards: resultCC.data.cards, options });
        }
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
      customerCreditCards, value, options } = this.state;

    return (
      <>
        <Dropdown
        fluid
          onChange={this.handleChange}
          options={options}
          placeholder="Choose a Credit Card"
          selection
          value={value}
        />
      </>
    );
  }
}

PaymentForm.contextType = userContext;
export default PaymentForm;
