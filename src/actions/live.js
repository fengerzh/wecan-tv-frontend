import { CALL_API } from '../middleware/api';

// 直播列表
export const FETCH_LIVES = 'FETCH_LIVES';
export const FETCH_LIVES_SUCCESS = 'FETCH_LIVES_SUCCESS';
export const FETCH_LIVES_FAILURE = 'FETCH_LIVES_FAILURE';
// 直播详情
export const FETCH_LIVE = 'FETCH_LIVE';
export const FETCH_LIVE_SUCCESS = 'FETCH_LIVE_SUCCESS';
export const FETCH_LIVE_FAILURE = 'FETCH_LIVE_FAILURE';

export function fetchLives() {
  return {
    [CALL_API]: {
      endpoint: 'jwtlive/index',
      authenticated: true,
      types: [FETCH_LIVES, FETCH_LIVES_SUCCESS, FETCH_LIVES_FAILURE],
    },
  };
}

export function fetchLive(liveId) {
  return {
    [CALL_API]: {
      endpoint: `jwtlive/view?id=${liveId}`,
      authenticated: true,
      types: [FETCH_LIVE, FETCH_LIVE_SUCCESS, FETCH_LIVE_FAILURE],
    },
  };
}
