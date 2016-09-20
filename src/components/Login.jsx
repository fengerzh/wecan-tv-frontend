/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

class Login extends Component {
  componentWillReceiveProps(newProps) {
    // 当登录状态发生变化时执行以下代码
    const { isAuthenticated } = newProps;
    if (isAuthenticated) {
      const { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname);
      } else {
        this.props.router.replace('/');
      }
    }
  }

  handleClick() {
    const username = this.username;
    const password = this.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds);
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div className="container">
        <input type="text" ref={(username) => { this.username = username; }} className="form-control" style={{ marginRight: '5px' }} placeholder="Username" />
        <input type="password" ref={(password) => { this.password = password; }} className="form-control" style={{ marginRight: '5px' }} placeholder="Password" />
        <button onClick={event => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>

        {errorMessage &&
          <p style={{ color: 'red' }}>{errorMessage}</p>
        }
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  // isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(Login);
