/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import {
  SUBMIT_QUERY,
  GET_COLLECTIONS,
  COLLECTION_CHANGED,
  PAGE_CHANGED
} from '../actions/const';

const initialState = {
  queryText: '',
  lastQueryText: '',
  modifiedQuery: '',
  isNLQ: false,
  clusters: [],
  docs: [],
  numFound: 0,
  collections: [],
  selectedCollectionId: '',
  isLoading: false,
  page: 1,
  pageSize: 10,
  restCallLogs: [] /* RestCallLogEntry */
};

function reducer(state = initialState, action) {

  const nextState = Object.assign({}, state);

  switch (action.type) {

    case GET_COLLECTIONS:
      {
        if (action.resultJson) {
          nextState.collections = action.resultJson.data.items;
          if (nextState.collections.length > 0) {
            nextState.selectedCollectionId = nextState.collections[0].id;
          }
          nextState.restCallLogs.push(action.logEntry);
          nextState.isLoading = false;
        } else {
          nextState.isLoading = true;
        }
        return nextState;
      }

    case SUBMIT_QUERY:
      {
        nextState.queryText = nextState.lastQueryText = action.params.queryText;

        if (action.params.isNLQ) {
          nextState.modifiedQuery = action.params.modifiedQuery;
          nextState.isNLQ = true;
        } else if (action.params.isNLQ === false) {
          nextState.isNLQ = false;
        }

        if (action.params.clusterJson) {
          nextState.clusters = action.params.clusterJson.data.clusters;
        }

        if (action.params.logEntry) {
          nextState.restCallLogs.push(action.params.logEntry);
        }

        if (action.params.resultJson) {
          nextState.docs = action.params.resultJson.data.response.docs;
          const highlighting = action.params.resultJson.data.highlighting;

          nextState.docs.map((aDoc) => {
            const doc = aDoc;
            doc._highlights_ = [];
            if (highlighting[aDoc.id]) {
              doc._highlights_ = highlighting[aDoc.id].body;
            }

            doc._clusters_ = [];
            nextState.clusters.forEach((aCluster) => {
              if (aCluster.docs.includes(doc.id)) {
                doc._clusters_.push(aCluster);
              }
            });
          });
          nextState.numFound = action.params.resultJson.data.response.numFound;
          nextState.isLoading = false;
        } else {
          nextState.isLoading = true;
        }
        return nextState;
      }

    case COLLECTION_CHANGED:
      {
        nextState.selectedCollectionId = action.collectionId;
        nextState.docs = [];
        nextState.queryText = '';
        nextState.numFound = 0;
        nextState.page = 1;
        return nextState;
      }

    case PAGE_CHANGED:
      {
        nextState.pageSize = action.pageParam.pageSize;
        nextState.page = action.pageParam.page;

        return nextState;
      }

    default:
      {
        return state;
      }
  }
}

module.exports = reducer;
