import {
  FETCH_LIVES,
  FETCH_LIVES_SUCCESS,
  FETCH_LIVES_FAILURE,
} from '../actions/live';

const INITIAL_STATE = {
  isFetching: false,
  lives: [],
  authenticated: false,
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LIVES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LIVES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lives: JSON.parse(action.response),
        authenticated: action.authenticated || false,
      };
    case FETCH_LIVES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
