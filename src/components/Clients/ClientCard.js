import classesName from './Client.module.css';

const ClientCard = (props) => {
  return (
    <div className={classesName.item}>
      <h1>{props.client.firstName} {props.client.lastName}</h1>
      <label>{props.client.email}</label>
    </div>
  )
}

export default ClientCard;