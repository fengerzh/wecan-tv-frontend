import { connect } from 'react-redux';
import { fetchProjects } from '../actions/aproject';

import AProjectIndex from '../components/aproject-index';

function mapStateToProps(state) {
  return {
    projects: state.projectsreducer.projects,
    loading: state.projectsreducer.isFetching,
    error: state.projectsreducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProjects: (start) => {
      dispatch(fetchProjects(start));
    },
    loadMore: (start) => {
      dispatch(fetchProjects(start));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AProjectIndex);
