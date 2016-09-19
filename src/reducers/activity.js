import {
  FETCH_ACTIVTIES,
  FETCH_ACTIVTIES_SUCCESS,
  FETCH_ACTIVTIES_FAILURE,
} from '../actions/activity';

const INITIAL_STATE = {
  isFetching: false,
  activites: [],
  authenticated: false,
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ACTIVTIES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ACTIVTIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activities: JSON.parse(action.response),
        authenticated: action.authenticated || false,
      };
    case FETCH_ACTIVTIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
