/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import {
  PAGE_CHANGED
} from './const';

function action(pageParam) {
  return {
    type: PAGE_CHANGED,
    pageParam
  };
}

module.exports = action;
