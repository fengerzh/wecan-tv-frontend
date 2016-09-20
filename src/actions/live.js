import { CALL_API } from '../middleware/api';

// 项目列表
export const FETCH_LIVES = 'FETCH_LIVES';
export const FETCH_LIVES_SUCCESS = 'FETCH_LIVES_SUCCESS';
export const FETCH_LIVES_FAILURE = 'FETCH_LIVES_FAILURE';

export function fetchLives() {
  return {
    [CALL_API]: {
      endpoint: 'jwtlive/index',
      authenticated: true,
      types: [FETCH_LIVES, FETCH_LIVES_SUCCESS, FETCH_LIVES_FAILURE],
    },
  };
}
