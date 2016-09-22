import { connect } from 'react-redux';
import { fetchActivities } from '../actions/activity';

import ActivityIndex from '../components/activity-index';

function mapStateToProps(state) {
  return {
    activities: state.activitiesreducer.activities,
    loading: state.activitiesreducer.isFetching,
    hasMore: state.activitiesreducer.hasMore,
    error: state.activitiesreducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActivities: (start) => {
      dispatch(fetchActivities(start));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityIndex);
