import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';
import { Table } from 'react-bootstrap';

class AProjectIndex extends Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.fetchProjects(this.props.projects.length);
  }

  // <li className="list-group-item" key={aproject.ida_project}>
  //   <Link style={{ color: 'black' }} to={{ pathname: `/aproject-view/${aproject.ida_project}` }}>
  //     <h3 className="list-group-item-heading">{aproject.pro_name}</h3>
  //   </Link>
  // </li>

  renderProjects() {
    return this.props.projects.map(aproject =>
      <tr key={aproject.ida_project}>
        <td>{aproject.ida_project}</td>
        <td>
          <Link to={{ pathname: `/aproject-view/${aproject.ida_project}` }}>
            {aproject.pro_name}
          </Link>
        </td>
        <td>{aproject.category}</td>
        <td>{aproject.invest_stage}</td>
      </tr>
    );
  }

  // <ul className="list-group">
  //   <InfiniteScroll
  //     items={this.renderProjects()}
  //     holderType="ul"
  //     loadingMore={loading}
  //     loadMore={this.loadMore}
  //     hasMore={this.props.hasMore}
  //     elementIsScrollable={false}
  //   />
  // </ul>

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <div className="container"><h1>项目列表</h1><h3>Loading...</h3></div>;
    } else if (error !== '') {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div className="container">
        <h1>项目列表</h1>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>项目名称</th>
              <th>分类</th>
              <th>融资阶段</th>
            </tr>
          </thead>
          <InfiniteScroll
            items={this.renderProjects()}
            holderType="tbody"
            loadingMore={loading}
            loadMore={this.loadMore}
            hasMore={this.props.hasMore}
            elementIsScrollable={false}
          />
        </Table>
      </div>
    );
  }
}

AProjectIndex.propTypes = {
  fetchProjects: PropTypes.func,
  loadMore: PropTypes.func,
  projects: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  error: PropTypes.string,
};

export default AProjectIndex;
