import React from 'react';

const customerOrderContext = React.createContext({
  orders: [],
  preparingOrders: [],
  deliveringOrders: [],
  completedOrders: [],
  loadOrder: () => {},
}); // Create a context object

export default customerOrderContext; // Export it so it can be used by other Components
