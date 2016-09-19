import { CALL_API } from '../middleware/api';

// 项目列表
export const FETCH_ACTIVTIES = 'FETCH_ACTIVTIES';
export const FETCH_ACTIVTIES_SUCCESS = 'FETCH_ACTIVTIES_SUCCESS';
export const FETCH_ACTIVTIES_FAILURE = 'FETCH_ACTIVTIES_FAILURE';

export function fetchActivities() {
  return {
    [CALL_API]: {
      endpoint: 'jwtactivity/index',
      authenticated: true,
      types: [FETCH_ACTIVTIES, FETCH_ACTIVTIES_SUCCESS, FETCH_ACTIVTIES_FAILURE],
    },
  };
}
