import React from 'react';

const ClientsContext = React.createContext({
  clients: [],
  prospects: [],
  addClient: (client) => {},
  removeClient: (id) => {},
  addProspect: (prospect) => {},
  removeProspect: (id) => {},
  clearProspects: () => {},
});

export default ClientsContext;