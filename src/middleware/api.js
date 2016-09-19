/* eslint no-unused-vars: 0 */

const BASE_URL = 'http://api.we.com/';

function callApi(endpoint, authenticated) {
  // 我们把token保存在local storage里面
  const token = localStorage.getItem('id_token') || null;
  let config = {};

  if (authenticated) {
    // 如果访问此api时需要验证
    if (token) {
      // 检查是否已经保存好了token
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    } else {
      // 没有token，报错
      throw new Error('No token saved!');
    }
  }

  // 开始调用真正的api地址
  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text);
      }

      return text;
    })
    .catch(err => Promise.reject(err));
}

export const CALL_API = Symbol('Call API');

export default store => next => (action) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, authenticated } = callAPI;

  const [requestType, successType, errorType] = types;

  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType,
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType,
    })
  );
};
