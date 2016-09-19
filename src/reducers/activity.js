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
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activities: JSON.parse(action.response),
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
