import { combineReducers } from 'redux';
import ProjectsReducer from './aproject';
import LoginReducer from './Login';

const rootReducer = combineReducers({
  loginreducer: LoginReducer,
  projectsreducer: ProjectsReducer,
});

export default rootReducer;
