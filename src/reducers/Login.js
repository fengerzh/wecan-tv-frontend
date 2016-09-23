import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/Login';
import {
  LOGOUT_SUCCESS,
} from '../actions/Logout';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') !== null,
  username: localStorage.getItem('username'),
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        username: localStorage.getItem('username'),
        errorMessage: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
