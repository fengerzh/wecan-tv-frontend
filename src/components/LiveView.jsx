/* eslint react/forbid-prop-types: 0 */

import React, { Component, PropTypes } from 'react';
import BulletScreen from './BulletScreen';

class LiveView extends Component {
  constructor() {
    super();
    this.state = {
      websocket: null,
      obj: null,
      word: '',
      value: '',
      index: 0,
      top: 0,
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.returnWord = this.returnWord.bind(this);
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

  returnWord(text) {
    const index = this.state.index;
    const top = this.state.top;
    this.setState({ word: text, index: index + 1 });
    if (top <= 32) {
      this.setState({ top: top + 8 });
    } else if (top > 32) {
      this.setState({ top: 8 });
    }
  }

  sendMsg() {
    const text = document.getElementById('msgText').value;
    document.getElementById('msgText').value = '';
    if (text.replace(/(^\s*)|(\s*$)/g, '') !== '') {
      // 发送弹幕
      this.returnWord(text);
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
        <BulletScreen
          index={this.state.index}
          top={this.state.top}
          word={this.state.word}
        />
        {/* 主聊天区 */}
        <div
          style={{ background: 'whiteSmoke', height: '33.1vh' }}
        >
          {/* 消息显示区 */}
          <div
            id="msg"
            style={{
              width: 'auto',
              height: '70%',
              padding: '10px 0',
              background: 'whitesmoke',
              overflow: 'auto',
              boxSizing: 'border-box',
            }}
          />
          {/* 消息发送区 */}
          <div
            style={{
              height: '30%',
              borderTop: '1px solid #999',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div className="col-md-8">
              <input
                type="text"
                name="text"
                id="msgText"
                style={{ width: '70%', height: '4vh' }}
                maxLength="20"
              />
            </div>
            <div className="col-md-4">
              <button
                id="button"
                onClick={this.sendMsg}
                className="btn btn-primary"
                style={{ with: '20%', height: '4vh' }}
              >
                发送
              </button>
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
