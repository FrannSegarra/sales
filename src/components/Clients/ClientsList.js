import { useContext, Fragment } from 'react';
import ClientsContext from '../../store/clients-context';
import ClientCard from './ClientCard';
import classesName from './Client.module.css';

const ClientsList = () => {
  const clientCtx = useContext(ClientsContext);

  return (
    <Fragment>
      <div className={classesName.list}>
      <h1 className={classesName.listName}>Clients</h1>
        {clientCtx.clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
          />
        ))}
      </div>
    </Fragment>
  )
}

export default ClientsList;