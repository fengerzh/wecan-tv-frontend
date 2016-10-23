/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      passwd: '',
      repasswd: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hanleUsername = this.hanleUsername.bind(this);
    this.handlePasswd = this.handlePasswd.bind(this);
    this.handleRePasswd = this.handleRePasswd.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
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
    console.log(location);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    if (this.state.passwd.trim() !== this.state.repasswd.trim()) {
      alert('两次输入密码不一致');
    }
    const creds = { username: this.state.username.trim(), password: this.state.passwd.trim() };
    this.props.onSignupClick(creds);
  }

  hanleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswd(event) {
    this.setState({ passwd: event.target.value });
  }

  handleRePasswd(event) {
    this.setState({ repasswd: event.target.value });
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div
        className="container"
        style={{
          height: '100vh',
          background: '#f1f1f1',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '48px',
            color: '#2574a9',
          }}
        >
          免费注册
        </h2>
        <div
          className="row"
          style={{
            background: '#fff',
            border: '1px solid',
            borderColor: '#e3e3e3',
            boxSizing: 'border-box',
            padding: '32px 32px 64px',
            margin: '20px 20px auto 20px',
          }}
        >
          <div
            className="col-md-3"
            style={{
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <p>用第三方平台登录：</p>
            <div
              style={{
                borderRight: '1px solid #e3e3e3',
              }}
            >
              <a
                href="/#/signup"
                title="微信"
                style={{
                  background: '#5ac63c',
                  color: '#fff',
                  display: 'block',
                  width: '100%',
                  maxWidth: '190px',
                  height: '40px',
                  lineHeight: '40px',
                  fontSize: '15px',
                  fontWeight: '100',
                  paddingLeft: '19px',
                  margin: '5px 0',
                  textDecoration: 'none',
                }}
              >
                微 信
              </a>
              <a
                href="/#/signup"
                title="QQ"
                style={{
                  background: '#52a9d7',
                  color: '#fff',
                  display: 'block',
                  width: '100%',
                  maxWidth: '190px',
                  height: '40px',
                  lineHeight: '40px',
                  fontSize: '15px',
                  fontWeight: '100',
                  paddingLeft: '19px',
                  margin: '5px 0',
                  textDecoration: 'none',
                }}
              >
                Q Q
              </a>
              <a
                href="/#/signup"
                title="微博"
                style={{
                  background: '#e22428',
                  color: '#fff',
                  display: 'block',
                  width: '100%',
                  maxWidth: '190px',
                  height: '40px',
                  lineHeight: '40px',
                  fontSize: '15px',
                  fontWeight: '100',
                  paddingLeft: '19px',
                  margin: '5px 0',
                  textDecoration: 'none',
                }}
              >
                微 博
              </a>
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '-18px',
                  display: 'block',
                  width: '62px',
                  fontSize: '20px',
                  fontWeight: '300',
                  padding: '8px',
                  overflow: 'hidden',
                  background: '#fff',
                  textAlign: 'center',
                }}
              >
                或
              </span>
            </div>
            <p>用你的社交帐号快速登录.</p>
          </div>
          <form
            className="col-md-9"
            onSubmit={this.handleSubmit}
            style={{
              background: 'rgba(255, 0, 0, 0.01)',
              padding: '34px 0 0 20px',
            }}
          >
            <FormGroup>
              <FormControl
                type="text"
                placeholder="用户名"
                required
                onChange={this.hanleUsername}
                style={{
                  width: '60%',
                  borderRadius: 0,
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                placeholder="密码"
                required
                onChange={this.handlePasswd}
                style={{
                  width: '60%',
                  borderRadius: 0,
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                placeholder="确认密码"
                required
                onChange={this.handleRePasswd}
                style={{
                  width: '60%',
                  borderRadius: 0,
                }}
              />
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                bsStyle="primary"
                bsSize="large"
                style={{
                  borderRadius: 0,
                  fontSize: '16px',
                  fontWeight: '100',
                  border: 'none',
                  minWidth: '160px',
                  padding: '16px',
                }}
                onClick={this.handleClick}
              >
                登&nbsp;&nbsp;&nbsp;&nbsp;录
              </Button>
            </FormGroup>
          </form>

          {errorMessage &&
            <p style={{ color: 'red' }}>{errorMessage}</p>
          }
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  onSignupClick: PropTypes.func.isRequired,
  location: PropTypes.object,
  router: PropTypes.object,
};

export default withRouter(Signup);
