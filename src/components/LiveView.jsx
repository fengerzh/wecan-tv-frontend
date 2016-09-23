import React, { Component, PropTypes } from 'react';

class LiveView extends Component {
  constructor() {
    super();
    this.state = {
      websocket: null,
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
    document.getElementById('player').appendChild(script);

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
        <div id="player" />
        {/* 主聊天区 */}
        <div className="chat-wrap">
          {/* 消息显示区 */}
          <div id="msg" />
          {/* 消息发送区 */}
          <div className="input-msg">
            <input type="text" name="text" id="msgText" />
            <button id="button" onClick={event => this.sendMsg(event)} className="btn btn-primary">发送</button>
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
