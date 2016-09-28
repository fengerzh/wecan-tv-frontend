/* eslint class-methods-use-this: 0 */

import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  componentDidMount() {
    const script = document.createElement('script');
    const liveId = 'lss-giftivhkx29rmrug';
    script.src = '/cyberplayer.js?file=rtmp://play.bcelive.com/live'
      + `/${liveId}&width=680&autostart=true&volume=60&height=400`
      + '&ak=db1c5c6d9c4347e2936fdd007a5ee804&stretching=uniform&controls=true';
    script.async = true;
    document.getElementById('home-player').appendChild(script);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    let linkStyle;
    if (this.state.hover) {
      linkStyle = { color: '#76b6e1' };
    } else {
      linkStyle = { color: '#2574a9' };
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8" style={{ backgroundColor: '#161a1e' }}>
            <div id="home-player" />
          </div>
          <div className="col-md-4">
            <div className="signup" style={{ backgroundColor: '#161a1e', height: '370px', padding: '32px', overflow: 'hidden' }}>
              <div className="header">
                <h1 style={{ color: '#76b6e1', textAlign: 'center' }}>Wecan TV</h1>
                <p style={{ fontSize: '24px', color: '#f1f1f1', textAlign: 'center' }}>现在注册</p>
              </div>
              <form className="form">
                <FormGroup>
                  <FormControl type="email" ref={(email) => { this.email = email; }} placeholder="电子邮箱" />
                </FormGroup>
                <FormGroup>
                  <FormControl type="password" ref={(password1) => { this.password2 = password1; }} placeholder="设置密码" />
                </FormGroup>
                <FormGroup>
                  <FormControl type="password" ref={(password2) => { this.password2 = password2; }} placeholder="确认密码" />
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    bsStyle="primary"
                  >
                    登录
                  </Button>
                  <a
                    href="/#/login"
                    style={{ ...linkStyle, margin: 'auto auto auto 80px' }}
                    onMouseEnter={this.toggleHover}
                    onMouseLeave={this.toggleHover}
                  >
                    Log In
                  </a>
                </FormGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
