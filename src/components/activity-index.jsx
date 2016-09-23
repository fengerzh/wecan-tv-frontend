/* eslint class-methods-use-this: 0 */
/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

class ActivityIndex extends Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.fetchActivities(this.props.activities.length);
  }

  renderActivities() {
    return this.props.activities.map(activity =>
      <li className="list-group-item" key={activity.act_id}>
        <Link style={{ color: 'black' }} to={`activity/${activity.act_id}`}>
          <h3 className="list-group-item-heading">{activity.act_id}</h3>
        </Link>
      </li>
    );
  }

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div className="container"><h1>活动列表</h1><h3>Loading...</h3></div>;
    } else if (error !== '') {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div className="container">
        <h1>活动列表</h1>
        <ul className="list-group">
          <InfiniteScroll
            items={this.renderActivities()}
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

ActivityIndex.propTypes = {
  fetchActivities: PropTypes.func,
  loadMore: PropTypes.func,
  activities: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  error: PropTypes.string,
};

export default ActivityIndex;
