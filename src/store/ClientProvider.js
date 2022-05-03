import { useReducer } from 'react';
import { Client } from '../models/client.model';
import { Prospect } from '../models/prospect.model';

import ClientsContext from './clients-context';

const dummyClientData = {
  id: 39597600,
  birthdate: new Date(),
  firstName: 'Francisco',
  lastName: 'Segarra',
  email: 'franciscosegarra@hotmail.com'
};

const dummyProspectData = {
  id: 1,
  client: new Client(dummyClientData),
  score: 50
};

const dummyProspectData2 = {
  id: 2,
  client: new Client(dummyClientData),
  score: 70
};

const defaultState = {
  clients: [
    new Client(dummyClientData)
  ],
  prospects: [
    new Prospect(dummyProspectData), new Prospect(dummyProspectData2)
  ]
}

const clientsReducer = (state, action) => {
  if (action.type === 'ADD_CLIENT') {
    let existingClient = state.clients.find(
      (client) => client.id === action.client.id 
    );
    
    if (existingClient) {
      throw new Error('The client already exists.');
    } else {
      return {
        clients: [action.client, ...state.clients],
        prospects: state.prospects
      }
    }
  }

  if (action.type === 'REMOVE_CLIENT') {
    return {
      clients: state.clients.filter((client) => client.id !== action.id),
      prospects: state.prospects
    }
  }

  if (action.type === 'ADD_PROSPECT') {
    let existingProspect = state.prospects.find(
      (prospect) => prospect.id === action.prospect.id 
    );
    
    if (existingProspect) {
      throw new Error('The Prospect already exists.');
    } else {
      return {
        clients: state.clients,
        prospects: [action.prospect, ...state.prospects]
      }
    }
  }

  if (action.type === 'REMOVE_PROSPECT') {
    return {
      clients: state.clients,
      prospects: state.prospects.filter((prospect) => prospect.id !== action.id)
    }
  }

  if (action.type === 'CLEAR_PROSPECTS') {
    return {
      clients: state.clients,
      prospects: []
    }
  }

  return defaultState;
}

const ClientProvider = (props) => {
  const [clientState, dispatchClientAction] = useReducer(clientsReducer, defaultState);

  const addClientHandler = (client) => {
    dispatchClientAction({ type: 'ADD_CLIENT', client: client });
  }

  const removeClientHandler = (id) => {
    dispatchClientAction({ type: 'REMOVE_CLIENT', id: id });
  }

  const addProspectHandler = (prospect) => {
    dispatchClientAction({ type: 'ADD_PROSPECT', prospect: prospect });
  }

  const removeProspectHandler = (id) => {
    dispatchClientAction({ type: 'REMOVE_PROSPECT', id: id });
  }

  const clearProspectsHandler = () => {
    dispatchClientAction({ type: 'CLEAR_PROSPECTS' });
  }

  const clientsContext = {
    clients: clientState.clients,
    prospects: clientState.prospects,
    addClient: addClientHandler,
    removeClient: removeClientHandler,
    addProspect: addProspectHandler,
    removeProspect: removeProspectHandler,
    clearProspects: clearProspectsHandler
  };

  return (
    <ClientsContext.Provider value={clientsContext}>
      {props.children}
    </ClientsContext.Provider>
  );
}

export default ClientProvider;