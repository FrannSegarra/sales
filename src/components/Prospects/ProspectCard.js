import ClientDetails from '../Clients/ClientDetails';
import classesName from '../Clients/Client.module.css';
import './ProspectCard.css'

const ClientCard = (props) => {
  const prospectStatus = props.prospect.isQualified() ? 'valid' : 'invalid';

  let message = props.prospect.isQualified()
    ? 'Successfully created'
    : 'Failed: Client is not qualified';
  
  let issueDescription = 'Need a score over 60 to be successful';

  if (props.prospect.issue) {
    message = 'Failed at the validation step';
    issueDescription = props.prospect.issue.message;
  }

  return (
    <div className={classesName.item}>
      <ClientDetails client={props.prospect.client} disableExpand={true}/>
      <div className={'score-section ' + prospectStatus}>
        <h1 className='score'>
          {props.prospect.score}
        </h1>
        <h2 className='score'>Score</h2>
        <label className={prospectStatus} title={issueDescription}>{message}</label>
      </div>
    </div>
  )
}

export default ClientCard;