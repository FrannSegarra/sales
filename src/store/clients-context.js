import React from 'react';

const ClientsContext = React.createContext({
  clients: [],
  prospects: [],
  addClient: (client) => {},
  removeClient: (id) => {},
  removeProspect: (id) => {},
  validateClient: (client) => {},
});

export default ClientsContext;