import React from 'react';

const customerCartContext = React.createContext({
  shoppingCart: [],
  addToCart: () => {},
  removeFromCart: () => {},
}); // Create a context object

export default customerCartContext; // Export it so it can be used by other Components
