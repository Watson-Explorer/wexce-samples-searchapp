/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import PageChanged from '../actions/PageChanged.js';
import CollectionChanged from '../actions/CollectionChanged.js';
import GetCollections from '../actions/GetCollections.js';
import SubmitQuery from '../actions/SubmitQuery.js';
const actions = {
  SubmitQuery,
  GetCollections,
  CollectionChanged,
  PageChanged
};
module.exports = actions;
