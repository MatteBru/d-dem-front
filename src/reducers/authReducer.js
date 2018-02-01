import {LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, CREATE_USER_ATTEMPT, CLEAR_ERRORS} from '../actions/types';

const authReducer = (state = {fetching: false, authed: false, creds: {errors:{}}}, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {...state, creds: {errors:{}}}
    case CREATE_USER_ATTEMPT:
    case LOGIN_ATTEMPT:
      return {fetching: true, authed: false, creds: {errors:{}}}
    case CREATE_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {fetching: false, authed: true, message: "good job, you're not trash", creds: action.user.jwt};
    case CREATE_USER_FAILURE:
    case LOGIN_FAILURE:
      return {fetching: false, authed: false, message: "good job, you're trash", creds: action.auth};
    case LOGOUT:
      return {fetching: false, authed: false, message: "logged out", creds: {errors:{}}};
    default:
      return state
  }
}

export default authReducer
