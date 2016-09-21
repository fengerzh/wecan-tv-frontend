import {
  FETCH_LIVES,
  FETCH_LIVES_SUCCESS,
  FETCH_LIVES_FAILURE,
  FETCH_LIVE,
  FETCH_LIVE_SUCCESS,
  FETCH_LIVE_FAILURE,
} from '../actions/live';

const INITIAL_STATE = {
  isFetching: false,
  lives: [],
  live: {
    description: 'loading',
  },
  hasMore: true,
  authenticated: false,
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  let hasMore;
  let lives;
  switch (action.type) {
    case FETCH_LIVES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LIVES_SUCCESS:
      hasMore = false;
      lives = JSON.parse(action.response);
      if (lives.length > 0) {
        hasMore = true;
      }
      return {
        ...state,
        isFetching: false,
        lives: state.lives.concat(lives),
        hasMore,
        authenticated: action.authenticated || false,
      };
    case FETCH_LIVES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCH_LIVE:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_LIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        live: JSON.parse(action.response),
        authenticated: action.authenticated || false,
      };
    case FETCH_LIVE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
