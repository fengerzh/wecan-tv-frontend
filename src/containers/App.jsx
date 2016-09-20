/* eslint class-methods-use-this: 0 */

import React, { Component } from 'react';
import {
  Router,
  Route,
  hashHistory,
  IndexRoute,
} from 'react-router';
import { connect } from 'react-redux';

import Main from './Main';
import Login from './Login';
import Logout from './Logout';
import Home from '../components/home';
import AProjectIndex from './aproject-index';
import ActivityIndex from './activity-index';
import LiveIndex from './live-index';

// 如果某组件需要验证而用户尚未登录的话，把它跳转到登录页面
function requireAuth(nextState, replace) {
  const token = localStorage.getItem('id_token') || null;
  if (!token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} />
          <Route path="logout" component={Logout} />
          <Route path="aproject-index" component={AProjectIndex} onEnter={requireAuth} />
          <Route path="activity-index" component={ActivityIndex} onEnter={requireAuth} />
          <Route path="live-index" component={LiveIndex} onEnter={requireAuth} />
        </Route>
      </Router>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(App);
