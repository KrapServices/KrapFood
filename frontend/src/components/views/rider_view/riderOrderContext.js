import React from 'react';

const riderOrderContext = React.createContext({
  orders: [],
  deliveringOrders: [],
  completedOrders: [],
}); // Create a context object

export default riderOrderContext; // Export it so it can be used by other Components
