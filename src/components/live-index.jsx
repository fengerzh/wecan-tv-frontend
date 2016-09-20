/* eslint class-methods-use-this: 0 */
/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class LiveIndex extends Component {
  componentWillMount() {
    this.props.fetchLives();
  }

  renderLives() {
    return this.props.lives.map(live =>
      <li className="list-group-item" key={live.description}>
        <Link style={{ color: 'black' }} to={`live/${live}`}>
          <h3 className="list-group-item-heading">{live.description}</h3>
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
          {this.renderLives()}
        </ul>
      </div>
    );
  }
}

LiveIndex.propTypes = {
  fetchLives: PropTypes.func,
  lives: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default LiveIndex;
