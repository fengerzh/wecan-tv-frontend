import { connect } from 'react-redux';
import { fetchLives } from '../actions/live';

import LiveIndex from '../components/live-index';

function mapStateToProps(state) {
  return {
    lives: state.livesreducer.lives,
    loading: state.livesreducer.isFetching,
    error: state.livesreducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLives: () => {
      dispatch(fetchLives());
    },
    loadMore: () => {
      dispatch(fetchLives());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveIndex);
