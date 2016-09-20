import { combineReducers } from 'redux';
import ProjectsReducer from './aproject';
import LoginReducer from './Login';
import ActivitiesReducer from './activity';
import LivesReducer from './live';

const rootReducer = combineReducers({
  loginreducer: LoginReducer,
  projectsreducer: ProjectsReducer,
  activitiesreducer: ActivitiesReducer,
  livesreducer: LivesReducer,
});

export default rootReducer;
