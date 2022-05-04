import { useContext, useRef } from 'react';
import { Client } from '../../models/client.model';
import ClientsContext from '../../store/clients-context';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import classesName from './Client.module.css';

const ClientModal = (props) => {
  const clientCtx = useContext(ClientsContext);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const birthdateRef = useRef();
  const nationalIdRef = useRef();

  const isCreating = () => {
    return !props.defaultValues
  };

  const getDefaultValueFor = (attribute) => {
    if (isCreating()) {
      return ''
    } else {
      return props.defaultValues[attribute];
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      birthdate: new Date(birthdateRef.current.value),
      id: nationalIdRef.current.value
    }

    if (
      data.firstName.length > 1 &&
      data.lastName.length > 1 &&
      // TODO Improve email validations with REGEX
      (data.email.includes('@') && data.email.length > 1) &&
      data.birthdate.toString() !== 'Invalid Date' &&
      data.id.length > 1
    ) {
      if (isCreating()) {
        clientCtx.addClient(new Client(data));
      } else {
        clientCtx.updateClient(new Client(data));
      }
      props.onClose();
    } else {
      window.alert('Failed: invalid data for creating a client');
    }
  };

  const closeHandler = () => {
    if (
      window.confirm(
        `Are you sure you want to cancel the client ${isCreating() ? 'creation' : 'edition'}?, unsaved changes will be lost`
      )
    ) {
      props.onClose();        
    }
  }

  const cancelClass = `${classesName.titleButton} ${classesName.danger}`

  return <Modal onClose={closeHandler}>
    <div>
      <h1 className={classesName.modalTitle}>{isCreating() ? 'Create' : 'Update'} Client</h1>
    </div>
    <form className={classesName.form} onSubmit={submitHandler}>
      <Input
        ref={firstNameRef}
        label='First Name'
        input={{
          id: 'firstName',
          defaultValue: getDefaultValueFor('firstName'),
          type: 'text',
          min: '1',
          placeholder: 'First Name'
        }}
      />
      <Input
        ref={lastNameRef}
        label='Last Name'
        input={{
          id: 'lastName',
          defaultValue: getDefaultValueFor('lastName'),
          type: 'text',
          min: '1',
          placeholder: 'Last Name'
        }}
      />
      <Input
        ref={emailRef}
        label='Email'
        input={{
          id: 'email',
          defaultValue: getDefaultValueFor('email'),
          type: 'text',
          min: '1',
          placeholder: 'example@mail.com'
        }}
      />
      <Input
        ref={birthdateRef}
        label='Birthdate'
        input={{
          id: 'birthdate',
          defaultValue: getDefaultValueFor('birthdate'),
          type: 'date',
          placeholder: 'Birthdate'
        }}
      />
      <Input
        ref={nationalIdRef}
        label='National Identification number'
        input={{
          id: 'nationalId',
          defaultValue: getDefaultValueFor('id'),
          type: 'number',
          min: '1'
        }}
      />
      <div className={classesName.formActions}>
        <button className={classesName.titleButton}>Create</button>
        <button className={cancelClass} onClick={closeHandler}>Cancel</button>
      </div>
    </form>
  </Modal>
};

export default ClientModal;