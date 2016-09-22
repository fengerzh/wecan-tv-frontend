import React, { Component, PropTypes } from 'react';
import AProjectForm from './AProjectForm';

class AProjectView extends Component {
  componentWillMount() {
    this.props.fetchProject(this.props.params.projId);
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
        <h1>{this.props.project.pro_name}</h1>
        <AProjectForm initialValues={this.props.project} enableReinitialize />
      </div>
    );
  }
}

AProjectView.propTypes = {
  fetchProject: PropTypes.func,
  project: PropTypes.object,
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default AProjectView;
