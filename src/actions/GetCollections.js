/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import axios from 'axios';
import querystring from 'querystring';
import RestCallLogEntry from '../utils/RestCallLogEntry';

import {
  GET_COLLECTIONS
} from './const';

const baseUrl = '/samples/search/main/wex/api/v1';
export const STATUS = {
  start: 'start',
  success: 'success',
  error: 'error'
};

function getCollections(status, resultJson, logEntry) {
  return {
    type: GET_COLLECTIONS,
    status,
    resultJson,
    logEntry
  };
}

export default function createGetCollectionsAction() {
  return (dispatch) => {
    dispatch(getCollections(STATUS.start));

    const collectionsUrl = `${baseUrl}/collections`;
    const params = {};
    const config = {
      responseType: 'json'
    };
    axios.get(collectionsUrl, querystring.stringify(params), config)
      .then((response) => {
        const logEntry = new RestCallLogEntry(collectionsUrl, 'GET', params, response.data);
        dispatch(getCollections(STATUS.success, response, logEntry));
      })
      .catch(error => dispatch(getCollections(STATUS.error, error)));
  };
}
