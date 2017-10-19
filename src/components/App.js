/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import React from 'react';
import { Loading } from 'carbon-components-react';
import 'carbon-components/scss/globals/scss/styles.scss';

import SearchBox from './SearchBox';
import ResultInfo from './ResultInfo';
import Results from './Results';
import './app.scss';


class AppComponent extends React.Component {

  componentWillMount() {
    if (this.props.actions) this.props.actions.GetCollections();
  }

  render() {
    const isLoading = (this.props.SearchContext && this.props.SearchContext.isLoading) || false;

    return (
      <div className="index">

        <SearchBox
          actions={this.props.actions}
          SearchContext={this.props.SearchContext}
        />

        <ResultInfo actions={this.props.actions} SearchContext={this.props.SearchContext} />

        <Results SearchContext={this.props.SearchContext} />

        {isLoading &&
          <Loading />
        }

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

AppComponent.propTypes = {
  actions: React.PropTypes.shape({
    GetCollections: React.PropTypes.func
  }),
  SearchContext: React.PropTypes.shape({
    isLoading: React.PropTypes.bool,
    collections: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    selectedCollectionId: React.PropTypes.string,
    numFound: React.PropTypes.number,
    docs: React.PropTypes.arrayOf(React.PropTypes.shape({}))
  })
};

export default AppComponent;
