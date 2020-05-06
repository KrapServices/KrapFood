import React from 'react';

const userContext = React.createContext({
  isLoggedIn: false,
  signup: () => {},
  user: {},
  login: () => {},
  logout: () => {},
  handleDelete: () => {},
}); // Create a context object

export default userContext; // Export it so it can be used by other Components
