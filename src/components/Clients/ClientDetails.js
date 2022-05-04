import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faBirthdayCake, faIdCard, faCircleMinus, faCirclePlus, faUserCircle, faCircle  } from '@fortawesome/free-solid-svg-icons'

import classesName from './Client.module.css';

const ClientCard = (props) => {
  const [showSecondaryInfo, setShowSecondaryInfo] = useState(true);
  
  const icon = props.disableExpand
    ? (<FontAwesomeIcon icon={faCircle} className={classesName.disabledIconButton}/>)
    : (
      <FontAwesomeIcon
        onClick={() => setShowSecondaryInfo(!showSecondaryInfo)}
        icon={showSecondaryInfo ? faCircleMinus : faCirclePlus}
        className={classesName.iconButton}
        size='lg'
      />
    );

  return (
    <div className={classesName.clientDetails}>
      <h1>
        <FontAwesomeIcon icon={faUserCircle} className={classesName.icon}/> {props.client.firstName} {props.client.lastName + ' '} 
      </h1>
      {
        showSecondaryInfo && 
        <div className={classesName.secondaryInfo}>
          <label><FontAwesomeIcon icon={faEnvelope} className={classesName.icon}/> {props.client.email}</label>
          <label>
            <FontAwesomeIcon icon={faBirthdayCake} className={classesName.icon}/> {props.client.birthdate.toLocaleDateString()}
          </label>
          <label><FontAwesomeIcon icon={faIdCard} className={classesName.icon}/> {props.client.id}</label>
        </div>
      }
      {icon}
    </div>
  )
}

export default ClientCard;