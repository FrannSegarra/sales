import { useReducer } from 'react';
import { Client } from '../models/client.model';

import ClientsContext from './clients-context';

const dummyClientData = {
  id: 1,
  birthdate: new Date(),
  firstName: 'Francisco',
  lastName: 'Segarra',
  email: 'franciscosegarra@hotmail.com'
};

const defaultState = {
  clients: [new Client(dummyClientData), new Client(dummyClientData), new Client(dummyClientData)],
  prospects: [new Client(dummyClientData), new Client(dummyClientData), new Client(dummyClientData)]
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
        clients: [...state.clients, action.client],
        prospects: state.prospects
      }
    }
  }

  if (action.type === 'REMOVE_CLIENT') {
    return {
      clients: state.clients.filter((client) => client !== action.id),
      prospects: state.prospects
    }
  }

  if (action.type === 'REMOVE_PROSPECT') {
    return {
      clients: state.clients,
      prospects: state.prospects.filter((prospect) => prospect !== action.id)
    }
  }

  if (action.type === 'VALIDATE_CLIENT') {
    // TODO validacion del cliente para pasar a prospect

    return {
      clients: state.clients,
      prospects: state.prospects
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

  const removeProspectHandler = (id) => {
    dispatchClientAction({ type: 'REMOVE_PROSPECT', id: id });
  }

  const validateClientHandler = (id) => {
    dispatchClientAction({ type: 'VALIDATE_CLIENT', id: id });
  }

  const clientsContext = {
    clients: clientState.clients,
    prospects: clientState.prospects,
    addClient: addClientHandler,
    removeClient: removeClientHandler,
    removeProspect: removeProspectHandler,
    validateClient: validateClientHandler
  };

  return (
    <ClientsContext.Provider value={clientsContext}>
      {props.children}
    </ClientsContext.Provider>
  );
}

export default ClientProvider;