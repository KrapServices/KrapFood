import React from 'react';
import Proptypes, { string } from 'prop-types';
import { Input, Header, Dropdown } from 'semantic-ui-react';
import userContext from '../../../../../userContext';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerPromotions: [],
      options: [],
      value: '',
    };

    this.handleChange = (e, { value }) => {
      const { setPromotions } = this.props;
      // -----------------------------------------------------------------------
      // 0 because only one.
      // -----------------------------------------------------------------------
      setPromotions(value, 0);
      const { customerPromotions } = this.state;
      setPromotions(customerPromotions[value]);
      this.setState({ value });
    };
    /*
    this.getPromoCodes = async () => {
      try {
        const resultPromo = await Axios.get(`${config.localhost}customers/promotions/`);
        if (resultPromo.status === 200) {
          this.setState({ promoCodes: resultPromo.data.promotions });
        }
      } catch (error) {
        //  console.log(error);
        alert('User does not have a credit card preregistered!');
      }
    }; */
    this.getDropDown = () => {
      const { promotions } = this.props;
      const options = [];
      promotions.forEach((value, index) => {
        const obj = {};
        obj.key = index;
        obj.text = value.card_number;
        obj.value = index;
        options.push(obj);
      });
      this.setState({ customerPromotions: promotions, options });
    };
  }

  componentDidMount() {
    this.getDropDown();
  }


  render() {
    const { value, options } = this.state;

    return (
      <>
        <Header as="h2">Promo code</Header>

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
Promotions.propTypes = {
  setPromotions: Proptypes.func.isRequired,
  promotions: Proptypes.arrayOf(string).isRequired,
};
Promotions.contextType = userContext;
export default Promotions;
