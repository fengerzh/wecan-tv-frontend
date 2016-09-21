import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
} from '../actions/activity';

const INITIAL_STATE = {
  isFetching: false,
  activities: [],
  authenticated: false,
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  let activities;
  let hasMore;
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ACTIVITIES_SUCCESS:
      activities = JSON.parse(action.response);
      hasMore = false;
      if (activities.length > 0) {
        hasMore = true;
      }
      return {
        ...state,
        isFetching: false,
        activities: state.activities.concat(activities),
        hasMore,
        authenticated: action.authenticated || false,
      };
    case FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
