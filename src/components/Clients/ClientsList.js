import { useContext, Fragment, useState } from 'react';
import ClientsContext from '../../store/clients-context';
import ClientCard from './ClientCard';
import classesName from './Client.module.css';
import ClientModal from './ClientModal';

const ClientsList = () => {
  const [showClientModal, setShowClientModal] = useState(false);
  const clientCtx = useContext(ClientsContext);

  const onNewClientHandler = () => {
    setShowClientModal(true);
  };

  const onCloseNewClientHandler = () => {
    setShowClientModal(false);
  };

  return (
    <Fragment>
      { showClientModal && <ClientModal onClose={onCloseNewClientHandler}/> }
      <div className={classesName.list}>
      <h1 className={classesName.listName}>
        Clients
        <button className={classesName.titleButton} onClick={onNewClientHandler}>New Client</button>
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