import React, { Component, PropTypes } from 'react';

export default class Logout extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //   };
  // }

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
