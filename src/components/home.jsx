/* eslint class-methods-use-this: 0 */

import React, { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    const liveId = 'lss-giftivhkx29rmrug';
    script.src = '/cyberplayer.js?file=rtmp://play.bcelive.com/live'
      + `/${liveId}&width=680&autostart=true&volume=60&height=400`
      + '&ak=db1c5c6d9c4347e2936fdd007a5ee804&stretching=uniform&controls=true';
    script.async = true;
    document.getElementById('home-player').appendChild(script);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8" style={{ backgroundColor: '#161a1e' }}>
            <div id="home-player" />
          </div>
          <div className="col-md-4">
            <div className="signup" style={{ backgroundColor: '#161a1e', height: '40vh', padding: '32px', overflow: 'hidden' }}>
              <div className="header">
                <h1 style={{ color: '#76b6e1', textAlign: 'center' }}>Wecan TV</h1>
                <p style={{ fontSize: '24px', color: '#f1f1f1', textAlign: 'center' }}>现在注册</p>
              </div>
              <form className="form">
                <div className="form-group">
                  <input type="text" placeholder="用户名" className="form-control" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="电子邮箱" className="form-control" />
                </div>
                <div className="form-group">
                  <input type="password" placeholder="密码" className="form-control" />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">登录</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
