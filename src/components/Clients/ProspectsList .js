import { useContext, Fragment } from 'react';
import ClientsContext from '../../store/clients-context';
import ClientCard from './ClientCard';
import classesName from './Client.module.css';

const ProspectsList = () => {
  const clientCtx = useContext(ClientsContext);

  return (
    <Fragment>
      <div className={classesName.list}>
      <h1 className={classesName.listName}>Prospects</h1>
        {clientCtx.prospects.map((prospect) => (
          <ClientCard
            key={prospect.id}
            client={prospect}
          />
        ))}
      </div>
    </Fragment>
  )
}

export default ProspectsList;