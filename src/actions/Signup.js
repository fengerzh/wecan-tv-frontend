/* eslint no-console: 0 */

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function signupUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  };

  return (dispatch) => {
    dispatch(requestSignup(creds));
    return fetch('http://api.we.com/gluseruser/signup', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        let signupResult;
        if (!response.ok) {
          console.log(111);
          dispatch(signupError(user.message));
          signupResult = Promise.reject(user);
        } else {
          console.log(222);
          // 注册成功，存储token
          localStorage.setItem('id_token', user.id_token);
          localStorage.setItem('username', user.username);
          dispatch(receiveSignup(user));
        }
        console.log(signupResult);
        return signupResult;
      })
      .catch(err => console.log(err));
  };
}
