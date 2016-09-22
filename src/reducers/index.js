import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProjectsReducer from './aproject';
import LoginReducer from './Login';
import ActivitiesReducer from './activity';
import LivesReducer from './live';

const rootReducer = combineReducers({
  form: formReducer,
  loginreducer: LoginReducer,
  projectsreducer: ProjectsReducer,
  activitiesreducer: ActivitiesReducer,
  livesreducer: LivesReducer,
});

export default rootReducer;
