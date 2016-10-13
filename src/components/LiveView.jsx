/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';

class LiveView extends Component {
  constructor() {
    super();
    this.state = {
      websocket: null,
      obj: null,
    };
  }

  componentWillMount() {
    this.props.fetchLive(this.props.params.liveId);
    // 调用websocket对象建立连接：
    const wsServer = 'ws://front.we.com:9502';
    this.state.websocket = new WebSocket(wsServer);
  }

  componentDidMount() {
    const script = document.createElement('script');
    // RTMP视频输出
    script.src = '/cyberplayer.js?file=rtmp://play.bcelive.com/live'
      + `/${this.props.params.liveId}&width=680&autostart=true&volume=60&height=400`
      + '&ak=db1c5c6d9c4347e2936fdd007a5ee804&stretching=uniform&controls=true';
    script.async = true;
    document.getElementById('live-player').appendChild(script);

    const msgDiv = document.getElementById('msg');
    // onopen监听连接打开
    this.state.websocket.onopen = (evt) => {
      switch (evt.target.readyState) {
        case 0:
          msgDiv.innerHTML = '正在连接服务器...<br>';
          break;
        case 1:
          msgDiv.innerHTML = '已连接服务器<br>';
          break;
        case 2:
          msgDiv.innerHTML = '正在断开服务器...<br>';
          break;
        case 3:
          msgDiv.innerHTML = '服务器已断开<br>';
          break;
        default:
      }
    };

    // onmessage 监听服务器数据推送
    this.state.websocket.onmessage = (evt) => {
      msgDiv.innerHTML += `${evt.data}<br>`;
      // 保持滚动条始终在底部
      msgDiv.scrollTop = msgDiv.scrollHeight;
    };

    // 网页内按下回车触发点击发送按钮
    document.onkeydown = (evt) => {
      if (evt.keyCode === 13) {
        document.getElementById('button').click();
        return false;
      }
      return true;
    };
  }

  sendMsg() {
    const text = document.getElementById('msgText').value;
    document.getElementById('msgText').value = '';
    if (text.replace(/(^\s*)|(\s*$)/g, '') !== '') {
      // 弹幕实现
      const bulletScreen = document.getElementById('bullet-screen');
      const pre = document.createElement('pre');
      pre.className = 'oldp';
      pre.style = `width:${text.length}em`;
      pre.innerHTML = text;
      bulletScreen.appendChild(pre);
      const pres = document.getElementsByTagName('pre');
      const lastPre = pres[pres.length - 1];
      // 移动弹幕
      setTimeout(() => {
        lastPre.className += ' changemessage';
      }, 100);
      // 隐藏弹幕
      setTimeout(() => {
        lastPre.style = 'display: none';
      }, 5500);

      // 向服务器发送数据
      this.state.websocket.send(`${this.props.username}: ${text}`);
    }
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
        <h1>{this.props.live.description}</h1>
        <div id="live-player" />
        <div id="bullet-screen" style={{ zIndex: 120, width: 'auto', height: '50vh', overflow: 'hidden', margin: '-50vh auto auto auto' }} />
        {/* 主聊天区 */}
        <div style={{ background: 'whiteSmoke', height: '33.1vh' }}>
          {/* 消息显示区 */}
          <div id="msg" style={{ width: 'auto', height: '70%', padding: '10px 0', background: 'whitesmoke', overflow: 'auto', boxSizing: 'border-box' }} />
          {/* 消息发送区 */}
          <div style={{ height: '30%', borderTop: '1px solid #999', padding: '10px', boxSizing: 'border-box' }}>
            <div className="col-md-8">
              <input type="text" name="text" id="msgText" style={{ width: '70%', height: '4vh' }} />
            </div>
            <div className="col-md-4">
              <button id="button" onClick={event => this.sendMsg(event)} className="btn btn-primary" style={{ with: '20%', height: '4vh' }}>发送</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LiveView.propTypes = {
  fetchLive: PropTypes.func,
  live: PropTypes.object,
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  username: PropTypes.string,
};

export default LiveView;
