import { connect } from 'react-redux';
import { fetchProject } from '../actions/live';

import LiveView from '../components/LiveView';

function mapStateToProps(state) {
  return {
    live: state.livesreducer.live,
    loading: state.livesreducer.isFetching,
    error: state.livesreducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProject: (liveId) => {
      dispatch(fetchProject(liveId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveView);
