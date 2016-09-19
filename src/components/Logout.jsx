import React, { Component, PropTypes } from 'react';

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.onLogoutClick()} className="btn btn-primary">
          Logout
        </button>
      </div>
    );
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};
