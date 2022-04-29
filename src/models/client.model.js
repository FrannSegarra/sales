export class Client {
  _id;
  _birthdate;
  _firstName;
  _lastName;
  _email;

  get id() {
    return this._id;
  }

  get birthdate() {
    return this._birthdate;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  constructor(data) {
    this._id = data.id;
    this._birthdate = data.birthdate;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
  }
}
