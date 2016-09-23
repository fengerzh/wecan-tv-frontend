/* eslint class-methods-use-this: 0 */

import React, { Component, PropTypes } from 'react';

export default class Logout extends Component {
  componentWillMount() {
    this.props.onLogoutClick();
    window.location.href = '#';
  }

  render() {
    return (
      <div />
    );
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};
