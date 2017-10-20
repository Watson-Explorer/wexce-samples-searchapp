/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import axios from 'axios';
import querystring from 'querystring';

import {
  SUBMIT_QUERY
} from './const';
import RestCallLogEntry from '../utils/RestCallLogEntry';

const baseUrl = '/samples/search/main/api/v1/explore';

export const STATUS = {
  start: 'start',
  success: 'success',
  error: 'error'
};

function submitQuery(status, params) { /* params = {queryText, resultJson, clusterJson, errorJson} */
  return {
    type: SUBMIT_QUERY,
    status,
    params
  };
}

export default function createSubmitQueryAction(searchContext) {
  return (dispatch) => {
    const {
      queryText,
      lastQueryText,
      selectedCollectionId,
      page,
      pageSize
    } = searchContext;
    const start = queryText === lastQueryText ? (page - 1) * pageSize : 0;

    const selectWithQuery = (paramQueryText) => {
      const selectUrl = `${baseUrl}/${selectedCollectionId}/query`;
      const params = {
        wt: 'json',
        q: paramQueryText,
        start,
        rows: pageSize
      };
      const config = {
        responseType: 'json'
      };
      axios.post(selectUrl, querystring.stringify(params), config)
        .then((response) => {
          const logEntry = new RestCallLogEntry(selectUrl, 'POST', params, response.data);
          const docs = response.data.response.docs;

          const dParams = [];
          docs.map(doc => dParams.push({
            id: doc.id,
            title: doc.title,
            snippet: doc.body[0]
          }));

          axios.post(`${baseUrl}/dclustering`, dParams, config)
            .then(dResp => dispatch(submitQuery(STATUS.success, {
              queryText: paramQueryText,
              resultJson: response,
              clusterJson: dResp,
              logEntry
            })))
            .catch(error => dispatch(submitQuery(STATUS.success, {
              queryText: paramQueryText,
              resultJson: response
            })));
        })
        .catch(errorJson => dispatch(submitQuery(STATUS.error, {
          paramQueryText,
          errorJson
        })));
    };


    if (searchContext.isNLQ) {

      const querymodifierUrl = `${baseUrl}/${selectedCollectionId}/querymodifier`;
      const params = {
        wt: 'json',
        q: queryText,
        start,
        rows: pageSize
      };
      const config = {
        responseType: 'json'
      };
      axios.post(querymodifierUrl, querystring.stringify(params), config)
        .then((response) => {
          const modifiedQuery = response.data.analysis.modified_query.query_modifier;
          dispatch(submitQuery(STATUS.start, {
            queryText,
            modifiedQuery,
            isNLQ: true
          }));
          selectWithQuery(modifiedQuery);
        })
        .catch(errorJson => dispatch(submitQuery(STATUS.error, {
          queryText,
          errorJson
        })));

    } else {
      dispatch(submitQuery(STATUS.start, {
        queryText,
        isNLQ: false
      }));

      selectWithQuery(queryText);
    }

  };
}
