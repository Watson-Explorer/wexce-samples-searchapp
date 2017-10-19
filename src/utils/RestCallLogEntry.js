/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
export default class RestCallLogEntry {

  constructor(url, method, requestParams, responseJson) {
    this.url = url;
    this.method = method || 'GET';
    this.requestParams = requestParams || {};
    this.responseJson = responseJson || {};
  }

  get request() {
    return JSON.stringify(this.requestParams);
  }

  set request(json) {
    this.requestParams = json;
  }

  set response(json) {
    this.responseJson = json;
  }

  get response() {
    return JSON.stringify(this.responseJson);
  }
}
