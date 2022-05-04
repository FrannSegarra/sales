import { Fragment, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import ClientDetails from './ClientDetails';
import classesName from './Client.module.css';
import ClientsContext from '../../store/clients-context';
import useNationalSystem from '../../hooks/use-national-system';
import useQualificationSystem from '../../hooks/qualification-system';
import { Prospect } from '../../models/prospect.model';
import ClientModal from './ClientModal';

const ClientCard = (props) => {
  const clientCtx = useContext(ClientsContext);
  const {isLoading: nationalSystemLoading, response: nationalSystemResponse, error, validateClient} = useNationalSystem();
  const {isLoading: internalSystemLoading, response: internalSystemResponse, validateScore} = useQualificationSystem();
  const [showClientModal, setShowClientModal] = useState(false);

  const onCloseEditClientHandler = () => {
    setShowClientModal(false);
  };

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
  }, [internalSystemResponse, props.client, clientCtx])

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
  }, [error, props.client, clientCtx]);

  const onValidateHandler = () => {
    validateClient(props.client);
  };

  const onUpdateHandler = () => {
    setShowClientModal(true);
  };

  const onDeleteHandler = () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      clientCtx.removeClient(props.client.id);
    }
  };

  const defaultValues = {
    firstName: props.client.firstName,
    lastName: props.client.lastName,
    email: props.client.email,
    birthdate: props.client.birthdate.toJSON().slice(0, 10),
    id: props.client.id
  };

  return (
    <div className={classesName.item}>
      { showClientModal && <ClientModal defaultValues={defaultValues} onClose={onCloseEditClientHandler}/> }
      <ClientDetails allowEdition={true} client={props.client}/>
      <div className={classesName.actions}>
        { 
          (nationalSystemLoading || internalSystemLoading)
          ? (<FontAwesomeIcon icon={faSpinner} spin/>)
          : (<Fragment>
            <button onClick={onValidateHandler}>Validate</button>
            <button onClick={onUpdateHandler}>Update</button>
            <button onClick={onDeleteHandler} className={classesName.danger}>Delete</button>
          </Fragment>)
        }
      </div>
    </div>
  )
}

export default ClientCard;