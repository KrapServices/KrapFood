import React, { Component } from "react";
import userContext from "../../../userContext";

class Customer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <p>I am a customer</p>;
  }
}

Customer.contextType = userContext;
export default Customer;
