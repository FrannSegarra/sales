# Sales Challenge

Is basically a sales pipeline where leads could convert
into prospects for a company. In order to convert them into prospects, users have to
start a validation process.

## Clients

Users can create, edit, validate and remove clients from this application.

### Validation process
At the validation process there are two fake methods that simulate an external national system. These two methods
create an observable that returns a random number between 0 and 100, if the result is greater than 30 the validation
will be success, once is success the qualification starts.

### Qualification
Once the client is already validated, there is a fake method to qualificate the client with a score (a random number between 0 and 100), then the prospect is created with the current data.


## Prospects

Users can check the prospect history from every client validation. In this challenge i assume that once a Client is validated if the score is over 60 the prospect is stored in a DB.


## TODO Improves
- Improve the errors handling (Avoid window alerts).
- Disable creation actions when there is a validation running.
- Improve form validations when creating clients.
- Improve form UX, try to help the users to prevent errors instead of just inform them.
- Improve and add unit tests.
- Add animation to some actions.