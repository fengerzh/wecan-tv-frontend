import { connect } from 'react-redux';
import { loginUser } from '../actions/Login';

import Login from '../components/Login';

function mapStateToProps(state) {
  return {
    errorMessage: state.loginreducer.errorMessage,
    isAuthenticated: state.loginreducer.isAuthenticated,
    username: state.loginreducer.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginClick: (creds) => {
      dispatch(loginUser(creds));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
