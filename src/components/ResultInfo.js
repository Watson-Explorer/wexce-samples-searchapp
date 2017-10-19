/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import React from 'react';
import { Pagination } from 'carbon-components-react';
import './resultinfo.scss';

class ResultInfo extends React.Component {

  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageParam) {
    this.props.actions.PageChanged(pageParam);
    const newSearchContext = Object.assign({}, this.props.SearchContext);
    newSearchContext.page = pageParam.page;
    newSearchContext.pageSize = pageParam.pageSize;

    this.props.actions.SubmitQuery(newSearchContext);
  }

  render() {
    const pageSize = (this.props.SearchContext && this.props.SearchContext.pageSize) || 10;
    const page = (this.props.SearchContext && this.props.SearchContext.page) || 1;
    const numFound = (this.props.SearchContext && this.props.SearchContext.numFound) || 0;

    return (
      <div className="resultinfo-component">

        <Pagination
          itemsPerPageText="results per page"
          itemRangeText={(min, max, total) => (total <= 0 ? '' : `${min} - ${max} of ${total} results`)}
          totalItems={numFound}
          pageSizes={[10, 25, 50, 100]}
          pageSize={pageSize}
          page={page}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

ResultInfo.displayName = 'ResultInfo';
ResultInfo.propTypes = {
  numFound: React.PropTypes.number,
  actions: React.PropTypes.shape({
    PageChanged: React.PropTypes.func,
    SubmitQuery: React.PropTypes.func
  }),
  SearchContext: React.PropTypes.shape({
    pageSize: React.PropTypes.number,
    page: React.PropTypes.number,
    numFound: React.PropTypes.number
  })
};
ResultInfo.defaultProps = {};

export default ResultInfo;
