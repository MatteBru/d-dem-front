import { combineReducers } from 'redux';
import issueReducer from './issueReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'


const rootReducer = combineReducers({
  issues: issueReducer,
  user: userReducer,
  auth: authReducer
});

export default rootReducer;
