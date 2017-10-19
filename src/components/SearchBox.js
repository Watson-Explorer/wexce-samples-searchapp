/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import React from 'react';
import { Checkbox, Search, Dropdown, DropdownItem, Button } from 'carbon-components-react';

import './searchbox.scss';

class SearchBox extends React.Component {

  constructor() {
    super();
    this.state = { text: '', isNLQ: false, isDebugRest: false };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onCollectionChange = this.onCollectionChange.bind(this);
    this.onNLQChange = this.onNLQChange.bind(this);
    this.onDebugRestChange = this.onDebugRestChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  onKeyPress(evt) {
    const selectedCollectionId = this.props.selectedCollectionId;
    if (evt.charCode === 13) {
      this.submitSearch();
    }
  }

  onCollectionChange(evt) {
    const colId = evt.value;
    this.props.actions.CollectionChanged(colId);
  }

  onNLQChange(checked) {
    this.setState({ isNLQ: checked });
  }

  onDebugRestChange(checked) {
    this.setState({ isDebugRest: checked });
  }

  submitSearch() {
    const newSearchContext = Object.assign({}, this.props.SearchContext);
    newSearchContext.queryText = this.state.text;
    newSearchContext.isNLQ = this.state.isNLQ;

    this.props.actions.SubmitQuery(newSearchContext);
  }

  render() {
    const collections = (this.props.SearchContext && this.props.SearchContext.collections) || [];
    const selected = (this.props.SearchContext && this.props.SearchContext.selectedCollectionId) || '';
    const isNLQ = this.props.SearchContext && this.props.SearchContext.isNLQ;
    const queryText = (this.props.SearchContext && this.props.SearchContext.queryText) || '';

    return (
      <div className="searchbox-component">
        <div className="searchbox-search-part">
          {collections.length > 0 ?
            <Dropdown
              className="collection-dropdown"
              defaultText="Choose collection"
              onChange={this.onCollectionChange}
              value={selected}
            >
              {
                collections.map(col =>
                  (<DropdownItem itemText={col.name} value={col.id} key={col.id} />)
                )

              }

            </Dropdown>
            :
            <div className="collection-dropdown">No collection found.</div>
          }

          <div className="search-textbox">
            <div className="search-textbox-top">
              <Search
                labelText="Search"
                placeHolderText="Enter search query"
                onChange={evt => this.setState({ text: evt.target.value })}
                onKeyPress={this.onKeyPress} />

              <Button className="search-button" onClick={this.submitSearch}>Search</Button>
            </div>

            {isNLQ ?
              <div className="nlq-modified-query">
                Submitted query is &quot;{queryText}&quot;
            </div>
              :
              ''
            }

          </div>

          <div className="checkboxes">
            <Checkbox
              id="nlq-checkbox"
              className="nlq-checkbox"
              labelText="Query with natural language"
              checked={this.state.isNLQ}
              onChange={this.onNLQChange} />

            <Checkbox
              id="debug-checkbox"
              className="debug-checkbox"
              labelText="Display debug outputs of REST calls"
              checked={this.state.isDebugRest}
              onChange={this.onDebugRestChange} />
          </div>
        </div>

        {this.state.isDebugRest &&
          <div className="searchbox-debug-outputs">
            {
              this.props.SearchContext.restCallLogs.map(entry =>
                (
                  <div>
                    <div>---------------------------</div>
                    <div>{entry.method}: {entry.url}</div>
                    <div>Request params: {entry.request}</div>
                    <div>Response JSON: {entry.response}</div>
                  </div>
                )
              )
            }

          </div>
        }
      </div>
    );
  }
}

SearchBox.displayName = 'SearchBox';
SearchBox.propTypes = {
  actions: React.PropTypes.shape({ SubmitQuery: React.PropTypes.func, CollectionChanged: React.PropTypes.func }),
  selectedCollectionId: React.PropTypes.string,
  collections: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  SearchContext: React.PropTypes.shape({
    collections: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    selectedCollectionId: React.PropTypes.string,
    isNLQ: React.PropTypes.bool,
    queryText: React.PropTypes.string,
    restCallLogs: React.PropTypes.arrayOf(React.PropTypes.shape({}))
  })
};
SearchBox.defaultProps = {};

export default SearchBox;
