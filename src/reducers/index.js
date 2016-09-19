import { combineReducers } from 'redux';
import ProjectsReducer from './aproject';
import LoginReducer from './Login';
import ActivitiesReducer from './activity';

const rootReducer = combineReducers({
  loginreducer: LoginReducer,
  projectsreducer: ProjectsReducer,
  activitiesreducer: ActivitiesReducer,
});

export default rootReducer;
