import { connect } from 'react-redux';
import { signupUser } from '../actions/Signup';

import Signup from '../components/Signup';

function mapStateToProps(state) {
  console.log(state);
  return {
    errorMessage: state.signupreducer.errorMessage,
    isAuthenticated: state.signupreducer.isAuthenticated,
    username: state.signupreducer.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignupClick: (creds) => {
      dispatch(signupUser(creds));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
