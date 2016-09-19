import { CALL_API } from '../middleware/api';

// 项目列表
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export function fetchProjects() {
  return {
    [CALL_API]: {
      endpoint: 'jwtaproject/index',
      authenticated: true,
      types: [FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE],
    },
  };
}
