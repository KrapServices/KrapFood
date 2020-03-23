/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import {
  Segment, Header, Button, Loader,
} from 'semantic-ui-react';
import Axios from 'axios';

export default class GenerateData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
    };

    this.generateData = async () => {
      // const { isloading } = this.state;
      this.setState({ isloading: true });
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 50; i++) {
        const email = `test c${i}`;
        const password = `p${i}`;
        const result = await Axios.post('http://localhost:5000/registrations/customer/sign-up', {
          email,
          password,
        }, {
          headers: { 'Access-Control-Allow-Origin': true },
        });
        console.log(result);

        const emailM = `test M${i}`;
        const passwordM = `p${i}`;
        const resultM = await Axios.post('http://localhost:5000/registrations/manager/sign-up', {
          email: emailM,
          password: passwordM,
        }, {
          headers: { 'Access-Control-Allow-Origin': true },
        });
        console.log(resultM);

        const emailStaff = `test S${i}`;
        const passwordStaff = `p${i}`;
        const resultStaff = await Axios.post('http://localhost:5000/registrations/staff/sign-up', {
          email: emailStaff,
          password: passwordStaff,
        }, {
          headers: { 'Access-Control-Allow-Origin': true },
        });
        console.log(resultStaff);

        const emailRider = `test R${i}`;
        const passwordRider = `p${i}`;
        const resultRider = await Axios.post('http://localhost:5000/registrations/rider/sign-up', {
          email: emailRider,
          password: passwordRider,
        }, {
          headers: { 'Access-Control-Allow-Origin': true },
        });
        console.log(resultRider);

        
      }
      this.setState({ isloading: false });
    };
  }

  render() {
    const { isloading } = this.state;
    return (
      <div>
        {
        isloading ? <Loader inverted />
          : (
            <Segment>
              <Segment.Inline>
                <Header>
                  Generate Data
                </Header>
                <Button primary onClick={this.generateData}>
                  generate data
                </Button>
              </Segment.Inline>
            </Segment>
          )
          }
      </div>
    );
  }
}
