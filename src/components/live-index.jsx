/* eslint class-methods-use-this: 0 */
/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';
import { Table } from 'react-bootstrap';

class LiveIndex extends Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.fetchLives(this.props.lives.length);
  }

  renderLives() {
    return this.props.lives.map(live =>
      <tr key={live.id_live}>
        <td>{live.id_live}</td>
        <td>
          <Link to={{ pathname: `/live-view/${live.id_live}` }}>
            {live.description}
          </Link>
        </td>
        <td>{live.state}</td>
      </tr>
    );
  }

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div className="container"><h1>直播列表</h1><h3>Loading...</h3></div>;
    } else if (error !== '') {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div className="container">
        <h1>直播列表</h1>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>直播名称</th>
              <th>状态</th>
            </tr>
          </thead>
          <InfiniteScroll
            items={this.renderLives()}
            holderType="tbody"
            loadingMore={loading}
            loadMore={this.loadMore}
            hasMore={this.props.hasMore}
            elementIsScrollable={false}
          />
        </Table>
      </div>
    );
  }
}

LiveIndex.propTypes = {
  fetchLives: PropTypes.func,
  loadMore: PropTypes.func,
  lives: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  error: PropTypes.string,
};

export default LiveIndex;
