import { Fragment, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import ClientDetails from './ClientDetails';
import classesName from './Client.module.css';
import ClientsContext from '../../store/clients-context';
import useNationalSystem from '../../hooks/use-national-system';
import useQualificationSystem from '../../hooks/qualification-system';
import { Prospect } from '../../models/prospect.model';

const ClientCard = (props) => {
  const clientCtx = useContext(ClientsContext);
  const {isLoading: nationalSystemLoading, response: nationalSystemResponse, error, validateClient} = useNationalSystem();
  const {isLoading: internalSystemLoading, response: internalSystemResponse, validateScore} = useQualificationSystem();

  useEffect(() => {
    if (internalSystemResponse) {
      let newProspect = new Prospect({
        id: props.client.id,
        client: props.client,
        score: internalSystemResponse
      });

      clientCtx.removeClient(props.client.id);
      clientCtx.addProspect(newProspect);
    }
  }, [internalSystemResponse, props.client])

  useEffect(() => {
    if(nationalSystemResponse) {
      validateScore(nationalSystemResponse);
    };
  }, [nationalSystemResponse, validateScore]);

  useEffect(() => {
    if (error) {
      let newProspect = new Prospect({
        id: props.client.id,
        client: props.client,
        score: 0,
        issue: error
      });

      clientCtx.removeClient(props.client.id);
      clientCtx.addProspect(newProspect);
    }
  }, [error, props.client]);

  const onValidateHandler = () => {
    validateClient(props.client);
  };

  const onDeleteHandler = () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      clientCtx.removeClient(props.client.id);
    }
  }

  return (
    <div className={classesName.item}>
      <ClientDetails client={props.client}/>
      <div className={classesName.actions}>
        { 
          (nationalSystemLoading || internalSystemLoading)
          ? (<FontAwesomeIcon icon={faSpinner} spin/>)
          : (<Fragment>
            <button onClick={onValidateHandler}>Validate</button>
            <button onClick={onDeleteHandler} className={classesName.danger}>Delete</button>
          </Fragment>)
        }
      </div>
    </div>
  )
}

export default ClientCard;