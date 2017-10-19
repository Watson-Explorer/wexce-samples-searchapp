/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import {
  COLLECTION_CHANGED
} from './const';

function action(collectionId) {
  return {
    type: COLLECTION_CHANGED,
    collectionId
  };
}

module.exports = action;
