import { connect } from 'react-redux';
import { fetchLive } from '../actions/live';

import LiveView from '../components/LiveView';

function mapStateToProps(state) {
  return {
    live: state.livesreducer.live,
    loading: state.livesreducer.isFetching,
    error: state.livesreducer.error,
    username: state.loginreducer.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLive: (liveId) => {
      dispatch(fetchLive(liveId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveView);
