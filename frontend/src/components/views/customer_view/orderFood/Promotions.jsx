import React from 'react';
import Axios from 'axios';
import Cards from 'react-credit-cards';
import { Header, Dropdown, Input } from 'semantic-ui-react';
import config from '../../../../config.json';
import 'react-credit-cards/es/styles-compiled.css';
import userContext from '../../../../userContext';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCodes: [],
    };

    this.handleChange = (e, { value }) => {
      const { setPromotions } = this.props;
      // -----------------------------------------------------------------------
      // 0 because only one.
      // -----------------------------------------------------------------------
      setPromotions(value, 0);
    };
    this.getPromoCodes = async () => {
      const { user } = this.context;
      const { customer_id } = user;
      try {
        const resultPromo = await Axios.get(`${config.localhost}customers/promotions/`);
        if (resultPromo.status === 200) {
          this.setState({ promoCodes: resultPromo.data.promotions });
        }
      } catch (error) {
        //  console.log(error);
        alert('User does not have a credit card preregistered!');
      }
    };
  }

  componentDidMount() {
    this.getPromoCodes();
  }


  render() {
    const { promoCodes } = this.state;
    const { promotions, setPromotions } = this.props;

    return (
      <>
        <br />
        {
          promotions.map((x) => <Input  labelPosition='left' label="Promo Code" onChange={this.handleChange} fluid placeholder="enter promo code" />)
      }
        <br />


      </>
    );
  }
}

Promotions.contextType = userContext;
export default Promotions;
