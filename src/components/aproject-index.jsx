/* eslint class-methods-use-this: 0 */
/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

class AProjectIndex extends Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.fetchProjects(this.props.projects.length);
  }

  renderProjects() {
    return this.props.projects.map(aproject =>
      <li className="list-group-item" key={aproject.ida_project}>
        <Link style={{ color: 'black' }} to={`aproject/${aproject.ida_project}`}>
          <h3 className="list-group-item-heading">{aproject.pro_name}</h3>
        </Link>
      </li>
    );
  }

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>;
    } else if (error !== '') {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          <InfiniteScroll
            items={this.renderProjects()}
            holderType="ul"
            loadingMore={loading}
            loadMore={this.loadMore}
            hasMore={this.props.hasMore}
            elementIsScrollable={false}
          />
        </ul>
      </div>
    );
  }
}

AProjectIndex.propTypes = {
  fetchProjects: PropTypes.func,
  loadMore: PropTypes.func,
  projects: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  error: PropTypes.string,
};

export default AProjectIndex;
