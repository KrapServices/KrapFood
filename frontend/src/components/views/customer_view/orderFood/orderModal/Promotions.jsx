import React from 'react';
import Proptypes, { string } from 'prop-types';
import { Input, Header } from 'semantic-ui-react';
import userContext from '../../../../../userContext';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = (e, { value }) => {
      const { setPromotions } = this.props;
      // -----------------------------------------------------------------------
      // 0 because only one.
      // -----------------------------------------------------------------------
      setPromotions(value, 0);
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
  }

  componentDidMount() {
    // this.getPromoCodes();
  }


  render() {
    const { promotions } = this.props;

    return (
      <>
        <Header as="h2">Promo code</Header>
        <br />
        {
          promotions.map((x) => <Input key={x} labelPosition="left" label="Promo Code" onChange={this.handleChange} fluid placeholder="enter promo code" />)
      }
        <br />


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
