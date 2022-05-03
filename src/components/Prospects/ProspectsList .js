import { useContext, Fragment } from 'react';
import ClientsContext from '../../store/clients-context';
import ProspectCard from '../Prospects/ProspectCard';
import classesName from '../Clients/Client.module.css';
import './ProspectCard.css'

const ProspectsList = () => {
  const clientCtx = useContext(ClientsContext);

  const onClearHandler = () => {
    if (window.confirm('Are you sure you want to delete all prospect notifications?')) {
      clientCtx.clearProspects();
    }
  }

  return (
    <Fragment>
      <div className={classesName.list}>
        <h1 className={classesName.listName}>
          Prospects
          <button onClick={onClearHandler} className={classesName.titleButton} disabled={clientCtx.prospects.length === 0}>Clear</button>
        </h1>
        <div className={classesName.listBody}>
          {clientCtx.prospects.length === 0 && (
            <label className={classesName.noItems}>There are no prospects, please try to validate any client.</label>
          )}
          {clientCtx.prospects.map((prospect) => (
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
            />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default ProspectsList;