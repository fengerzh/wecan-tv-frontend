import { connect } from 'react-redux';
import { logoutUser } from '../actions/Logout';

import Logout from '../components/Logout';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: (creds) => {
      dispatch(logoutUser(creds));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
