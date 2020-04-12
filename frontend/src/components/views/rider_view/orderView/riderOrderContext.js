import React from 'react';

const riderOrderContext = React.createContext({
  departToCollectOrders: [],
  arriveToCollectOrders: [],
  departFromRestaurantOrders: [],
  deliveringOrders: [],
  completedOrders: [],
  orders: [],
}); // Create a context object

export default riderOrderContext; // Export it so it can be used by other Components
