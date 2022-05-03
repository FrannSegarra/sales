import { useContext, Fragment } from 'react';
import ClientsContext from '../../store/clients-context';
import ClientCard from './ClientCard';
import classesName from './Client.module.css';

const ClientsList = () => {
  const clientCtx = useContext(ClientsContext);

  return (
    <Fragment>
      <div className={classesName.list}>
      <h1 className={classesName.listName}>
        Clients
        <button className={classesName.titleButton}>New Client</button>
      </h1>
        <div className={classesName.listBody}>
          {clientCtx.clients.length === 0 && (
            <label className={classesName.noItems}>There are no clients, please try to create one.</label>
          )}
          {clientCtx.clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
            />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default ClientsList;