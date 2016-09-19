import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from '../actions/aproject';

const INITIAL_STATE = {
  isFetching: false,
  projects: [],
  authenticated: false,
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        projects: state.projects.concat(JSON.parse(action.response)),
        authenticated: action.authenticated || false,
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
