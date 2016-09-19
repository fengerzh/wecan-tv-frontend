import React, { Component, PropTypes } from 'react';

// 引入bootstrap类
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: 1,
    };
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">创客空间</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/aproject-index">
                <NavItem>项目列表</NavItem>
              </LinkContainer>
              <LinkContainer to="/activity-index">
                <NavItem>活动列表</NavItem>
              </LinkContainer>
              {this.state.loggedIn ? (
                <LinkContainer to="/logout">
                  <NavItem>登出</NavItem>
                </LinkContainer>
              ) : ''}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// 主组件依赖children，不同页面生成不同children，插入主组件划定的范畴
Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
