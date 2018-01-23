import { combineReducers } from 'redux';
import issueReducer from './issueReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import districtReducer from './districtReducer'


const rootReducer = combineReducers({
  issues: issueReducer,
  user: userReducer,
  auth: authReducer,
  district: districtReducer
});

export default rootReducer;
