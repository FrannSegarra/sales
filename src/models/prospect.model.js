export class Prospect {
  _id;
  _client;
  _score;
  _issue;

  get id() {
    return this._id;
  }

  get client() {
    return this._client;
  }

  get score() {
    return this._score;
  }

  get issue() {
    return this._issue;
  }

  constructor(data) {
    this._id = data.id;
    this._client = data.client;
    this._score = data.score;
    this._issue = data.issue;
  }

  isQualified() {
    return this.score > 60;
  }
}
