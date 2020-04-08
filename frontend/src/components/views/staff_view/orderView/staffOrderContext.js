import React from 'react';

const staffOrderContext = React.createContext({
  orders: [],
  preparingOrders: [],
  deliveringOrders: [],
  completedOrders: [],
}); // Create a context object

export default staffOrderContext; // Export it so it can be used by other Components
