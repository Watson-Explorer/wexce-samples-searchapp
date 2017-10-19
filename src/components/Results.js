/*
© Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0 (https://opensource.org/licenses/Apache-2.0)
*/
import React from 'react';
import { Tag } from 'carbon-components-react';
import {
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper
} from 'carbon-components-react/es/components/StructuredList';

import './results.scss';

class Results extends React.Component {

  render() {
    const results = (this.props.SearchContext && this.props.SearchContext.docs) || [];

    return (
      <div className="results-component">

        <StructuredListWrapper>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head className="clustersColumn">
                clusters
              </StructuredListCell>
              <StructuredListCell head>
                title
              </StructuredListCell>
              <StructuredListCell head>
                date
              </StructuredListCell>
              <StructuredListCell head>
                fields
              </StructuredListCell>
              <StructuredListCell head>
                body
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {results.map((r, i) =>
              <StructuredListRow key={`R${i}`}>
                <StructuredListCell>
                  {
                    r._clusters_.map(c =>
                      <Tag type="experimental">{c.labels.toString()}</Tag>
                    )
                  }
                </StructuredListCell>
                <StructuredListCell>
                  {r.title}
                </StructuredListCell>
                <StructuredListCell>
                  {r.date_added}
                </StructuredListCell>
                <StructuredListCell>
                  <table>
                    <tbody>
                      {
                        Object.keys(r).filter(name => ['_highlights_', '_clusters_', 'id', 'body', 'body_bigram', 'body_annotations', 'title', 'date_added', '_version_'].indexOf(name) === -1).map(key =>
                          <tr>
                            <td>{key}</td><td> :&nbsp;&nbsp;&nbsp; </td><td>{r[key]}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </StructuredListCell>
                <StructuredListCell>
                  {r._highlights_.length === 0 &&
                    r.body
                  }
                  {r._highlights_.length > 0 &&
                    r._highlights_.map((h, index) =>
                      <p dangerouslySetInnerHTML={{ __html: h }} />)
                  }
                </StructuredListCell>
              </StructuredListRow>
            )
            }
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    );
  }
}

Results.displayName = 'Results';
Results.propTypes = {
  SearchContext: React.PropTypes.shape({ docs: React.PropTypes.arrayOf(React.PropTypes.shape({})) }),
  docs: React.PropTypes.arrayOf(React.PropTypes.shape({}))
};
Results.defaultProps = {};

export default Results;
