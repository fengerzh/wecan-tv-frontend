import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class BulletScreen extends Component {

  render() {
    const item = (
      <div
        className="bullet"
        key={this.props.index}
        style={{
          top: `${this.props.top}vh`,
          color: 'rgb(255, 255, 255)',
          whiteSpace: 'nowrap',
          fontSize: '3vh',
        }}
      >
        {this.props.word}
      </div>
    );

    return (
      <div
        id="bullt-screen"
        style={{
          position: 'relative',
          width: 'auto',
          height: '46vh',
          overflow: 'hidden',
          margin: '-50vh auto auto auto',
          background: 'rgba(0, 255, 0, 0.01)',
        }}
      >
        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'bullet-enter',
          }}
          transitionEnterTimeout={5000}
          transitionLeave={false}
        >
          {item}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

BulletScreen.propTypes = {
  word: PropTypes.string,
  index: PropTypes.number,
  top: PropTypes.number,
};

export default BulletScreen;
