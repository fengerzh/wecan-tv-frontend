import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from '../actions/aproject';

const INITIAL_STATE = {
  isFetching: false,
  projects: [],
  hasMore: true,
  authenticated: false,
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  let projects;
  let hasMore;
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      projects = JSON.parse(action.response);
      hasMore = false;
      if (projects.length > 0) {
        hasMore = true;
      }
      return {
        ...state,
        isFetching: false,
        projects: state.projects.concat(projects),
        hasMore,
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
