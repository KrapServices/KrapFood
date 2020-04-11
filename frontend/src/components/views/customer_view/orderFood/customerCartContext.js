import React from 'react';

const customerCartContext = React.createContext({
  shoppingCart: [],
  selectedRestaurantId: -1,
  addToCart: () => {},
  removeFromCart: () => {},
  closePayment: () => {},
}); // Create a context object

export default customerCartContext; // Export it so it can be used by other Components
