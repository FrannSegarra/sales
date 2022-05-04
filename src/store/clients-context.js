import React from 'react';

const ClientsContext = React.createContext({
  clients: [],
  prospects: [],
  addClient: (client) => {},
  updateClient: (client) => {},
  removeClient: (id) => {},
  addProspect: (prospect) => {},
  removeProspect: (id) => {},
  clearProspects: () => {},
});

export default ClientsContext;