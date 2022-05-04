import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Backdrop = (props) => {
  return <div role='backdrop' className="backdrop" onClick={props.onClose}/>
};

const ModalOverlay = (props) => {
  return (
    <div role='modal' className="modal">
      <div className="modal-content">{props.children}</div>
    </div>
  )
};

const portal = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </Fragment>
  )
};

export default Modal;