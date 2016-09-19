/* eslint class-methods-use-this: 0 */
/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ActivityIndex extends Component {
  componentWillMount() {
    this.props.fetchActivities();
  }

  renderActivities() {
    console.log(`aaa${this.props}`);
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
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>;
    } else if (error !== '') {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderActivities()}
        </ul>
      </div>
    );
  }
}

ActivityIndex.propTypes = {
  fetchActivities: PropTypes.func,
  activities: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default ActivityIndex;
