export class Prospect {
  _client;
  _score;

  get client() {
    return this._client;
  }

  get score() {
    return this._score;
  }

  constructor(data) {
    this._client = data.client;
    this._score = data.score;
  }

  isQualified() {
    return this.score > 60;
  }
}
