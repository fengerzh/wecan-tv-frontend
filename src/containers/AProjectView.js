import { connect } from 'react-redux';
import { fetchProject } from '../actions/aproject';

import AProjectView from '../components/AProjectView';

function mapStateToProps(state) {
  return {
    project: state.projectsreducer.project,
    loading: state.projectsreducer.isFetching,
    error: state.projectsreducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProject: (projId) => {
      dispatch(fetchProject(projId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AProjectView);
