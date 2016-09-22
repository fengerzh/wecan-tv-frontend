import React, { Component, PropTypes } from 'react';

class LiveView extends Component {
  componentWillMount() {
    this.props.fetchLive(this.props.params.liveId);
  }

  componentDidMount() {
    const script = document.createElement('script');
    // RTMP输出
    script.src = '/cyberplayer.js?file=rtmp://play.bcelive.com/live'
      + `/${this.props.params.liveId}&width=680&autostart=true&volume=60&height=400`
      + '&ak=db1c5c6d9c4347e2936fdd007a5ee804&stretching=uniform&controls=true';
    // FLV输出
    // script.src = '/cyberplayer.js?file=http://play.bcelive.com/live'
    //   + `/${this.props.params.liveId}.flv&width=680&autostart=true&volume=60&height=400`
    //   + '&ak=db1c5c6d9c4347e2936fdd007a5ee804&stretching=uniform&controls=true';
    // HLS输出
    // script.src = '/cyberplayer.js?file=http://gh0sbbe1c1x0h58nfad.exp.bcelive.com'
    //   + `/${this.props.params.liveId}live.m3u8&width=680&autostart=true&volume=60&height=400`
    //   + '&ak=db1c5c6d9c4347e2936fdd007a5ee804&stretching=uniform&controls=true';
    script.async = true;
    document.getElementById('player').appendChild(script);
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
};

export default LiveView;
